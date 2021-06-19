import { FormEvent, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ApplicationSettings } from "../../configuration/application-settings";
import { Client } from "./models/Client";

const AddClient = (props: any) => {
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
  
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState<number>();
    const [Adresse, setAdresse] = useState("");
    const [CIN, setCIN] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const request: Client = {
      cin: CIN,
      telephone: Number(PhoneNumber),
      adresse: Adresse,
      lastName: LastName,
      firstName: FirstName
    };

    console.log(request);

    fetch(`${ApplicationSettings.API_URL}Clients`, {
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
    <Button variant="primary" onClick={handleShow} className="btn btn-success">
      <i className="fas fa-plus"></i>
    </Button>

    <Modal show={show} onHide={handleClose} animation={false}>
        <form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
            <Modal.Title>Création d'un client</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="input-group mb-3">
                <input
                type="text"
                className="form-control"
                value={FirstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="Prénom"
                />
            </div>
            <div className="input-group mb-3">
                <input
                type="text"
                className="form-control"
                value={LastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Nom"
                />
            </div>
            <div className="input-group mb-3">
                <input
                type="text"
                value={PhoneNumber}
                className="form-control"
                onChange={(event) => setPhoneNumber(Number(event.target.value))}
                placeholder="77 777 77 77"
                />
            </div>
            <div className="input-group mb-3">
                <input
                type="text"
                className="form-control"
                value={Adresse}
                onChange={(event) => setAdresse(event.target.value)}
                placeholder="Sipres 1, Dakar"
                />
            </div>
            <div className="input-group mb-3">
                <input
                type="text"
                className="form-control"
                value={CIN}
                onChange={(event) => setCIN(event.target.value)}
                placeholder="xxx xxxx xxxx xxx"
                />
            </div>            
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="success" onClick={(event: any) => handleSubmit(event)}>
                Enregistrer
            </Button>
            </Modal.Footer>
        </form>
        </Modal>
    </>
  );
};

export default AddClient;
