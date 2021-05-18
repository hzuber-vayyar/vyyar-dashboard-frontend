import React, { useEffect, useState } from "react";
import {
    useParams
  } from "react-router-dom";
import { MsalAuthenticationTemplate, useMsal, useAccount } from "@azure/msal-react";
import { InteractionRequiredAuthError, InteractionType, EventType } from "@azure/msal-browser";

import { loginRequest, protectedResources } from "../authConfig";
import { callApiWithToken } from "../fetch";
import { IotHubData } from "../components/DataDisplay";

import "../styles/Subscription.scss"

const DeviceContent = () => {
    const params = useParams()
    /**
     * useMsal is hook that returns the PublicClientApplication instance, 
     * an array of all accounts currently signed in and an inProgress value 
     * that tells you what msal is currently doing. For more, visit: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
     */
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [deviceData, setDeviceData] = useState(null);
    const endpoint = protectedResources.armTenants.subscriptionEndpoint + "/" + params.resourcegroupid + "/providers/Microsoft.Devices/IotHubs?api-version=2018-04-01"

    useEffect(() => {
        if (account && inProgress === "none" && !deviceData) {
            instance.acquireTokenSilent({
                scopes: protectedResources.armTenants.scopes,
                account: account
            }).then((response) => {
                callApiWithToken(response.accessToken, endpoint)
                    .then(response => setDeviceData(response));
            }).catch(error => {
                // in case if silent token acquisition fails, fallback to an interactive method
                if (error instanceof InteractionRequiredAuthError) {
                    if (account && inProgress === "none") {
                        instance.acquireTokenRedirect({
                            scopes: protectedResources.armTenants.scopes,
                        }).catch(error => console.log(error));
                    }
                }
            });
        }
    }, [account, inProgress, instance]);
  
    return (
        <>
            { deviceData ? <IotHubData iotHubData={deviceData} endpoint={endpoint}/> : null }
        </>
    );
};

/**
 * The `MsalAuthenticationTemplate` component will render its children if a user is authenticated 
 * or attempt to sign a user in. Just provide it with the interaction type you would like to use 
 * (redirect or popup) and optionally a [request object](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md)
 * to be passed to the login API, a component to display while authentication is in progress or a component to display if an error occurs. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
export const Devices = () => {
    const authRequest = {
        ...loginRequest
    };

    return (
        <MsalAuthenticationTemplate 
            interactionType={InteractionType.Redirect} 
            authenticationRequest={authRequest}
        >
            <DeviceContent />
        </MsalAuthenticationTemplate>
      )
};