import { FormEvent, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { ApplicationSettings } from "../../configuration/application-settings";
import { TypeLivraison } from './models/TypeLivraisons';

const AddTypeLivraison = () => {
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [Libelle, setLibelle] = useState("");
  const [Description, setDescription] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const request: TypeLivraison = {
      libelle: Libelle,
      description: Description
    };

    console.log(request);

    fetch(`${ApplicationSettings.API_URL}TypeLivraisons`, {
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
    console.log("Type de colis");
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
          <Modal.Title>Création d'un type de livraison</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={Libelle}
                onChange={(event) => setLibelle(event.target.value)}
                placeholder="Libellé"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={Description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Description"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="btn-sm" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" className="btn-sm">
              Enregistrer
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default AddTypeLivraison;
