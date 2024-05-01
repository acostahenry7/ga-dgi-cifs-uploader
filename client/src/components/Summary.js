import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Summary({ handleClose, handleShow, show, data }) {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Resumen </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Unidades Actualizadas:{" "}
            <span style={{ fontWeight: "bold" }}>{data?.updated?.length}</span>
          </div>
          <div>
            Unidades no Encontradas:{" "}
            <span style={{ fontWeight: "bold" }}>{data?.notFound?.length}</span>{" "}
          </div>
          <div>
            Errores (por unidad): <span>{data?.error?.message}</span>{" "}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Entendido!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
