import { FormEvent, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { ApplicationSettings } from "../../configuration/application-settings";

interface RegisterNewTypeColisRequest {
  libelle: string;
  categorie: string;
  poid: number;
  prix: number;
}

const AddTypeColis = () => {
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [Libelle, setLibelle] = useState("");
  const [Categorie, setCategorie] = useState("");
  const [Poid, setPoid] = useState<number>();
  const [Prix, setPrix] = useState<number>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const request: RegisterNewTypeColisRequest = {
      libelle: Libelle,
      categorie: Categorie,
      poid: Number(Poid),
      prix: Number(Prix),
    };

    console.log(request);

    fetch(`${ApplicationSettings.API_URL}TypeDeColis`, {
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
          <Modal.Title>Création d'un type de colis</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
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
                value={Categorie}
                onChange={(event) => setCategorie(event.target.value)}
                placeholder="Catégorie du type de colis"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={Prix}
                onChange={(event) => setPrix(Number(event.target.value))}
                placeholder="Prix du type de colis"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={Poid}
                onChange={(event) => setPoid(Number(event.target.value))}
                placeholder="Poid du type de colis"
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

export default AddTypeColis;
