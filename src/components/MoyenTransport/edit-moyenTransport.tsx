import { FormEvent, useState } from "react";
import { Button, Modal } from 'react-bootstrap'
import { ApplicationSettings } from "../../configuration/application-settings";
import { MoyenTransport } from "./models/MoyenTransport";


const EditAgence = (props: any) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    let voitures: Array<string> = ['Bus', 'Moto', '4x4'];


    const [Libelle, setLibelle] = useState("");
    const [Type, setType] = useState("");
    const [Matricule, setMatricule] = useState("");
    const [Description, setDescription] = useState("");
    
    function handleSubmitEdit(event: FormEvent<HTMLFormElement>) {
        const request: MoyenTransport = {
          libelle: Libelle,
          type: Type,
          matricule: Matricule,
          description: Description,
        };

        console.log(request);
        
        fetch(`${ApplicationSettings.API_URL}MoyenTransports/${Number(props.id)}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(request)
        });
    }
    
    const handleShowEdit = () => {

        fetch(`${ApplicationSettings.API_URL}MoyenTransports/${props.id}`).then((res) => res.json())
          .then((moyenTransports) => {
            // this.setState({ loading: true, repos: agence });
              console.log("Editer un moyenTransports");
             console.log(moyenTransports);
             /* console.log(agence.regionId); */
              setLibelle(moyenTransports.libelle);
              setType(moyenTransports.type);
              setMatricule(moyenTransports.matricule);
              setDescription(moyenTransports.description);
          });

        setShow(true);
    }

    return (
      <>
        <Button variant="primary" onClick={handleShowEdit} className="btn btn-warning btn-sm">
            <i className="fas fa-edit"></i>
        </Button>

        <Modal show={show} onHide={handleClose} animation={false}>
        <form onSubmit={handleSubmitEdit}>
          <Modal.Header closeButton>
            {" "}
            <Modal.Title>Modification d'un moyen de transport</Modal.Title>{" "}
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
                    if(Type === elt) {                      
                     return <option key={edx} selected value={elt}>{elt}</option>
                    }else {  
                      return <option key={edx} value={elt}>{elt}</option>
                    }
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
            <Button variant="primary" onClick={handleClose}>
              Enregistrer
            </Button>
          </Modal.Footer>
        </form>
        </Modal>
      </>
    );
};

export default EditAgence;
