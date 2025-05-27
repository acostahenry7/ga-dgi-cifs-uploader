import React, { useState, useEffect } from "react";
import "./uploader.css";
import { upload, sync } from "../../api/uploaders";
import DataTable from "react-data-table-component";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Summary from "../Summary";
import ErrorFB from "../validations/ErrorFB";
import $ from "jquery";
import { createTransactionLogApi } from "../../api/logs.js";
import useAuth from "../../hooks/useAuth.js";

export default function Uploader() {
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState(undefined);
  const [authNumber, setAuthNumber] = useState("");
  const [paymentNum, setPaymentNum] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [authNumError, setAuthNumError] = useState("");
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [inputKey, setInputKey] = useState(1);
  const [summaryData, setSummaryData] = useState({});
  const uploadHandler = async (event) => {
    setFileSelected(event.target.files);
    //console.log ("event", event.target.files);

    let response = await upload(event.target.files[0]);

    setData(response.body);
  };

  const [show, setShow] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleErrorClose = () => setErrorShow(false);
  const handleErrorShow = () => setErrorShow(true);

  const navigate = useNavigate();
  const syncHandler = async () => {
    setIsLoading(true);
    let response = await sync(
      fileSelected,
      authNumber,
      paymentNum,
      paymentDate
    );
    setIsLoading(false);

    setSummaryData(response.body);
    // await createTransactionLogApi({
    //   username: auth.userData.userName,
    //   comment: `Las unidades con el No. de autorizacion ${authNumber} fuero actualizadas`,
    //   status: 'ALLOWED',
    //   cookie: auth.Cookie
    // })
    return response;
  };

  useEffect(() => {
    (async () => {
      //console.log (data);
      setTableData(data);
    })();
  }, [data]);

  const columns = [
    {
      name: "Chasis",
      selector: (row) => row.vin,
      sortable: true,
    },
    {
      name: "Marca",
      selector: (row) => row.brand,
      sortable: true,
    },
    {
      name: "Modelo",
      selector: (row) => row.model,
      sortable: true,
    },
    {
      name: "Año",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Valor Cifs",
      selector: (row) => row.cif,
      sortable: true,
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontSize: "14px",
        backgroundColor: "#808080",
        color: "white",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        fontWeight: "500",
      },
    },
  };

  return (
    <div>
      <Summary
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
        data={summaryData}
      />
      <ErrorFB
        handleClose={handleErrorClose}
        handleShow={handleErrorShow}
        show={errorShow}
        msg={errorMessage}
      />
      <div className="row">
        <div className="col-md-2">
          <label
            htmlFor="file-upload"
            className="uploader"
            title="Cargar archivo"
          >
            <i className="fa-solid fa-upload"></i>
          </label>
          <input
            key={inputKey}
            id="file-upload"
            type="file"
            onChange={uploadHandler}
            hidden
          />
        </div>
        <div
          className="col-md-2 shadow-sm"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            //border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: 8,
            backgroundColor: "#eaeaea",
          }}
        >
          <label>Numero de autorización</label>
          <input
            style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
            className="form-control mt-2"
            type="search"
            value={authNumber}
            onChange={(e) => {
              setAuthNumber(e.target.value);
            }}
          />
          <span style={{ color: "red", fontSize: 10 }}>{authNumError}</span>
        </div>
        <div
          className="col-md-2 shadow-sm"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            //border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: 8,
            backgroundColor: "#eaeaea",
          }}
        >
          <label>Fecha pago efectuado</label>
          <input
            style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
            className="form-control mt-2"
            type="date"
            value={paymentDate}
            onChange={(e) => {
              setPaymentDate(e.target.value.replaceAll("-", ""));
            }}
          />
          <span style={{ color: "red", fontSize: 10 }}>{authNumError}</span>
        </div>
        <div
          className="col-md-2 shadow-sm"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            //border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: 8,
            backgroundColor: "#eaeaea",
          }}
        >
          <label>Número pago efectuado</label>
          <input
            style={{
              backgroundColor: "rgba(255,255,255,0.4)",
            }}
            className="form-control mt-2"
            type="search"
            value={paymentNum}
            onChange={(e) => {
              setPaymentNum(e.target.value);
            }}
          />
          {/* <span style={{ color: "red", fontSize: 10 }}>{authNumError}</span> */}
        </div>
        <div className="col-md-4">
          <div
            className="summary shadow-sm"
            style={{
              backgroundColor: "#eaeaea",
              //border: "1px dashed rgba(0,0,0, 0.5)",

              borderRadius: 10,
              height: "100%",
            }}
          >
            <div
              style={{ fontSize: "15px", fontWeight: "bold", width: "100%" }}
            >
              <div
                style={{
                  color: "black",
                  padding: "5px 15px",
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                }}
              >
                Resumen
              </div>
              <div
                style={{
                  /*backgroundColor: "#fff",*/
                  marginTop: 10,
                  minHeight: "80%",
                  borderRadius: 10,
                  padding: "10px 20px",
                }}
              >
                <div
                  className="summary-sections"
                  style={{
                    fontSize: "13px",
                  }}
                >
                  <div>
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <p>
                            Archivo:{" "}
                            <b>{fileSelected && fileSelected[0]?.name}</b>{" "}
                          </p>
                          <p className="mb-3">
                            Unidades Listadas: <b>{tableData?.length}</b>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div style={{ flexDirection: "row" }}>
                          <button
                            style={{
                              width: "100%",
                              marginLeft: "auto",
                              cursor: "pointer",
                              backgroundColor: "#4aace1",
                              color: "white",
                              padding: 8,
                              borderRadius: 4,
                              fontWeight: "500",
                              marginBottom: 10,
                              border: "none",
                            }}
                            onClick={async () => {
                              if (fileSelected == undefined) {
                                setErrorMessage(
                                  "No existen unidades pendientes de actualización. Para actualizar unidades debe cargar el archivo csv."
                                );
                                handleErrorShow();
                              } else {
                                if (authNumber) {
                                  let res = await syncHandler();

                                  console.log(res.status);
                                  if (res?.error == true) {
                                    switch (res?.status) {
                                      case 301:
                                        navigate("/");
                                        break;
                                      case 500:
                                        alert(res?.body);
                                        break;
                                      default:
                                        break;
                                    }
                                  } else {
                                    handleShow();
                                  }
                                  setData([]);
                                  setFileSelected(undefined);
                                  setInputKey(inputKey + 1);
                                  setAuthNumError("");
                                } else {
                                  setAuthNumError(
                                    "Se necesita un número de autorización"
                                  );
                                }
                              }
                            }}
                          >
                            {" "}
                            <i className="fa-solid fa-rotate"></i>
                            &nbsp;Cargar Unidades
                          </button>
                          <button
                            style={{
                              width: "100%",
                              //marginLeft: 5,
                              cursor: "pointer",
                              backgroundColor: "#dc3545",
                              color: "white",
                              padding: 8,
                              borderRadius: 4,
                              fontWeight: "500",
                              marginBottom: 10,
                              border: "none",
                            }}
                            onClick={async () => {
                              if (fileSelected == undefined) {
                                setErrorMessage(
                                  "No se ha cargado ningún archivo."
                                );
                                handleErrorShow();
                              } else {
                                setData([]);
                                setFileSelected(undefined);
                                setInputKey(inputKey + 1);
                              }
                            }}
                          >
                            {" "}
                            <i className="fa-solid fa-trash"></i>
                            &nbsp;Descartar archivo
                          </button>
                          <div style={{ marginTop: 10 }}>
                            <Oval
                              height={30}
                              width={30}
                              color="#4cb2f1"
                              wrapperStyle={{}}
                              wrapperClass=""
                              visible={isLoading}
                              ariaLabel="oval-loading"
                              secondaryColor="#c2d1e1"
                              strokeWidth={2}
                              strokeWidthSecondary={2}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 rounded" style={{}}>
        <DataTable
          className="rounded shadow-sm"
          columns={columns}
          data={tableData}
          pagination
          customStyles={customStyles}
        />
      </div>
    </div>
  );
}
