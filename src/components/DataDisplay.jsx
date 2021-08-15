import "../styles/App.css";
import { Link } from "react-router-dom";

export const ProfileData = (props) => {
  const tableRows = Object.entries(props.graphData).map((entry, index) => {
    return (
      <tr key={index}>
        <td>
          <b>{entry[0]}: </b>
        </td>
        <td>{entry[1]}</td>
      </tr>
    );
  });

  return (
    <div className="data-area">
      <div className="data-area--header">
        <p>
          Calling <strong>Microsoft Graph API</strong>...
        </p>
        <ul>
          <li>
            <strong>resource:</strong> <mark>User</mark> object
          </li>
          <li>
            <strong>endpoint:</strong>{" "}
            <mark>https://graph.microsoft.com/v1.0/me</mark>
          </li>
          <li>
            <strong>scope:</strong> <mark>user.read</mark>
          </li>
        </ul>
        <p>
          Contents of the <strong>response</strong> is below:
        </p>
      </div>
      <div className="data-area--response">
        <table>
          <thead></thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </div>
  );
};

export const SubscriptionData = (props) => {
  const tableRows = props.subscriptionData.value.map((entry, index) => {
    const rows = [];

    if (entry.name.includes("AzureMVP")) {
      rows.push(
        <div key={index} className="data-area--results--resource">
          <h5 className="data-area--results--resource__name">
            <Link to={`/resourcegroup/${entry.name}`}>{entry.name}</Link>
          </h5>
          <div className="data-area--results--resource__git">
            <p className="data-area--results--resource__git__title">
              Git Hash:
            </p>
            <p className="data-area--results--resource__git__hash">
              {entry.tags.git_hash
                ? entry.tags.git_hash
                : `No git hash found for this resource`}
            </p>
          </div>
        </div>
      );
    }
    return rows;
  });

  return (
    <div className="data-area">
      <div className="data-area--header">
        <p>
          Calling <strong>Azure Resource Manager API</strong>...
        </p>
        <ul>
          <li>
            <strong>resource:</strong> <mark>Subscription</mark> object
          </li>
          <li>
            <strong>endpoint:</strong> <mark>{props.endpoint}</mark>
          </li>
          <li>
            <strong>scope:</strong>{" "}
            <mark>https://management.azure.com/user_impersonation</mark>
          </li>
        </ul>
        <p>
          Contents of the <strong>response</strong> is below:
        </p>
      </div>
      <div className="data-area--results">{tableRows}</div>
    </div>
  );
};

export const IotHubData = (props) => {
  const data = JSON.stringify(props.iotHubData);

  return (
    <div className="iot-hub-page">
      <p>
        <strong>endpoint:</strong> <mark>{props.endpoint}</mark>
      </p>
      <p>{data}</p>
    </div>
  );
};

export const DatabaseData = (props) => {
  const data = JSON.stringify(props.databaseData);

  return (
    <div className="database-page">
      <p>
        <strong>endpoint:</strong> <mark>{props.endpoint}</mark>
      </p>
      <p>{data}</p>
    </div>
  );
};
