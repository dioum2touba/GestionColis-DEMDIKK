import { FormEvent, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { ApplicationSettings } from "../../configuration/application-settings";

interface RegisterNewTypeColisRequest {
  libelle: string;
  categorie: string;
  prix: number;
  poid: number;
  id: number;
}

const EditTypeColis = (props: any) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [Libelle, setLibelle] = useState("");
  const [Categorie, setCategorie] = useState("");
  const [Prix, setPrix] = useState(0);
  const [Poid, setPoid] = useState<number>();
  const [Id, setId] = useState(0);

  function handleSubmitEdit(event: FormEvent<HTMLFormElement>) {
    const request: RegisterNewTypeColisRequest = {
      libelle: Libelle,
      categorie: Categorie,
      prix: Prix,
      poid: Number(Poid),
      id: Id,
    };

    console.log(request);

    fetch(`${ApplicationSettings.API_URL}TypeDeColis/${Number(props.id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    }).then((res) => {
      res.json()
      window.location.reload();
    })
      .then((repos) => {
        console.log("After posted type de colis object")
        console.log(repos)
        window.location.reload();
      });
  }

  useEffect(() => {
    console.log("Edit Type de colis");
  }, []);

  const handleShowEdit = () => {
    fetch(`${ApplicationSettings.API_URL}TypeDeColis/${props.id}`)
      .then((res) => res.json())
      .then((typeColis) => {
        // this.setState({ loading: true, repos: agence });
        console.log("Editer un type de colis");
        /*  console.log(agence);
             console.log(agence.regionId); */
        setId(typeColis.id);
        setLibelle(typeColis.libelle);
        setCategorie(typeColis.categorie);
        setPoid(typeColis.poid);
        setPrix(typeColis.prix);
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
        {/* <form onSubmit={handleSubmitEdit}> */}
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
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="success" type="submit" onClick={(event: any) => handleSubmitEdit(event)}>
              Enregistrer
            </Button>
          </Modal.Footer>
        {/* </form> */}
      </Modal>
    </>
  );
};

export default EditTypeColis;
