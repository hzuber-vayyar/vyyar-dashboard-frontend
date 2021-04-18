const APIurl = process.env.NODE_ENV !== 'production' ? 'http://localhost:3080' : 'https://vayyar-dashboard.azurewebsites.net'

export async function getAllUsers() {
  const config = {
      method: 'GET',
      headers: { "Content-Type": "application/json", "Accept": "*/*", "Access-Control-Allow-Origin":"*" }
  }
  const response = await fetch(`${APIurl}/api/users`, config);
  console.log("response is", response)
  return await response.json();
}

export async function createUser(data) {
const config = {"method": 'POST',
    "headers": { "Content-Type": "application/json", "Accept": "application/json", "Access-Control-Allow-Origin":"*" },
    "body": JSON.stringify(data)}
console.log("config is ", config);

  const response = await fetch(`${APIurl}/api/user`, config);
  return await response.json();
}
