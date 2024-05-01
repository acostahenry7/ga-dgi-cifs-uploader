const { mainServer } = require("../utils/constants/conections");

export async function upload(data) {
  let formData = new FormData();
  formData.append("file", data);

  try {
    let response = await fetch(`${mainServer}/cifs/upload`, {
      method: "POST",
      body: formData,
    });

    let result = await response.json();
    return result;
  } catch (error) {}
}

export async function sync(data, authNumber) {
  let formData = new FormData();
  formData.append("file", data);
  formData.append("authNumber", authNumber);

  try {
    let response = await fetch(`${mainServer}/cifs/update`, {
      method: "POST",
      body: formData,
    });
    let result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
