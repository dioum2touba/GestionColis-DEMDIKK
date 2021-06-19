import { FormEvent, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { ApplicationSettings } from "../../configuration/application-settings";
import { TypeLivraison } from './models/TypeLivraisons';

const EditTypeColis = (props: any) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [Libelle, setLibelle] = useState("");
  const [Description, setDescription] = useState("");

  function handleSubmitEdit(event: FormEvent<HTMLFormElement>) {
    const request: TypeLivraison = {
      libelle: Libelle,
      description: Description
    };

    console.log(request);

    fetch(`${ApplicationSettings.API_URL}TypeLivraisons/${Number(props.id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
  }

  useEffect(() => {
    console.log("Edit Type de colis");
  }, []);

  const handleShowEdit = () => {
    fetch(`${ApplicationSettings.API_URL}TypeLivraisons/${props.id}`)
      .then((res) => res.json())
      .then((typeLivraison) => {
        // this.setState({ loading: true, repos: agence });
        console.log("Editer un type de livraison");
        /*  console.log(agence);
             console.log(agence.regionId); */
        setLibelle(typeLivraison.libelle);
        setDescription(typeLivraison.description);
      });

    setShow(true);
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShowEdit}
        className="btn btn-warning btn-sm"
      >
        <i className="fas fa-edit"></i>
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modification d'un type de colis</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmitEdit}>
          <Modal.Body>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={Libelle}
                onChange={(event) => setLibelle(event.target.value)}
                placeholder="Libellé du type de colis"
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
            <Button
              variant="secondary"
              className="btn-sm"
              onClick={handleClose}
            >
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

export default EditTypeColis;
