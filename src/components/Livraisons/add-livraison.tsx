import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { ApplicationSettings } from "../../configuration/application-settings";
import { Livraison } from "./models/Livraison";

const AddLivraison = (props: any) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [Libelle, setLibelle] = useState("");
  const [ColisId, setColisId] = useState(0);
  const [MoyenTransportId, setMoyenTransportId] = useState(0);
  const [TypeLivraisonId, setTypeLivraisonId] = useState(0);
  const [LivreurId, setLivreurId] = useState(0);

  // const [colis, setColis] = useState({ loading: false, repos: [] });
  const [moyenTransport, setMoyenTransport] = useState({ loading: false, repos: []});
  const [typeLivraison, setTypeLivraison] = useState({ loading: false,  repos: []});
  const [livreur, setLivreur] = useState({ loading: false, repos: [] });

  function handleSubmit(event: any/*FormEvent<HTMLFormElement>*/) {
    setColisId(props.id);

    const request: Livraison = {
      libelle: Libelle,
      colisId: props.id,
      moyenTransportId: MoyenTransportId,
      typeLivraisonId: TypeLivraisonId,
      livreurId: LivreurId,
    };

    console.log(request);

    fetch(`${ApplicationSettings.API_URL}Livraisons`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    })
      .then((res) => res.json())
      .then((repos) => {
        console.log("After posted Livraisons object")
        console.log(repos)
        // window.location.reload();
      });
  }

  
  useEffect(() => {
    console.log("Add livraison");
    console.log(props.id);
  }, [props.id]);

  const handleShow = () => {
    console.log("Add livraison");
    console.log(props.id);

    if (typeLivraison.repos.length === 0) {
      fetch(`${ApplicationSettings.API_URL}typeLivraisons`)
        .then((res) => res.json())
        .then((repos) => {
          setTypeLivraison({ loading: true, repos: repos });
        });
    }

    if (moyenTransport.repos.length === 0) {
      fetch(`${ApplicationSettings.API_URL}moyenTransports`)
        .then((res) => res.json())
        .then((repos) => {
          setMoyenTransport({ loading: true, repos: repos });
        });
    }

    if (livreur.repos.length === 0) {
      fetch(`${ApplicationSettings.API_URL}users`)
        .then((res) => res.json())
        .then((repos) => {
          setLivreur({ loading: true, repos: repos });
        });
    }

    setShow(true);
  };

  return (
    <>
      <Button
        variant="success"
        onClick={handleShow}
        className="btn btn-success"
      >
        <i className="fas fa-plus"></i>
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Création d'un type de livraison</Modal.Title>
        </Modal.Header>
        {/* <form onSubmit={handleSubmit}> */}
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
              <label htmlFor="Libelle"></label>
              <select
                id="MoyenTransportId"
                className="form-control"
                onChange={(event: any) =>
                  setMoyenTransportId(event.target.value)
                }
              >
                <option>Sélectionner un moyens de transport</option>
                {moyenTransport.repos.map((elt: any) => {
                  return (
                    <option key={elt.id} value={elt.id}>
                      {elt.libelle}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="input-group mb-3">
              <label htmlFor="Libelle"></label>
              <select
                id="TypeLivraisonId"
                className="form-control"
                onChange={(event: any) =>
                  setTypeLivraisonId(event.target.value)
                }
              >
                <option>Sélectionner un type de livraison</option>
                {typeLivraison.repos.map((elt: any) => {
                  return (
                    <option key={elt.id} value={elt.id}>
                      {elt.libelle}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="input-group mb-3">
              <label htmlFor="Libelle"></label>
              <select
                id="LivreurId"
                className="form-control"
                onChange={(event: any) => setLivreurId(event.target.value)}
              >
                <option>Sélectionner un livreur</option>
                {livreur.repos.map((elt: any) => {
                  return (
                    <option key={elt.id} value={elt.id}>
                      {elt.displayName}
                    </option>
                  );
                })}
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button variant="success" type="submit" onClick={(event) => handleSubmit(event)}>
              Enregistrer
            </Button>
          </Modal.Footer>
        {/* </form> */}
      </Modal>
    </>
  );
};

export default AddLivraison;
