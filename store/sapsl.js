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

async function update(arr, authNumber, paymentNum) {
  try {
    //await performSLLogin();
    let result = {
      updated: [],
      notFound: [],
      error: {},
    };

    var connection = hana.createConnection();
    connection.connect(hanadb.config);
    let i = 1;
    for (item of arr) {
      let found = await getCurrentItemData(
        item.Chasis,
        item.CIF,
        connection,
        authNumber,
        paymentNum
      );

      console.log("itWasFound ", found);
      console.log(`${i} of ${arr.length}`);
      i++;
      if (found) {
        result.updated.push(item);
      } else {
        result.notFound.push(item);
      }
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

    console.log(headers.Cookie);
    let companyData = await axios.post(
      `${sapServer}/CompanyService_GetCompanyInfo`,
      JSON.stringify({}),
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: headers.Cookie,
        },
      }
    );
    console.log(companyData.data);
    //console.log(userData);
    // let companyData = await axios.post(
    //   `${sapServer}/CompanyService_GetCompanyInfo`,
    //   {
    //     headers,
    //   }
    // );

    //console.log(companyData);
    return {
      ...response.data,
      userData: userData.data.value[0],
      companyName: companyData.data.CompanyName,
    };
  } catch (error) {
    //console.log(error.data);
    //console.log(error.response.data);
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

async function getCurrentItemData(
  item,
  cifVal,
  connection,
  authNumber,
  paymentNum
) {
  //console.log("*************", item, cifVal);
  let selectQuery = `
  SELECT DISTINCT "OADM"."CompnyName" AS "OADM_CompanyName",
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
FROM "@SCGD_VEHICULO" "_SCGD_VEHICULO"
LEFT OUTER JOIN "@SCGD_MARCA" "_SCGD_MARCA" ON ("_SCGD_MARCA"."Code"="_SCGD_VEHICULO"."U_Cod_Marc" )
LEFT OUTER JOIN "@SCGD_ESTILO" "_SCGD_ESTILO" ON ("_SCGD_ESTILO"."Code"="_SCGD_VEHICULO"."U_Cod_Esti")
LEFT OUTER JOIN "@SCGD_MODELO" "_SCGD_MODELO" ON ("_SCGD_MODELO"."Code"="_SCGD_VEHICULO"."U_Cod_Mode"
 AND "_SCGD_ESTILO"."Code"="_SCGD_MODELO"."U_Cod_Esti")
LEFT OUTER JOIN "@SCGD_TIPOVEHICULO" "_SCGD_TIPOVEHICULO" ON (CASE WHEN "_SCGD_VEHICULO"."U_Tipo" = '17'
 THEN "_SCGD_VEHICULO"."U_Tipo_Ven"
 ELSE "_SCGD_VEHICULO"."U_Tipo"
 END ="_SCGD_TIPOVEHICULO"."Code")
LEFT OUTER JOIN "@SCGD_CATEGORIA_VEHI" "_SCGD_CATEGORIA_VEHI" ON ("_SCGD_CATEGORIA_VEHI"."Code"="_SCGD_VEHICULO"."U_Categori")
LEFT OUTER JOIN "@SCGD_ESPEXMODE" "_SCGD_ESPEXMODE" ON ("_SCGD_ESPEXMODE"."U_Cod_Marca"="_SCGD_ESTILO"."U_Cod_Marc")
AND ("_SCGD_ESPEXMODE"."U_Cod_Estilo"="_SCGD_ESTILO"."Code")
AND ("_SCGD_ESPEXMODE"."U_Cod_Modelo"="_SCGD_MODELO"."Code")
LEFT OUTER JOIN "@SCGD_COLOR" "_SCGD_COLOR" ON ("_SCGD_VEHICULO"."U_Cod_Col"="_SCGD_COLOR"."Code")
LEFT OUTER JOIN "@SCGD_EMISIONES" "_SCGD_EMISIONES_CO2" ON (COALESCE("_SCGD_ESPEXMODE"."U_CO2",
 0) BETWEEN COALESCE("_SCGD_EMISIONES_CO2"."U_CantMin",
 0)
 AND COALESCE("_SCGD_EMISIONES_CO2"."U_CantMax",
 COALESCE("_SCGD_ESPEXMODE"."U_CO2",
 0)))
LEFT OUTER JOIN (SELECT
  "_SCGD_COBROXTIPO"."U_Tipo",
  "_SCGD_COBROXTIPO"."U_Porcentaje"
 FROM "@SCGD_CONFLINEASSUM" "_SCGD_CONFLINEASSUM"
 INNER JOIN "@SCGD_COBROXTIPO" "_SCGD_COBROXTIPO" ON ("_SCGD_CONFLINEASSUM"."Code" = "_SCGD_COBROXTIPO"."Code"
   and "_SCGD_CONFLINEASSUM"."U_Cod_GA" = "_SCGD_COBROXTIPO"."U_Cod_Gas")
 WHERE "_SCGD_CONFLINEASSUM"."U_ImpPla" ='557-05'
 AND "_SCGD_CONFLINEASSUM"."Canceled" = 'N') "_SCGD_COBROXTIPO_LEY557" ON ("_SCGD_COBROXTIPO_LEY557"."U_Tipo" = "_SCGD_TIPOVEHICULO"."Code")
LEFT OUTER JOIN (SELECT
  "_SCGD_COBROXTIPO"."U_Tipo",
  "_SCGD_COBROXTIPO"."U_Porcentaje",
  "_SCGD_COBROXTIPO"."U_MontoL"
 FROM "@SCGD_CONFLINEASSUM" "_SCGD_CONFLINEASSUM"
 INNER JOIN "@SCGD_COBROXTIPO" "_SCGD_COBROXTIPO" ON ("_SCGD_CONFLINEASSUM"."Code" = "_SCGD_COBROXTIPO"."Code"
   and "_SCGD_CONFLINEASSUM"."U_Cod_GA" = "_SCGD_COBROXTIPO"."U_Cod_Gas")
 WHERE "_SCGD_CONFLINEASSUM"."U_ImpPla" ='P'
 AND "_SCGD_COBROXTIPO"."U_Cod_Gas" = '1'
 AND "_SCGD_CONFLINEASSUM"."Canceled" = 'N') "_SCGD_COBROXTIPO_PlacaEx" ON ("_SCGD_COBROXTIPO_PlacaEx"."U_Tipo" = "_SCGD_TIPOVEHICULO"."Code")
LEFT OUTER JOIN (SELECT
  "_SCGD_COBROXTIPO"."U_Tipo",
  "_SCGD_COBROXTIPO"."U_Porcentaje",
  "_SCGD_COBROXTIPO"."U_MontoL"
 FROM "@SCGD_CONFLINEASSUM" "_SCGD_CONFLINEASSUM"
 INNER JOIN "@SCGD_COBROXTIPO" "_SCGD_COBROXTIPO" ON ("_SCGD_CONFLINEASSUM"."Code" = "_SCGD_COBROXTIPO"."Code"
   and "_SCGD_CONFLINEASSUM"."U_Cod_GA" = "_SCGD_COBROXTIPO"."U_Cod_Gas")
 WHERE "_SCGD_CONFLINEASSUM"."U_ImpPla" ='P'
 AND "_SCGD_COBROXTIPO"."U_Cod_Gas" = '2'
 AND "_SCGD_CONFLINEASSUM"."Canceled" = 'N') "_SCGD_COBROXTIPO_Marbete" ON ("_SCGD_COBROXTIPO_Marbete"."U_Tipo" = "_SCGD_TIPOVEHICULO"."Code")
LEFT OUTER JOIN (SELECT
  "_SCGD_COBROXTIPO"."U_Tipo",
  "_SCGD_COBROXTIPO"."U_Porcentaje",
  "_SCGD_COBROXTIPO"."U_MontoL"
 FROM "@SCGD_CONFLINEASSUM" "_SCGD_CONFLINEASSUM"
 INNER JOIN "@SCGD_COBROXTIPO" "_SCGD_COBROXTIPO" ON ("_SCGD_CONFLINEASSUM"."Code" = "_SCGD_COBROXTIPO"."Code"
   and "_SCGD_CONFLINEASSUM"."U_Cod_GA" = "_SCGD_COBROXTIPO"."U_Cod_Gas")
 WHERE "_SCGD_CONFLINEASSUM"."U_ImpPla" ='P'
 AND "_SCGD_COBROXTIPO"."U_Cod_Gas" in ( '3',
 '6')
 AND "_SCGD_CONFLINEASSUM"."Canceled" = 'N') "_SCGD_COBROXTIPO_Endoso" ON ("_SCGD_COBROXTIPO_Endoso"."U_Tipo" = "_SCGD_TIPOVEHICULO"."Code")
LEFT OUTER JOIN "OADM" "OADM" ON (1=1)
WHERE 1=1
  AND "_SCGD_VEHICULO"."U_Num_VIN" = '${item}'`;

  let invoiceQuery = `
SELECT DISTINCT "Año","Mes","Fecha","Embarque", "Inventario","Marca", "Modelo","Chasis","Cuenta",  "Cliente","Documento de Identidad","Numero de Comprobante",
                "Placa Exhibicion", "Exhibicion", "Vencimiento Exhibicion",  "Solicitud Placa","Recepción Placa Adu.",   "Vencimiento", "SubTotal a RD$", ROUND("Valor a RD$",2)"Valor a RD$",
                ROUND("Precio Venta",2) "Precio Venta", "U_CO2","Total de Placa",  "Pagado a la Fecha", ROUND("Por Saldar",2)"Por Saldar",  "U_Factura", "U_Ley_557", "U_NCF", "CIF"
FROM (
       SELECT TO_VARCHAR(YEAR(T1."DocDate")) AS "Año",
                TO_VARCHAR(MONTH(T1."DocDate")) AS "Mes",
                T1."DocDate" AS "Fecha",
                T0."U_NoPedFb" AS "Embarque",
                CASE
                  WHEN T0."U_Tipo" = '17' THEN
                          CASE WHEN T0."U_Tipo_Ven" IN ('13','14','15','16','19','20','22') THEN 'Motocicletas'
                                   WHEN T0."U_Tipo_Ven" IN ('21') THEN 'Montacargas'
                                   WHEN T0."U_Tipo_Ven" IN ('23','24','25') THEN 'OTROS' ELSE 'Vehiculos' END
                  WHEN T0."U_Tipo" IN ('13','14','15','16','19','20','22') THEN 'Motocicletas'
                                   WHEN T0."U_Tipo" IN ('21') THEN 'Montacargas'
                                   WHEN T0."U_Tipo" IN ('23','24','25') THEN 'OTROS' ELSE 'Vehiculos'
                END AS "Inventario",
                T8."Name" AS "Marca",
                T7."U_GB_NombreModelo"  as "Modelo",
                T0."U_Cod_Unid" AS "Código", T0."U_Num_VIN" AS "Chasis",
                T1."CardCode" AS "Cuenta",
                T1."CardName" AS "Cliente",
                        T6."LicTradNum" AS "Documento de Identidad",
                         T1."U_NCF" AS "Numero de Comprobante",
--       COALESCE(T0."U_Num_Plac",'') AS "Placa",
              COALESCE(T0."U_SCGD_PlacaExhibicion",'') AS "Placa Exhibicion",
              COALESCE(T0."U_SCGD_FechaExhib",'') AS "Exhibicion",
              COALESCE(add_days(T0."U_SCGD_FechaExhib",90),'') AS "Vencimiento Exhibicion",
              COALESCE(T0."U_SCGD_FechaSPlaca",'') AS "Solicitud Placa",
              COALESCE(T0."U_SCGD_FechaRecAdu",'') AS "Recepción Placa Adu.",
              DAYS_BETWEEN(T1."DocDate", CURRENT_DATE) AS "Vencimiento",
              SUM(TD1."LineTotal") AS "SubTotal a RD$",

              CASE  WHEN T1."DocCur" = 'USD' THEN  (T1."DocTotalFC" * T1."DocRate")
                 ELSE    T1."DocTotal"  END AS "Valor a RD$",
              CASE WHEN T1."DocTotalFC" IS NULL OR T1."DocTotalFC" = 0 THEN   T1."DocTotal"
                ELSE T1."DocTotalFC"   END AS  "Precio Venta",
              ROUND(T0."U_Val_CIF" * (COALESCE((T17."U_Porcentaje"),0)/100),2) AS "U_Ley_557",
--              COALESCE(SUM(T2."LineTotal"),0) AS "Ley 557-05 (RD$)",
              CASE  WHEN T1."DocCur" = 'USD' THEN  ROUND(COALESCE(sum(T3."LineTotal"),0) ,2)
              ELSE    ROUND(COALESCE(sum(T3."LineTotal"),0), 2)   END AS "U_CO2",
--              (ROUND(T0."U_Val_CIF" * 0.17,2) + COALESCE(SUM(T3."LineTotal"),0)) AS "Total",
              (ROUND(T0."U_Val_CIF" * (COALESCE((T17."U_Porcentaje"),0)/100) ,2) ) AS "Total de Placa",
--              (COALESCE(SUM(T2."LineTotal"),0) + COALESCE(SUM(T3."LineTotal"),0)) AS "Total",
              CASE WHEN T1."PaidFC" IS NULL OR T1."PaidFC" = 0 THEN   T1."PaidToDate"
                ELSE T1."PaidFC"  END AS  "Pagado a la Fecha",
              ((CASE WHEN T1."DocTotalFC" IS NULL OR T1."DocTotalFC" = 0 THEN   T1."DocTotal"
                ELSE T1."DocTotalFC"   END ) -
                (CASE WHEN T1."PaidFC" IS NULL OR T1."PaidFC" = 0 THEN   T1."PaidToDate"
                ELSE T1."PaidFC"  END )) as "Por Saldar",
                T1."DocNum" as "U_Factura",
                T1."U_NCF",
                T0."U_Val_CIF" as "CIF"
          FROM "@SCGD_VEHICULO" T0
          INNER JOIN OINV T1 ON T0."U_Cod_Unid" = T1."U_SCGD_Cod_Unidad"
          LEFT JOIN (SELECT SUM(TD1."LineTotal") AS "LineTotal", TD1."DocEntry" FROM INV1 TD1 GROUP BY TD1."DocEntry") TD1
          ON TD1."DocEntry"= T1."DocEntry"
          INNER JOIN OCRD T6 ON T1."CardCode" = T6."CardCode"
          LEFT JOIN (SELECT I3.* FROM INV3 I3 INNER JOIN OEXD OE ON I3."ExpnsCode" = OE."ExpnsCode" AND OE."ExpnsName" LIKE '%557-05%') T2
                 ON T1."DocEntry" = T2."DocEntry"
          LEFT JOIN (SELECT I3.* FROM INV3 I3 INNER JOIN OEXD OE ON I3."ExpnsCode" = OE."ExpnsCode" AND OE."ExpnsName" LIKE '%CO2%') T3
                 ON T1."DocEntry" = T3."DocEntry"
         INNER JOIN "@SCGD_CVENTA" T4 ON T1."U_SCGD_NoContrato" = T4."DocEntry" AND T4."U_Reversa" = 'N'
         INNER JOIN "@SCGD_VEHIXCONT" T5 ON  T4."DocEntry" = T5."DocEntry" AND T5."U_Cod_Unid" = T0."U_Cod_Unid" AND T5."U_Reversa" = 'N'
         LEFT OUTER JOIN "@SCGD_ESPEXMODE" T16 ON T0."U_Cod_Marc" = T16."U_Cod_Marca"
                AND T0."U_Cod_Mode" = T16."U_Cod_Modelo"
                 AND T0."U_Cod_Esti" = T16."U_Cod_Estilo"
         LEFT OUTER JOIN "@SCGD_ESTILO" T7 ON T16."U_Cod_Marca"= T7."U_Cod_Marc"
 		AND T16."U_Cod_Estilo"= T7."Code"
         LEFT OUTER JOIN "@SCGD_MARCA" T8 ON T16."U_Cod_Marca"= T8."Code"
         LEFT OUTER JOIN "@SCGD_MODELO" T9 ON T16."U_Cod_Estilo"= T9."U_Cod_Esti"
 		AND T16."U_Cod_Modelo"= T9."Code"
          INNER JOIN "@SCGD_CONF_ART_VENTA" T10 ON T16."U_Cod_MarComer"= T10."U_ArtVent"
          INNER JOIN "OITM" T11 ON T10."U_ArtVent"= T11."ItemCode"
	     LEFT JOIN (SELECT T1."U_Tipo",  T1."U_Porcentaje" FROM "@SCGD_COBROXTIPO" T1
 		            INNER JOIN "@SCGD_CONFLINEASSUM" T2 ON (T1."Code" = T2."Code" AND T1."U_Cod_Gas" = T2."U_Cod_GA" and "U_ImpPla" = '557-05' and "Canceled" = 'N'))AS T17 ON (T17."U_Tipo" = T0."U_Tipo_Ven")
       GROUP BY T1."DocDate", T0."U_SCGD_PlacaExhibicion", T0."U_SCGD_FechaExhib", T0."U_SCGD_FechaSPlaca",T0."U_NoPedFb", T0."U_Cod_Unid", T0."U_Num_VIN",
                  T0."U_SCGD_FechaSPlaca", T0."U_SCGD_FechaRecAdu", T0."U_Num_Plac", T0."U_Tipo", T0."U_Tipo_Ven", T1."CardCode", T6."LicTradNum",T1."CardName", T1."DocNum", T1."DocCur",
                          T1."DocTotalFC", T1."DocTotal", T1."DocRate", T1."U_NCF", T1."PaidToDate",  T1."PaidFC",T0."U_Val_CIF",   T8."Name",  T7."U_GB_NombreModelo",TD1."LineTotal",
                          T17."U_Porcentaje", T1."U_NCF"
       HAVING (COALESCE(SUM(T2."LineTotal"),0) + COALESCE(SUM(T3."LineTotal"),0)) > 0
       UNION ALL
       SELECT TO_VARCHAR(YEAR(T1."DocDate")) AS "Año",
                TO_VARCHAR(MONTH(T1."DocDate")) AS "Mes",
                TO_VARCHAR(T1."DocDate") AS "Fecha",
                T0."U_NoPedFb" AS "Embarque",
                CASE
                  WHEN T0."U_Tipo" = '17' THEN
                          CASE WHEN T0."U_Tipo_Ven" IN ('13','14','15','16','19','20','22') THEN 'Motocicletas'
                                   WHEN T0."U_Tipo_Ven" IN ('21') THEN 'Montacargas'
                                   WHEN T0."U_Tipo_Ven" IN ('23','24','25') THEN 'OTROS' ELSE 'Vehiculos' END
                  WHEN T0."U_Tipo" IN ('13','14','15','16','19','20','22') THEN 'Motocicletas'
                                   WHEN T0."U_Tipo" IN ('21') THEN 'Montacargas'
                                   WHEN T0."U_Tipo" IN ('23','24','25') THEN 'OTROS' ELSE 'Vehiculos'
                END AS "Inventario",
                T8."Name" AS "Marca",
                T7."U_GB_NombreModelo"  as "Modelo",
                T0."U_Cod_Unid" AS "Código", T0."U_Num_VIN" AS "Chasis",
                T1."CardCode" AS "Cuenta",
                T1."CardName" AS "Cliente",
                        T6."LicTradNum" AS "Documento de Identidad",
                         T1."U_NCF" AS "Numero de Comprobante",
--       COALESCE(T0."U_Num_Plac",'') AS "Placa",
              COALESCE(T0."U_SCGD_PlacaExhibicion",'') AS "Placa Exhibicion",
              COALESCE(T0."U_SCGD_FechaExhib",'') AS "Exhibicion",
              COALESCE(add_days(T0."U_SCGD_FechaExhib",90),'') AS "Vencimiento Exhibicion",
              COALESCE(T0."U_SCGD_FechaSPlaca",'') AS "Solicitud Placa",
              COALESCE(T0."U_SCGD_FechaRecAdu",'') AS "Recepción Placa Adu.",
              DAYS_BETWEEN(T1."DocDate", CURRENT_DATE) AS "Vencimiento",
              SUM(TD1."LineTotal") AS "SubTotal a RD$",
              CASE  WHEN T1."DocCur" = 'USD' THEN  ((TD1."TotalFrgn"+TD1."VatSumFrgn"+ (CASE WHEN T1."DocCur" = 'USD' THEN  COALESCE(TG1."CO2",0) ELSE ROUND(COALESCE(TG1."CO2",0) / T1."DocRate",2) END)+
                                                     (CASE WHEN T1."DocCur" = 'USD' THEN COALESCE(TG2."Ley557",0) ELSE ROUND(COALESCE(TG2."Ley557",0) / T1."DocRate",2) END)+
                                                     (CASE WHEN T1."DocCur" = 'USD' THEN COALESCE(TG3."Otros",0) ELSE  ROUND(COALESCE(TG3."Otros",0) / T1."DocRate",2) END)) * T1."DocRate")
                 ELSE    (TD1."LineTotal"+TD1."VatSum"+(CASE WHEN T1."DocCur" = 'USD' THEN ROUND(COALESCE(TG1."CO2",0) * T1."DocRate",2) ELSE COALESCE(TG1."CO2",0) END) +
                                                     (CASE WHEN T1."DocCur" = 'USD' THEN ROUND(COALESCE(TG2."Ley557",0) * T1."DocRate",2) ELSE COALESCE(TG2."Ley557",0)END)+
                                                     (CASE WHEN T1."DocCur" = 'USD' THEN  ROUND(COALESCE(TG3."Otros",0) * T1."DocRate",2) ELSE COALESCE(TG3."Otros",0) END))  END AS "Valor a RD$",
              CASE  WHEN T1."DocCur" = 'USD' THEN  (TD1."TotalFrgn"+TD1."VatSumFrgn" + (CASE WHEN T1."DocCur" = 'USD' THEN COALESCE(TG1."CO2",0) ELSE ROUND(COALESCE(TG1."CO2",0) / T1."DocRate",2) END)+
                                                     (CASE WHEN T1."DocCur" = 'USD' THEN COALESCE(TG2."Ley557",0) ELSE ROUND(COALESCE(TG2."Ley557",0) / T1."DocRate",2) END)+
                                                     (CASE WHEN T1."DocCur" = 'USD' THEN COALESCE(TG3."Otros",0) ELSE ROUND(COALESCE(TG3."Otros",0) / T1."DocRate",2) END))
                 ELSE    (TD1."LineTotal"+TD1."VatSum"+(CASE WHEN TG1."OCRN_CurrCode" = 'USD' THEN COALESCE(TG1."CO2",0) ELSE ROUND(COALESCE(TG1."CO2",0) / T1."DocRate",2) END)+
                                                     (CASE WHEN T1."DocCur" = 'USD' THEN COALESCE(TG2."Ley557",0) ELSE ROUND(COALESCE(TG2."Ley557",0) / T1."DocRate",2) END)+
                                                     (CASE WHEN T1."DocCur" = 'USD' THEN COALESCE(TG3."Otros",0) ELSE ROUND(COALESCE(TG3."Otros",0) / T1."DocRate",2) END))  END AS  "Precio Venta",
--               ROUND(T0."U_Val_CIF" * 0.17,2) AS "Ley 557-05 (RD$)",
                (ROUND((T0."U_Val_CIF" * (COALESCE((T17."U_Porcentaje"),0)/100)),2) ) AS "U_Ley_557", 
               --(CASE WHEN T1."DocCur" = 'USD' THEN ROUND(COALESCE(TG2."Ley557",0) * T1."DocRate",2) ELSE COALESCE(TG2."Ley557",0) END) AS "U_Ley_557",
--              COALESCE(SUM(T2."LineTotal"),0) AS "Ley 557-05 (RD$)",
                COALESCE(SUM(CASE WHEN T1."DocCur" = 'USD' THEN ROUND(COALESCE(TG1."CO2",0) * T1."DocRate",2) ELSE ROUND(COALESCE(TG1."CO2",0) / T1."DocRate",2) END),0) AS "U_CO2",
--              (ROUND(T0."U_Val_CIF" * 0.17,2) + COALESCE(SUM(T3."LineTotal"),0)) AS "Total",
              (ROUND((T0."U_Val_CIF" * (COALESCE((T17."U_Porcentaje"),0)/100)),2) ) AS "Total de Placa",
              CASE WHEN T1."PaidFC" IS NULL OR T1."PaidFC" = 0 THEN   T1."PaidToDate"
                ELSE T1."PaidFC"  END AS  "Pagado a la Fecha",
              ((CASE WHEN T1."DocTotalFC" IS NULL OR T1."DocTotalFC" = 0 THEN   T1."DocTotal"
                ELSE T1."DocTotalFC"   END ) -
                (CASE WHEN T1."PaidFC" IS NULL OR T1."PaidFC" = 0 THEN   T1."PaidToDate"
                ELSE T1."PaidFC"  END )) as "Por Saldar",
                T1."DocNum" as "U_Factura",
                T1."U_NCF",
                T0."U_Val_CIF" as "CIF"
          FROM "@SCGD_VEHICULO" T0
          INNER JOIN INV1 TD1 ON T0."U_Cod_Unid" = TD1."U_SCGD_Cod_Unid"
          INNER JOIN OINV T1 ON TD1."DocEntry" = T1."DocEntry"
          INNER JOIN OCRD T6 ON T1."CardCode" = T6."CardCode"
		  INNER JOIN "@SCGD_CONF_ART_VENTA" T10 ON T10."U_ArtVent"= TD1."ItemCode"
		  INNER JOIN "OITM" T11 ON TD1."ItemCode" = T11."ItemCode"
           LEFT JOIN ( SELECT "_SCGD_GASTOS_VEH"."U_Contrato" AS "_SCGD_GASTOS_VEH_U_Contrato",
				        "_SCGD_GASTOS_VEH"."U_Unidad" AS "_SCGD_GASTOS_VEH_U_Unidad",
				         ROUND(SUM("_SCGD_GASTOS_VEH"."U_Monto"),2) AS "CO2",
				        "OCRN"."CurrCode" AS "OCRN_CurrCode"
				FROM "@SCGD_GASTOS_VEH" "_SCGD_GASTOS_VEH"
				LEFT OUTER JOIN "OCRN" "OCRN" ON ("_SCGD_GASTOS_VEH"."U_Moneda"="OCRN"."CurrCode")
				WHERE ((UPPER("_SCGD_GASTOS_VEH"."U_Des_Item") LIKE '%CO2%'))
				GROUP BY "_SCGD_GASTOS_VEH"."U_Contrato", "_SCGD_GASTOS_VEH"."U_Unidad", "OCRN"."CurrCode"
	     ) TG1 ON ( TG1."_SCGD_GASTOS_VEH_U_Contrato" = T1."U_SCGD_NoContrato" AND TG1."_SCGD_GASTOS_VEH_U_Unidad" = TD1."U_SCGD_Cod_Unid")
           LEFT JOIN ( SELECT "_SCGD_GASTOS_VEH"."U_Contrato" AS "_SCGD_GASTOS_VEH_U_Contrato",
				        "_SCGD_GASTOS_VEH"."U_Unidad" AS "_SCGD_GASTOS_VEH_U_Unidad",
				         ROUND(SUM("_SCGD_GASTOS_VEH"."U_Monto"),2) AS "Ley557",
				        "OCRN"."CurrCode" AS "OCRN_CurrCode"
				FROM "@SCGD_GASTOS_VEH" "_SCGD_GASTOS_VEH"
				LEFT OUTER JOIN "OCRN" "OCRN" ON ("_SCGD_GASTOS_VEH"."U_Moneda"="OCRN"."CurrCode")
				WHERE ((UPPER("_SCGD_GASTOS_VEH"."U_Des_Item") LIKE '%557-05%'))
				GROUP BY "_SCGD_GASTOS_VEH"."U_Contrato", "_SCGD_GASTOS_VEH"."U_Unidad", "OCRN"."CurrCode"
	     ) TG2 ON ( TG2."_SCGD_GASTOS_VEH_U_Contrato" = T1."U_SCGD_NoContrato" AND TG2."_SCGD_GASTOS_VEH_U_Unidad" = TD1."U_SCGD_Cod_Unid")
           LEFT JOIN ( SELECT "_SCGD_GASTOS_VEH"."U_Contrato" AS "_SCGD_GASTOS_VEH_U_Contrato",
				        "_SCGD_GASTOS_VEH"."U_Unidad" AS "_SCGD_GASTOS_VEH_U_Unidad",
				         ROUND(SUM("_SCGD_GASTOS_VEH"."U_Monto"),2) AS "Otros",
				        "OCRN"."CurrCode" AS "OCRN_CurrCode"
				FROM "@SCGD_GASTOS_VEH" "_SCGD_GASTOS_VEH"
				LEFT OUTER JOIN "OCRN" "OCRN" ON ("_SCGD_GASTOS_VEH"."U_Moneda"="OCRN"."CurrCode")
				WHERE NOT((UPPER("_SCGD_GASTOS_VEH"."U_Des_Item") LIKE '%557-05%') OR (UPPER("_SCGD_GASTOS_VEH"."U_Des_Item") LIKE '%CO2%'))
				GROUP BY "_SCGD_GASTOS_VEH"."U_Contrato", "_SCGD_GASTOS_VEH"."U_Unidad", "OCRN"."CurrCode"
	     ) TG3 ON ( TG3."_SCGD_GASTOS_VEH_U_Contrato" = T1."U_SCGD_NoContrato" AND TG3."_SCGD_GASTOS_VEH_U_Unidad" = TD1."U_SCGD_Cod_Unid")
         INNER JOIN "@SCGD_CVENTA" T4 ON T1."U_SCGD_NoContrato" = T4."DocEntry" AND T4."U_Reversa" = 'N'
         INNER JOIN "@SCGD_VEHIXCONT" T5 ON  T4."DocEntry" = T5."DocEntry" AND T5."U_Cod_Unid" = T0."U_Cod_Unid" AND T5."U_Reversa" = 'N'
         LEFT OUTER JOIN "@SCGD_ESPEXMODE" T16 ON T0."U_Cod_Marc" = T16."U_Cod_Marca"
                AND T0."U_Cod_Mode" = T16."U_Cod_Modelo"
                 AND T0."U_Cod_Esti" = T16."U_Cod_Estilo"
         LEFT OUTER JOIN "@SCGD_ESTILO" T7 ON T16."U_Cod_Marca"= T7."U_Cod_Marc"
 		AND T16."U_Cod_Estilo"= T7."Code"
         LEFT OUTER JOIN "@SCGD_MARCA" T8 ON T16."U_Cod_Marca"= T8."Code"
         LEFT OUTER JOIN "@SCGD_MODELO" T9 ON T16."U_Cod_Estilo"= T9."U_Cod_Esti"
 		AND T16."U_Cod_Modelo"= T9."Code"
 		LEFT JOIN (SELECT T1."U_Tipo",  T1."U_Porcentaje" FROM "@SCGD_COBROXTIPO" T1
 		            INNER JOIN "@SCGD_CONFLINEASSUM" T2 ON (T1."Code" = T2."Code" AND T1."U_Cod_Gas" = T2."U_Cod_GA" and "U_ImpPla" = '557-05' and "Canceled" = 'N'))AS T17 ON (T17."U_Tipo" = T0."U_Tipo_Ven")
       GROUP BY T1."DocDate", T0."U_SCGD_PlacaExhibicion", T0."U_SCGD_FechaExhib", T0."U_SCGD_FechaSPlaca",T0."U_NoPedFb", T0."U_Cod_Unid", T0."U_Num_VIN", T1."DocNum",
                  T0."U_SCGD_FechaSPlaca", T0."U_SCGD_FechaRecAdu", T0."U_Num_Plac", T0."U_Tipo", T0."U_Tipo_Ven", T1."CardCode", T6."LicTradNum",T1."CardName", T1."DocCur",
                          TD1."TotalFrgn", TD1."LineTotal", T1."DocRate", T1."U_NCF", T1."PaidToDate",  T1."PaidFC",T0."U_Val_CIF",   T8."Name",  T7."U_GB_NombreModelo",
                          TD1."VatSum", TD1."VatSumFrgn", TG1."OCRN_CurrCode", TG1."CO2",  TG2."Ley557",TG3."Otros", T1."DocTotalFC", T1."DocTotal",T17."U_Porcentaje",T1."U_NCF"
--        HAVING (COALESCE(SUM(T2."LineTotal"),0) + COALESCE(SUM(T3."LineTotal"),0)) > 0
)
  WHERE "Chasis" = '${item}';`;

  console.log(invoiceQuery);

  try {
    await connection.exec(`SET SCHEMA ${schema};`);
    console.log(schema);

    let [currentMatch] = connection.exec(`SELECT COUNT(*) as "qty"
    FROM "${schema}"."@GA_VEH_LIBRO_AUX_EN"
    WHERE  "U_ItemId" = '${item}'`);

    let [data] = await connection.exec(selectQuery);
    let [invoiceData] = await connection.exec(invoiceQuery);
    //console.log(data);

    if (data == undefined || invoiceData == undefined) {
      return false;
    } else {
      if (currentMatch.qty > 0) {
        await connection.exec(`UPDATE "${schema}"."@GA_VEH_LIBRO_AUX_EN"
          SET "U_DGIIValCIF"='${cifVal}',
          "U_DGIIValCO2"='${
            (data?._SCGD_EMISIONES_CO2_U_Porcen / 100) * cifVal
          } ',
          "U_DGIIValLey557"='${
            (data?._SCGD_COBROXTIPO_LEY557_U_Porcentaje / 100) * cifVal
          }',
          "U_DGIIValMarbete"='${data?._SCGD_COBROXTIPO_Marbete_U_MontoL}',
          "U_AutorizacionDGII" = '${authNumber}',
          "U_num_pago_efectuado" = '${paymentNum}',
          "U_fecha_pago_efectuado"='${getDate()}',  
          --DATOS DE LA FACTURA
          "U_IdentCode"='${
            invoiceData && invoiceData["Documento de Identidad"]
          }',
          "U_CardCode"='${invoiceData?.Cuenta}',
          "U_CardName"='${invoiceData?.Cliente}',
          "U_Factura"='${invoiceData?.U_Factura}', "U_FacturaNCF"='${
          invoiceData?.U_NCF
        }', "U_DocDateFactura"='${invoiceData?.Fecha}', "U_FacturaValCO2"='${
          invoiceData?.U_CO2
        }', "U_FacturaValEndoso"='${data?._SCGD_COBROXTIPO_Endoso_U_MontoL}',
          "U_FacturaValLey557"='${
            invoiceData?.U_Ley_557
          }', "U_FacturaValMarbete"='${
          data?._SCGD_COBROXTIPO_Marbete_U_MontoL
        }', "U_FacturaValPlacaExib"='${
          data?._SCGD_COBROXTIPO_PlacaEx_U_MontoL
        }',
          "U_FacturaValCIF"='${invoiceData?.CIF}',
          "U_DocDate"='${getDate()}'
          WHERE "U_ItemId" ='${item}'
          `);
      } else {
        let [maxId] =
          await connection.exec(`SELECT COALESCE(MAX(CAST ("Code" AS INTEGER)),0) AS "MAX_Code"
                                            FROM "${schema}"."@GA_VEH_LIBRO_AUX_EN"`);
        // schema = data.companyDB;

        //var result =
        //console.log(selectQuery);

        let insertQuery = `INSERT INTO ${schema}."@GA_VEH_LIBRO_AUX_EN"(\"Code\", \"Name\", \"U_DocStatusImp\", \"U_ItemCode\", \"U_ItemGroup\",\"U_ItemType\", \"U_ItemId\",
                                            \"U_ItemMarc\", \"U_ItemModel\", \"U_ItemYear\", \"U_ItemColor\", \"U_DGIIValCIF\", \"U_DGIIValCO2\",
                                            \"U_DGIIValLey557\", \"U_DGIIValMarbete\", \"U_AutorizacionDGII\",\"U_num_pago_efectuado\", \"U_fecha_pago_efectuado\", \"U_ItemValCIF\", \"U_ItemValCO2\",
                                            \"U_ItemValEndoso\", \"U_ItemValLey557\", \"U_ItemValMarbete\", \"U_ItemValPlacaExib\",\"U_DocDate\" )
                                            VALUES (\'${
                                              parseInt(maxId.MAX_Code) + 1
                                            }\', \'${
          data?._SCGD_VEHICULO_U_Cod_Unid
        }\', \'P\', \'${data?._SCGD_VEHICULO_U_Cod_Unid}\',
                                            \'${
                                              data?._SCGD_CATEGORIA_VEHI_Name
                                            }\',  \'${
          data?._SCGD_TIPOVEHICULO_Name
        }\', \'${data?._SCGD_VEHICULO_U_Num_VIN}\', \'${
          data?._SCGD_MARCA_Name
        }\', \'${data?._SCGD_ESTILO_U_GB_Modelo}\', \'${
          data?._SCGD_VEHICULO_U_Ano_Vehi
        }\', \'${data?._SCGD_COLOR_U_Descripcion}\', \'${cifVal}\', \'${
          (data?._SCGD_EMISIONES_CO2_U_Porcen / 100) * cifVal
        }\', \'${
          (parseFloat(data?._SCGD_COBROXTIPO_LEY557_U_Porcentaje) / 100) *
          cifVal
        }\', \'${
          data?._SCGD_COBROXTIPO_Marbete_U_MontoL
        }\', \'${authNumber}\', \'${paymentNum}\', \'${getDate()}\',
        \'${data?._SCGD_VEHICULO_U_Val_CIF}\', \'${
          parseFloat(data?._SCGD_EMISIONES_CO2_U_Porcen / 100) *
          data?._SCGD_VEHICULO_U_Val_CIF
        }\', \'${data?._SCGD_COBROXTIPO_Endoso_U_MontoL}\', \'${
          (parseFloat(data?._SCGD_COBROXTIPO_LEY557_U_Porcentaje) / 100) *
          data?._SCGD_VEHICULO_U_Val_CIF
        }\', \'${data?._SCGD_COBROXTIPO_Marbete_U_MontoL}\', \'${
          data?._SCGD_COBROXTIPO_PlacaEx_U_MontoL
        }\', \'${getDate()}\')`;

        await connection.exec(insertQuery);
        console.log(
          `RESULTADO DE CONSULTA EN ${schema} ITEM ${item}`,
          maxId,
          insertQuery
        );
      }
      return true;
    }

    //return result;
  } catch (error) {
    console.log(error);
  }
}

function getDate() {
  //Date
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  //Time
  const hour = new Date().getHours();
  var minute = new Date().getMinutes();
  minute < 10 ? (minute = "" + minute) : (minute = minute);
  var dayTime = hour >= 12 ? "PM" : "AM";

  const fullDate = `${year}${
    month.toString().length == 1 ? `${"0" + month}` : month
  }${date.toString().length == 1 ? `${"0" + date}` : date}`;
  console.log("@@@@@@@@@@@" + fullDate.toString());
  return fullDate.toString();
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
