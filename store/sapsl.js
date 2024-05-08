var hana = require("@sap/hana-client");
const axios = require("axios");
const config = require("../config");
const {
  externalSources: { sapServer },
} = config;
const {
  db: { hanadb },
} = require("../config");
var _ = require("lodash");

const origin = {
  source: "sapSL",
  type: "external",
};
let schema = "DB_LM";

let headers = {
  Cookie: "",
};

async function findAll(entity) {
  try {
    let response = await axios.get(`${sapServer}/${entity}?$top=10`, {
      headers,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    //console.log(error);
    throw error.message;
  }
}

// async function update(arr) {
//   // let arr = [
//   //   { "Codigo Unidad": "MPLLLLLM", "VALOR DEL CIF ": 9999 },
//   //   { "Codigo Unidad": "MPLLLLLM2", "VALOR DEL CIF ": 9999 },
//   //   { "Codigo Unidad": "LM7120925", "VALOR DEL CIF ": 13473.58823 },
//   //   { "Codigo Unidad": "LM7120926", "VALOR DEL CIF ": 13473.58823 },
//   // ];

//   try {
//     //await performSLLogin();
//     let result = {
//       updated: [],
//       notFound: [],
//       error: {},
//     };

//     const taxByInvType = await axios.get(`${sapServer}/SCGD_ConfLineasSum`, {
//       headers,
//     });

//     let taxes = [];
//     taxByInvType.data.value.forEach((item) => {
//       taxes.push(...item.SCGD_COBROXTIPOCollection);
//     });

//     const promises = arr.map(async (item, index) => {
//       const url = `${sapServer}/SCGD_VEH?%24select=Code,U_Tipo_Ven,U_Cod_Unid,U_Num_Plac,U_Des_Marc,U_Des_Mode,
//       U_Ano_Vehi,U_Des_Col,U_Num_Cili,U_CantPuer,U_Potencia,U_Val_CIF,U_CO2&%24filter=U_Cod_Unid%20eq%20'${
//         item[Object.keys(item)[0]]
//       }'`;
//       console.log(url);
//       const res = await axios.get(url, {
//         headers,
//       });

//       //console.log(res.data);
//       //const res = await response.json();

//       if (res.data.value.length > 0) {
//         let currentTaxes = taxes.filter(
//           (imp) => imp.U_Tipo == res.data.value[0]?.U_Tipo_Ven
//         );
//         console.log(currentTaxes);

//         const body = {
//           U_Val_CIF: item[`${Object.keys(item)[1]}`],
//         };

//         const updateResponse = await axios.patch(
//           `${sapServer}/SCGD_VEH('${res.data.value[0]?.Code}')`,
//           body,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               ...headers,
//             },
//           }
//         );

//         console.log(currentTaxes);
//         let impValues = {
//           // ItemValCO2: res.data.value[0].U_Val_CIF * ,
//         };

//         switch (vehCategory) {
//           case "VP":
//             // impValues.ItemValCO2= res.data.value[0].U_Val_CIF *
//             impValues.ItemValEndoso = res.data.value[0].U_Val_CIF;
//             impValues.ItemValLey557 = "";
//             impValues.ItemValMarbete = "";
//             impValues.ItemValPlacaExib = "";
//             break;
//           case "VL":
//             // impValues.ItemValCO2= res.data.value[0].U_Val_CIF *
//             impValues.ItemValEndoso = res.data.value[0].U_Val_CIF;
//             impValues.ItemValLey557 = "";
//             impValues.ItemValMarbete = "";
//             impValues.ItemValPlacaExib = "";
//             break;
//           case "MT":
//             // impValues.ItemValCO2= res.data.value[0].U_Val_CIF *
//             impValues.ItemValEndoso = res.data.value[0].U_Val_CIF;
//             impValues.ItemValLey557 = "";
//             impValues.ItemValMarbete = "";
//             impValues.ItemValPlacaExib = "";
//             break;
//           default:
//             break;
//         }

//         // console.log("LOG SAP", { updateResponse, meta });
//         // .then((updated) => {
//         //   console.log(item[`${Object.keys(item)[0]}`]);
//         //   result.updated.push(item[`${Object.keys(item)[0]}`]);

//         //   // let endoso_unit = {
//         //   //   DocNum: "",
//         //   //   DocDate: "",
//         //   //   DocCurr: "",
//         //   //   DocStatusAut: "",
//         //   //   DocStatusAutBy: "",
//         //   //   DocStatusImp: "",
//         //   //   LibPag: "",
//         //   //   LibLN: "",
//         //   //   ItemCode: "",
//         //   //   ItemGroup: "",
//         //   //   ItemType: "",
//         //   //   ItemId: "",
//         //   //   ItemRegistr: "",
//         //   //   ItemMarc: "",
//         //   //   ItemModel: "",
//         //   //   ItemYear: "",
//         //   //   ItemColor: "",
//         //   //   ItemCapacity: "",
//         //   //   ItemCili: "",
//         //   //   ItemDoor: "",
//         //   //   ItemForce: "",
//         //   //   ItemValCIF: "",
//         //   //   ItemValCO2: "",
//         //   //   ItemValEndoso: "",
//         //   //   ItemValLey557: "",
//         //   //   ItemValMarbete: "",
//         //   //   ItemValPlacaExib: "",
//         //   // };

//         //   // axios
//         //   //   .patch(
//         //   //     `${sapServer}/SCGD_VEH('${res.data.value[0]?.Code}')`,
//         //   //     endoso_unit,
//         //   //     {
//         //   //       headers: {
//         //   //         "Content-Type": "application/json",
//         //   //         ...headers,
//         //   //       },
//         //   //     }
//         //   //   )
//         //   //   .then((res2) => {})
//         //   //   .catch((err2) => {});
//         //   return result;
//         // })
//         // .catch((err) => {
//         //   //console.log("ERROR ", err.response);
//         //   console.log("ERROR ", err);
//         //   result.error.push(item[`${Object.keys(item)[0]}`]);
//         //   //throw err.response.data;
//         // });
//       } else {
//         result.notFound.push(item[`${Object.keys(item)[0]}`]);
//       }

//       // console.log(item[`${Object.keys(item)[0]}`]);

//       // console.log(
//       //   item[`${Object.keys(item)[0]}`],
//       //   item[`${Object.keys(item)[1]}`]
//       // );
//     });

//     await Promise.all(promises);

//     console.log(result);
//     return result;
//   } catch (error) {
//     throw error.response.data;
//     //console.log(error);
//     //return { error: 404 };
//   }
// }

async function update(arr, authNumber) {
  try {
    //await performSLLogin();
    let result = {
      updated: [],
      notFound: [],
      error: {},
    };

    var connection = hana.createConnection();
    connection.connect(hanadb.config);
    for (item of arr) {
      console.log("###############", item);
      await getCurrentItemData(item.Chasis, item.CIF, connection, authNumber);
    }

    //await Promise.all(promises);
    connection.disconnect();

    //console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
    //return { error: 404 };
  }
}

async function login(data) {
  const loginData = {
    CompanyDB: data.companyDB,
    Password: data.password,
    UserName: data.username,
  };

  console.log(loginData);
  try {
    schema = data.companyDB;
    let response = await axios.post(
      `${sapServer}/Login`,
      JSON.stringify(loginData)
    );

    headers.Cookie = `B1SESSION=${response.data["SessionId"]}`;

    let userData = await axios.get(
      `${sapServer}/Users?$select=UserCode,UserName,eMail,LastLoginTime&$filter=UserCode%20eq%20'${data.username}'`,
      {
        headers,
      }
    );

    return {
      ...response.data,
      userData: userData.data.value[0],
    };
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
    throw error.message;
  }
}

async function logout() {
  try {
    axios
      .post(`${sapServer}/Logout`, {
        headers,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    headers.Cookie = "";
  } catch (error) {
    throw error.response.data;
  }
}

async function getCurrentItemData(item, cifVal, connection, authNumber) {
  console.log(item);
  let selectQuery = `SELECT
  DISTINCT "OADM"."CompnyName" AS "OADM_CompanyName",

  "_SCGD_VEHICULO"."U_Cod_Unid" AS "_SCGD_VEHICULO_U_Cod_Unid",
  "_SCGD_VEHICULO"."U_Num_VIN" AS "_SCGD_VEHICULO_U_Num_VIN",
  "_SCGD_MARCA"."Name" AS "_SCGD_MARCA_Name",
  "_SCGD_MODELO"."U_Descripcion" AS "_SCGD_MODELO_U_Descripcion",
  "_SCGD_ESTILO"."U_GB_Modelo" AS "_SCGD_ESTILO_U_GB_Modelo",
  "_SCGD_CATEGORIA_VEHI"."Name" as "_SCGD_CATEGORIA_VEHI_Name",
  "_SCGD_ESPEXMODE"."U_Cod_MarComer" as "_SCGD_ESPEXMODE_U_Cod_MarComer",
  "_SCGD_VEHICULO"."U_Ano_Vehi" as "_SCGD_VEHICULO_U_Ano_Vehi",
  "_SCGD_VEHICULO"."U_Cant_Pas" as "_SCGD_VEHICULO_U_Cant_Pas",              
  "_SCGD_VEHICULO"."U_Num_Cili" as "_SCGD_VEHICULO_U_Num_Cili",
  "_SCGD_COLOR"."U_Descripcion" AS "_SCGD_COLOR_U_Descripcion",
  "_SCGD_TIPOVEHICULO"."Name" AS "_SCGD_TIPOVEHICULO_Name",
  COALESCE("_SCGD_ESPEXMODE"."U_CO2",
 0) AS "_SCGD_ESPEXMODE_U_CO2",
  COALESCE("_SCGD_VEHICULO"."U_Val_CIF",
 0) AS "_SCGD_VEHICULO_U_Val_CIF",
  COALESCE("_SCGD_EMISIONES_CO2"."U_Porcen",
 0) AS "_SCGD_EMISIONES_CO2_U_Porcen",
  COALESCE("_SCGD_COBROXTIPO_LEY557"."U_Porcentaje",
 0) AS "_SCGD_COBROXTIPO_LEY557_U_Porcentaje",
  COALESCE("_SCGD_COBROXTIPO_Marbete"."U_Porcentaje",
 0) AS "_SCGD_COBROXTIPO_Marbete_U_Porcentaje" ,
  COALESCE("_SCGD_COBROXTIPO_Marbete"."U_MontoL",
 0) AS "_SCGD_COBROXTIPO_Marbete_U_MontoL",
  COALESCE("_SCGD_COBROXTIPO_PlacaEx"."U_Porcentaje",
 0) AS "_SCGD_COBROXTIPO_PlacaEx_U_Porcentaje",
  COALESCE("_SCGD_COBROXTIPO_PlacaEx"."U_MontoL",
 0) AS "_SCGD_COBROXTIPO_PlacaEx_U_MontoL",
  COALESCE("_SCGD_COBROXTIPO_Endoso"."U_Porcentaje",
 0) AS "_SCGD_COBROXTIPO_Endoso_U_Porcentaje",
  COALESCE("_SCGD_COBROXTIPO_Endoso"."U_MontoL",
 0) AS "_SCGD_COBROXTIPO_Endoso_U_MontoL" 
FROM "${schema}"."@SCGD_VEHICULO" "_SCGD_VEHICULO" 
LEFT OUTER JOIN "${schema}"."@SCGD_MARCA" "_SCGD_MARCA" ON ("_SCGD_MARCA"."Code"="_SCGD_VEHICULO"."U_Cod_Marc" ) 
LEFT OUTER JOIN "${schema}"."@SCGD_ESTILO" "_SCGD_ESTILO" ON ("_SCGD_ESTILO"."Code"="_SCGD_VEHICULO"."U_Cod_Esti") 
LEFT OUTER JOIN "${schema}"."@SCGD_MODELO" "_SCGD_MODELO" ON ("_SCGD_MODELO"."Code"="_SCGD_VEHICULO"."U_Cod_Mode" 
 AND "_SCGD_ESTILO"."Code"="_SCGD_MODELO"."U_Cod_Esti") 
LEFT OUTER JOIN "${schema}"."@SCGD_TIPOVEHICULO" "_SCGD_TIPOVEHICULO" ON (CASE WHEN "_SCGD_VEHICULO"."U_Tipo" = '17' 
 THEN "_SCGD_VEHICULO"."U_Tipo_Ven" 
 ELSE "_SCGD_VEHICULO"."U_Tipo" 
 END ="_SCGD_TIPOVEHICULO"."Code") 
LEFT OUTER JOIN "${schema}"."@SCGD_CATEGORIA_VEHI" "_SCGD_CATEGORIA_VEHI" ON ("_SCGD_CATEGORIA_VEHI"."Code"="_SCGD_VEHICULO"."U_Categori") 
LEFT OUTER JOIN "${schema}"."@SCGD_ESPEXMODE" "_SCGD_ESPEXMODE" ON ("_SCGD_ESPEXMODE"."U_Cod_Marca"="_SCGD_ESTILO"."U_Cod_Marc") 
AND ("_SCGD_ESPEXMODE"."U_Cod_Estilo"="_SCGD_ESTILO"."Code") 
AND ("_SCGD_ESPEXMODE"."U_Cod_Modelo"="_SCGD_MODELO"."Code") 
LEFT OUTER JOIN "${schema}"."@SCGD_COLOR" "_SCGD_COLOR" ON ("_SCGD_VEHICULO"."U_Cod_Col"="_SCGD_COLOR"."Code") 
LEFT OUTER JOIN "${schema}"."@SCGD_EMISIONES" "_SCGD_EMISIONES_CO2" ON (COALESCE("_SCGD_ESPEXMODE"."U_CO2",
 0) BETWEEN COALESCE("_SCGD_EMISIONES_CO2"."U_CantMin",
 0) 
 AND COALESCE("_SCGD_EMISIONES_CO2"."U_CantMax",
 COALESCE("_SCGD_ESPEXMODE"."U_CO2",
 0))) 
LEFT OUTER JOIN (SELECT
  "_SCGD_COBROXTIPO"."U_Tipo",
  "_SCGD_COBROXTIPO"."U_Porcentaje" 
 FROM "${schema}"."@SCGD_CONFLINEASSUM" "_SCGD_CONFLINEASSUM" 
 INNER JOIN "${schema}"."@SCGD_COBROXTIPO" "_SCGD_COBROXTIPO" ON ("_SCGD_CONFLINEASSUM"."Code" = "_SCGD_COBROXTIPO"."Code" 
   and "_SCGD_CONFLINEASSUM"."U_Cod_GA" = "_SCGD_COBROXTIPO"."U_Cod_Gas") 
 WHERE "_SCGD_CONFLINEASSUM"."U_ImpPla" ='557-05' 
 AND "_SCGD_CONFLINEASSUM"."Canceled" = 'N') "_SCGD_COBROXTIPO_LEY557" ON ("_SCGD_COBROXTIPO_LEY557"."U_Tipo" = "_SCGD_TIPOVEHICULO"."Code") 
LEFT OUTER JOIN (SELECT
  "_SCGD_COBROXTIPO"."U_Tipo",
  "_SCGD_COBROXTIPO"."U_Porcentaje",
  "_SCGD_COBROXTIPO"."U_MontoL" 
 FROM "${schema}"."@SCGD_CONFLINEASSUM" "_SCGD_CONFLINEASSUM" 
 INNER JOIN "${schema}"."@SCGD_COBROXTIPO" "_SCGD_COBROXTIPO" ON ("_SCGD_CONFLINEASSUM"."Code" = "_SCGD_COBROXTIPO"."Code" 
   and "_SCGD_CONFLINEASSUM"."U_Cod_GA" = "_SCGD_COBROXTIPO"."U_Cod_Gas") 
 WHERE "_SCGD_CONFLINEASSUM"."U_ImpPla" ='P' 
 AND "_SCGD_COBROXTIPO"."U_Cod_Gas" = '1' 
 AND "_SCGD_CONFLINEASSUM"."Canceled" = 'N') "_SCGD_COBROXTIPO_PlacaEx" ON ("_SCGD_COBROXTIPO_PlacaEx"."U_Tipo" = "_SCGD_TIPOVEHICULO"."Code") 
LEFT OUTER JOIN (SELECT
  "_SCGD_COBROXTIPO"."U_Tipo",
  "_SCGD_COBROXTIPO"."U_Porcentaje",
  "_SCGD_COBROXTIPO"."U_MontoL" 
 FROM "${schema}"."@SCGD_CONFLINEASSUM" "_SCGD_CONFLINEASSUM" 
 INNER JOIN "${schema}"."@SCGD_COBROXTIPO" "_SCGD_COBROXTIPO" ON ("_SCGD_CONFLINEASSUM"."Code" = "_SCGD_COBROXTIPO"."Code" 
   and "_SCGD_CONFLINEASSUM"."U_Cod_GA" = "_SCGD_COBROXTIPO"."U_Cod_Gas") 
 WHERE "_SCGD_CONFLINEASSUM"."U_ImpPla" ='P' 
 AND "_SCGD_COBROXTIPO"."U_Cod_Gas" = '2' 
 AND "_SCGD_CONFLINEASSUM"."Canceled" = 'N') "_SCGD_COBROXTIPO_Marbete" ON ("_SCGD_COBROXTIPO_Marbete"."U_Tipo" = "_SCGD_TIPOVEHICULO"."Code") 
LEFT OUTER JOIN (SELECT
  "_SCGD_COBROXTIPO"."U_Tipo",
  "_SCGD_COBROXTIPO"."U_Porcentaje",
  "_SCGD_COBROXTIPO"."U_MontoL" 
 FROM "${schema}"."@SCGD_CONFLINEASSUM" "_SCGD_CONFLINEASSUM" 
 INNER JOIN "${schema}"."@SCGD_COBROXTIPO" "_SCGD_COBROXTIPO" ON ("_SCGD_CONFLINEASSUM"."Code" = "_SCGD_COBROXTIPO"."Code" 
   and "_SCGD_CONFLINEASSUM"."U_Cod_GA" = "_SCGD_COBROXTIPO"."U_Cod_Gas") 
 WHERE "_SCGD_CONFLINEASSUM"."U_ImpPla" ='P' 
 AND "_SCGD_COBROXTIPO"."U_Cod_Gas" in ( '3',
 '6') 
 AND "_SCGD_CONFLINEASSUM"."Canceled" = 'N') "_SCGD_COBROXTIPO_Endoso" ON ("_SCGD_COBROXTIPO_Endoso"."U_Tipo" = "_SCGD_TIPOVEHICULO"."Code") 
LEFT OUTER JOIN "${schema}"."OADM" "OADM" ON (1=1) 
WHERE 1=1 
AND "_SCGD_VEHICULO"."U_Num_VIN" = '${item}'`;

  try {
    let [currentMatch] = connection.exec(`SELECT COUNT(*) as "qty" 
    FROM "${schema}"."@GA_VEH_LIBRO_AUX_EN"
    WHERE  "U_ItemId" = '${item}'`);

    let [data] = await connection.exec(selectQuery);

    if (currentMatch.qty > 0) {
      await connection.exec(`UPDATE "${schema}"."@GA_VEH_LIBRO_AUX_EN" 
        SET "U_DGIIValCIF"='${cifVal}', 
        "U_DGIIValCO2"='${
          (data._SCGD_EMISIONES_CO2_U_Porcen / 100) * cifVal
        } ',  
        "U_DGIIValLey557"='${
          (data._SCGD_COBROXTIPO_LEY557_U_Porcentaje / 100) * cifVal
        }',  
        "U_DGIIValMarbete"='${data._SCGD_COBROXTIPO_Marbete_U_MontoL}', 
        "U_AutorizacionDGII" = '${authNumber}'
        WHERE "U_ItemId" ='${item}'
        `);
    } else {
      let [maxId] =
        await connection.exec(`SELECT COALESCE(MAX(CAST ("Code" AS INTEGER)),0) AS "MAX_Code" 
                                          FROM "${schema}"."@GA_VEH_LIBRO_AUX_EN"`);
      // schema = data.companyDB;

      //var result =
      //console.log(selectQuery);
      console.log(data);

      let insertQuery = `INSERT INTO ${schema}."@GA_VEH_LIBRO_AUX_EN"(\"Code\", \"Name\", \"U_DocStatusImp\", \"U_ItemCode\", \"U_ItemGroup\",\"U_ItemType\", \"U_ItemId\",
                                          \"U_ItemMarc\", \"U_ItemModel\", \"U_ItemYear\", \"U_ItemColor\", \"U_DGIIValCIF\", \"U_DGIIValCO2\", 
                                          \"U_DGIIValLey557\", \"U_DGIIValMarbete\", \"U_AutorizacionDGII\", \"U_ItemValCIF\", \"U_ItemValCO2\", 
                                          \"U_ItemValEndoso\", \"U_ItemValLey557\", \"U_ItemValMarbete\", \"U_ItemValPlacaExib\" )
                                          VALUES (\'${
                                            parseInt(maxId.MAX_Code) + 1
                                          }\', \'${
        data._SCGD_VEHICULO_U_Cod_Unid
      }\', \'P\', \'${data._SCGD_VEHICULO_U_Cod_Unid}\',
                                          \'${
                                            data._SCGD_CATEGORIA_VEHI_Name
                                          }\',  \'${
        data._SCGD_TIPOVEHICULO_Name
      }\', \'${data._SCGD_VEHICULO_U_Num_VIN}\', \'${
        data._SCGD_MARCA_Name
      }\', \'${data._SCGD_ESTILO_U_GB_Modelo}\', \'${
        data._SCGD_VEHICULO_U_Ano_Vehi
      }\', \'${data._SCGD_COLOR_U_Descripcion}\', \'${cifVal}\', \'${
        (data._SCGD_EMISIONES_CO2_U_Porcen / 100) * cifVal
      }\', \'${
        (parseFloat(data._SCGD_COBROXTIPO_LEY557_U_Porcentaje) / 100) * cifVal
      }\', \'${data._SCGD_COBROXTIPO_Marbete_U_MontoL}\', \'${authNumber}\',
      \'${data._SCGD_VEHICULO_U_Val_CIF}\', \'${
        parseFloat(data._SCGD_EMISIONES_CO2_U_Porcen / 100) *
        data._SCGD_VEHICULO_U_Val_CIF
      }\', \'${data._SCGD_COBROXTIPO_Endoso_U_MontoL}\', \'${
        (parseFloat(data._SCGD_COBROXTIPO_LEY557_U_Porcentaje) / 100) *
        data._SCGD_VEHICULO_U_Val_CIF
      }\', \'${data._SCGD_COBROXTIPO_Marbete_U_MontoL}\', \'${
        data._SCGD_COBROXTIPO_PlacaEx_U_MontoL
      }\')`;
      await connection.exec(insertQuery);
      console.log(
        `RESULTADO DE CONSULTA EN ${schema} ITEM ${item} `,
        maxId,
        insertQuery
      );
    }

    //return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  //createFields,

  origin,
  findAll,
  update,
  login,
  logout,
  cookies: headers.Cookie,
};
