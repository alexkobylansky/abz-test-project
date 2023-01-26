export const URL = "https://frontend-test-assignment-api.abz.agency/api/v1/";

export const getToken = async () => {
  fetch(`${URL}token`)
    .then(response => response.json())
    .then(data => {
      console.log(data.token);
      localStorage.setItem("token", data.token)
    })
    .catch(error => console.log(error))
}