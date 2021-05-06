import { useEffect, useState } from "react";

import { MsalAuthenticationTemplate, useMsal, useAccount } from "@azure/msal-react";
import { InteractionRequiredAuthError, InteractionType, EventType } from "@azure/msal-browser";

import { loginRequest, protectedResources } from "../authConfig";
import { callApiWithToken } from "../fetch";
import { SubscriptionData } from "../components/DataDisplay";

import "../styles/Subscription.scss"

const SubscriptionContent = () => {
    /**
     * useMsal is hook that returns the PublicClientApplication instance, 
     * an array of all accounts currently signed in and an inProgress value 
     * that tells you what msal is currently doing. For more, visit: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
     */
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [subscriptionData, setSubscriptionData] = useState(null);

    useEffect(() => {
        if (account && inProgress === "none" && !subscriptionData) {
            instance.acquireTokenSilent({
                scopes: protectedResources.armTenants.scopes,
                account: account
            }).then((response) => {
                callApiWithToken(response.accessToken, protectedResources.armTenants.subscriptionEndpoint)
                    .then(response => setSubscriptionData(response));
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
            { subscriptionData ? <SubscriptionData subscriptionData={subscriptionData} endpoint={protectedResources.armTenants.subscriptionEndpoint}/> : null }
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
export const Subscription = () => {
    const authRequest = {
        ...loginRequest
    };

    return (
        <MsalAuthenticationTemplate 
            interactionType={InteractionType.Redirect} 
            authenticationRequest={authRequest}
        >
            <SubscriptionContent />
        </MsalAuthenticationTemplate>
      )
};