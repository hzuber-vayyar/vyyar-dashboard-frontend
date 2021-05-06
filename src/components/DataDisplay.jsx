import "../styles/App.css";

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
    <>
      <div className="data-area-div">
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
      <div className="data-area-div">
        <table>
          <thead></thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </>
  );
};

export const SubscriptionData = (props) => {
  const tableRows = props.subscriptionData.value.map((entry, index) => {
    const rows = [];

    if (entry.name.includes("AzureMVP")) {
      rows.push(
        <div key={index} className="data-area--results--resource">
            <h3 className="data-area--results--resource__name">{entry.name}</h3>
            <div className="data-area--results--resource__git">
                <p className="data-area--results--resource__git__title">Git Hash:</p>
                <p className="data-area--results--resource__git__hash">{entry.tags.git_hash ? entry.tags.git_hash : `No git hash found for this resource`}</p>
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
            <strong>endpoint:</strong>{" "}
            <mark>
              {props.endpoint}
            </mark>
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
