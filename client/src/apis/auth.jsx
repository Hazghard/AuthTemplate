const API_AUTH = "/api/auth";

export async function signin(credentials) {
  const response = await fetch(API_AUTH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  console.log('signin response :',response, response.ok);

  const body = await response.json();
  console.log('signin body :',body);

  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Oops une erreur est survenue");
    }
  }
}

export async function getCurrentUser() {
  const response = await fetch(`${API_AUTH}/current`);
  console.log('getCurrentUser response :',response);

  return response.json();
}

export async function signout() {
  await fetch(API_AUTH, {
    method: 'DELETE'
  });
}