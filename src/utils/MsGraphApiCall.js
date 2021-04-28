import { loginRequest, graphConfig } from "../authConfig";
import { msalInstance } from "../index";

export async function callMsGraph(endpoint) {
  const fetchUrl = endpoint === "me" ? graphConfig.graphMeEndpoint : endpoint;
  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw Error(
      "No active account! Verify a user has been signed in and setActiveAccount has been called."
    );
  }

  const response = await msalInstance.acquireTokenSilent({
    ...loginRequest,
    account: account,
  });

  const headers = new Headers();
  const bearer = `Bearer ${response.accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(fetchUrl, options)
    .then(function (response) {
      console.log(response)
      return response.json();
    })
    .catch((error) => console.log(error));
}
