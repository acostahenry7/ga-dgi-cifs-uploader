const { mainServer } = require("../utils/constants/conections");

export async function login(data) {
  try {
    let response = await fetch(`${mainServer}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    let result = response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    let response = await fetch(`${mainServer}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    let result = response.json();

    return result;
  } catch (error) {
    throw error;
  }
}
