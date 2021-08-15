import React, { useEffect, useState } from "react";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import {
  MsalAuthenticationTemplate,
  useMsal,
  useAccount,
} from "@azure/msal-react";
import {
  InteractionRequiredAuthError,
  InteractionType,
} from "@azure/msal-browser";

import { loginRequest, protectedResources } from "../authConfig";
import { callApiWithToken } from "../fetch";

import "../styles/Subscription.scss";

const ResourceGroupContent = () => {
  const params = useParams();
  const route = useRouteMatch();
  /**
   * useMsal is hook that returns the PublicClientApplication instance,
   * an array of all accounts currently signed in and an inProgress value
   * that tells you what msal is currently doing. For more, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
   */
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [databaseData, setDatabaseData] = useState(null);
  const databaseEndpoint =
    protectedResources.armTenants.subscriptionEndpoint +
    "/" +
    params.resourcegroupid +
    "/providers/Microsoft.DBForPostgreSQL/servers?api-version=2017-12-01";
  const [iotHubData, setIotHubData] = useState(null);
  const iotHubEndpoint =
    protectedResources.armTenants.subscriptionEndpoint +
    "/" +
    params.resourcegroupid +
    "/providers/Microsoft.Devices/IotHubs?api-version=2018-04-01";
  // const [deviceData, setDeviceData] = useState(null);
  // const deviceEndpoint = protectedResources.armTenants.subscriptionEndpoint + "/" + params.resourcegroupid + "/providers/Microsoft.Devices/IotHubs?api-version=2018-04-01"

  useEffect(() => {
    if (account && inProgress === "none" && !databaseData) {
      instance
        .acquireTokenSilent({
          scopes: protectedResources.armTenants.scopes,
          account: account,
        })
        .then((response) => {
          callApiWithToken(response.accessToken, databaseEndpoint).then(
            (response) => setDatabaseData(response)
          );
        })
        .catch((error) => {
          // in case if silent token acquisition fails, fallback to an interactive method
          if (error instanceof InteractionRequiredAuthError) {
            if (account && inProgress === "none") {
              instance
                .acquireTokenRedirect({
                  scopes: protectedResources.armTenants.scopes,
                })
                .catch((error) => console.log(error));
            }
          }
        });
    }
  }, [account, inProgress, instance]);

  useEffect(() => {
    if (account && inProgress === "none" && !iotHubData) {
      instance
        .acquireTokenSilent({
          scopes: protectedResources.armTenants.scopes,
          account: account,
        })
        .then((response) => {
          callApiWithToken(response.accessToken, iotHubEndpoint).then(
            (response) => setIotHubData(response)
          );
        })
        .catch((error) => {
          // in case if silent token acquisition fails, fallback to an interactive method
          if (error instanceof InteractionRequiredAuthError) {
            if (account && inProgress === "none") {
              instance
                .acquireTokenRedirect({
                  scopes: protectedResources.armTenants.scopes,
                })
                .catch((error) => console.log(error));
            }
          }
        });
    }
  }, [account, inProgress, instance]);

  const databaseContent =
    databaseData &&
    databaseData.value.map((obj) => {
      return (
        <div className="database--content">
          <h4 className="database--content__name">
            <Link to={`${route.url}/database/${obj.name}`}>
              Name: <span>{obj.name}</span>
            </Link>
          </h4>
          <div className="database--content__sku">
            <h6>SKU:</h6>
            <div className="database--content__sku--content">
              <p>
                Family: <span>{obj.sku.family}</span>
              </p>
              <p>
                Name: <span>{obj.sku.name}</span>
              </p>
              <p>
                Capacity: <span>{obj.sku.capacity}</span>
              </p>
              <p>
                Tier: <span>{obj.sku.tier}</span>
              </p>
            </div>
          </div>
        </div>
      );
    });

  const iotHubContent =
    iotHubData &&
    iotHubData.value.map((obj) => {
      return (
        <div className="iothub--content">
          <h4 className="iothub--content__name">
            <Link to={`${route.url}/iothub/${obj.name}`}>
                Name: <span>{obj.name}</span>
            </Link>
          </h4>
          <h4 className="iothub--content__tags">
            Purpose: <span>{obj.tags.purpose}</span>
          </h4>
          <div className="iothub--content__sku">
            <h6>SKU:</h6>
            <div className="iothub--content__sku--content">
              <p>
                Name: <span>{obj.sku.name}</span>
              </p>
              <p>
                Capacity: <span>{obj.sku.capacity}</span>
              </p>
              <p>
                Tier: <span>{obj.sku.tier}</span>
              </p>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className="resource-group-page">
      {databaseContent && (
        <div className="database">
          <h3>Database:</h3>
          {databaseContent}
        </div>
      )}
      {iotHubData && (
        <div className="iothub">
          <h3>Iot Hub:</h3>
          {iotHubContent}
        </div>
      )}
    </div>
  );
};

/**
 * The `MsalAuthenticationTemplate` component will render its children if a user is authenticated
 * or attempt to sign a user in. Just provide it with the interaction type you would like to use
 * (redirect or popup) and optionally a [request object](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md)
 * to be passed to the login API, a component to display while authentication is in progress or a component to display if an error occurs. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
export const ResourceGroup = () => {
  const authRequest = {
    ...loginRequest,
  };

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
    >
      <ResourceGroupContent />
    </MsalAuthenticationTemplate>
  );
};
