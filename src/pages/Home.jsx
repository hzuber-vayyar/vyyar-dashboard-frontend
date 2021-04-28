import { useEffect, useState } from "react";

// Msal imports
import { MsalAuthenticationTemplate, useMsal, UnauthenticatedTemplate } from "@azure/msal-react";
import { InteractionStatus, InteractionType } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";

// Sample app imports
import { Loading } from "../ui-components/Loading";
import { ErrorComponent } from "../ui-components/ErrorComponent";
import { callMsGraph } from "../utils/MsGraphApiCall";

// Material-ui imports
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const HomeContent = () => {
    const { inProgress } = useMsal();
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {
        if (!graphData && inProgress === InteractionStatus.None) {
            callMsGraph("https://management.azure.com/subscriptions?api-version=2020-01-01").then(response => setGraphData(response));
        }
    }, [inProgress, graphData]);
  
    return (
        <Paper>
            { graphData ? <p dangerouslySetInnerHTML={{__html: JSON.stringify(graphData)}} /> : null }
        </Paper>
    );
};

export function Home() {
    const authRequest = {
        ...loginRequest
    };

    return (
      <>
        <MsalAuthenticationTemplate 
            interactionType={InteractionType.Popup} 
            authenticationRequest={authRequest} 
            errorComponent={ErrorComponent} 
            loadingComponent={Loading}
        >
            <HomeContent />
        </MsalAuthenticationTemplate>
      

          <UnauthenticatedTemplate>
            <Typography variant="h6">
              <center>Please sign-in to see your profile information.</center>
            </Typography>
          </UnauthenticatedTemplate>
      </>
  );
}