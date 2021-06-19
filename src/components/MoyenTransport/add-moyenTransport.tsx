import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ApplicationSettings } from "../../configuration/application-settings";
import { MoyenTransport } from "./models/MoyenTransport";

const AddAgence = () => {
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  let voitures: Array<string> = ['Bus', 'Moto', '4x4'];

  const [Libelle, setLibelle] = useState("");
  const [Type, setType] = useState("");
  const [Matricule, setMatricule] = useState("");
  const [Description, setDescription] = useState("");

  function handleSubmit(event:any /*FormEvent<HTMLFormElement>*/) {
    const request: MoyenTransport = {
      libelle: Libelle,
      type: Type,
      matricule: Matricule,
      description: Description,
    };

    console.log(request);

    fetch(`${ApplicationSettings.API_URL}MoyenTransports`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    })
      .then((res) => res.json())
      .then((repos) => {
        document.location.reload();
      });
  }

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
        {/* <form onSubmit={handleSubmit}> */}
          <Modal.Header closeButton>
            {" "}
            <Modal.Title>Création d'un moyen de transport</Modal.Title>{" "}
          </Modal.Header>
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
              <select
                id="Type"
                className="form-control"
                onChange={(event) => setType(event.target.value)}
              >
                <option>Sélectionner un type de voiture</option>
                {
                  voitures.map((elt, edx) => {
                    return <option key={edx} value={elt}>{elt}</option>
                  })
                }
              </select>
            </div>

            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={Matricule}
                onChange={(event) => setMatricule(event.target.value)}
                placeholder="Matricule"
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
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={(event) => handleSubmit(event)}>
              Enregistrer
            </Button>
          </Modal.Footer>
        {/* </form> */}
      </Modal>
    </>
  );
};

export default AddAgence;
