// import { addQueryParams } from "../utils/stringFunctions";
// const { mainServer } = require("../utils/constants/conections");

// async function createTransactionLogApi(params) {
//   try {
//     let data = {
//       name: "App Log",
//       username: params.username,
//       comment: params.comment,
//       objectName: "GA_TRANSACTION_LOGS",
//       appName: "GA_PRICELIST",
//       status: params.status,
//       cookie: params.cookie,
//       target: "U_GA_TRANSACTION_LOGS",
//     };

//     const res = await fetch(`${mainServer}/log`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     return res;
//   } catch (error) {
//     throw error;
//   }
// }

// async function getTransactionLogsApi(params) {
//   let queryParams = {
//     target: "U_GA_TRANSACTION_LOGS",
//     cookie: params.cookie,
//   };

//   try {
//     let url = `${mainServer}/log`;
//     url = addQueryParams(url, queryParams);
//     const res = await fetch(url);
//     const result = await res.json();

//     if (result.error) throw new Error(result.body);

//     return result;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// export { getTransactionLogsApi, createTransactionLogApi };
