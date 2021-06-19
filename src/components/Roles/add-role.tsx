import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { ApplicationSettings } from "../../configuration/application-settings";
import { Role } from './models/Role';


const AddRole = () => {
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [Libelle, setLibelle] = useState("");

  function handleSubmit(event: any/*FormEvent<HTMLFormElement>*/) {
    const request: Role = {
      name: Libelle
    };

    console.log(request);

    fetch(`${ApplicationSettings.API_URL}roles`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    })
      .then((res) => res.json())
      .then((repos) => {
        document.location.reload();
      });
  }

  useEffect(() => {
    console.log("Roles");
  }, []);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="btn btn-success"
      >
        <i className="fas fa-plus"></i>
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Création d'un rôle</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={Libelle}
                onChange={(event) => setLibelle(event.target.value)}
                placeholder="Libellé du rôle"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="btn-sm" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" className="btn-sm" onClick={(event) => handleSubmit(event)}>
              Enregistrer
            </Button>
          </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddRole;
