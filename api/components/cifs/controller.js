const reader = require("xlsx");
const path = require("path");
const fs = require("fs");

let filePath = path.join(__dirname, "./resources/cifs.xlsx");

function handleFileReading() {
  const file = reader.readFile(filePath);

  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
  let data = [];
  temp.map((item) => {
    data.push(item);
  });

  return data;
}

function deleteUploadedFile() {
  fs.unlinkSync(filePath);
}

module.exports = (injectedStore) => {
  let store;

  if (!injectedStore) {
    store = dummy;
  } else {
    store = injectedStore;
  }

  async function uploader() {
    try {
      let arr = handleFileReading();
      // console.log(arr);

      let result = [];

      //console.log(arr);

      arr.map((item) => {
        console.log("READING FILE....", item);

        result.push({
          vin: item.Chasis,
          brand: item.Marca,
          model: item.Modelo,
          year: item["Año"],
          color: item.Color,
          cif: item.CIF,
          // uCode: item["Codigo Unidad"],
          // cif: item["VALOR DEL CIF "],
        });
      });

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function update(authNumber) {
    try {
      let arr = handleFileReading();
      let data = await store.update(arr, authNumber);
      // console.log(data);
      deleteUploadedFile();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return {
    update,
    uploader,
  };
};
