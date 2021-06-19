import { useState, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap'
import { ApplicationSettings } from "../../configuration/application-settings";
import { PrixVoyageRegion } from './models/PrixVoyageRegion';


const AddPrixVoyageRegion = () => {
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [RegionDepartId, setRegionDepartId] = useState<number>();
    const [RegionArriveeId, setRegionArriveeId] = useState<number>();
    const [Prix, setPrix] = useState<number>();

    const [regions, setRegions] = useState({loading: false, repos: []});
    
    function handleSubmit(event: any/*FormEvent<HTMLFormElement>*/) {
        const request: PrixVoyageRegion = {
          regionDepartId: Number(RegionDepartId),
          regionArriveeId: Number(RegionArriveeId),
          prix: Number(Prix)
        }

        console.log(request);
        
        fetch(`${ApplicationSettings.API_URL}PrixVoyageRegions`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(request)
        }).then((res) => res.json())
        .then((repos) => { 
          document.location.reload();
         });
    }

    useEffect(() => {
      fetch(`${ApplicationSettings.API_URL}regions`).then((res) => res.json())
        .then((repos) => { setRegions({ loading: true, repos: repos }) });
    }, []);

    return (
      <>
        <Button variant="primary" onClick={handleShow} className="btn btn-success">
          <i className="fas fa-plus"></i>
        </Button>

        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton> <Modal.Title>Création d'un prix entre régions</Modal.Title> </Modal.Header> 
          <Modal.Body>          
            {/* <form onSubmit={handleSubmit}> */}
                <div className="input-group mb-3">
                  <select id="RegionDepartId" className="form-control" onChange={(event: any) => setRegionDepartId(Number(event.target.value))}>
                    <option>Sélectionner une région</option>
                    {
                      regions.repos.map((elt: any) => {
                        return (
                          <option key={elt.id} value={elt.id}>{elt.label}</option>
                        );
                      })
                    }
                  </select>
                  {/* <input type="text" className="form-control" onChange={event => setPays(event.target.value)} placeholder="Region" /> */}
                </div>
                <div className="input-group mb-3">
                  <select id="RegionArriveeId" className="form-control" onChange={(event: any) => setRegionArriveeId(Number(event.target.value))}>
                    <option>Sélectionner une région</option>
                    {
                      regions.repos.map((elt: any) => {
                        return (
                          <option key={elt.id} value={elt.id}>{elt.label}</option>
                        );
                      })
                    }
                  </select>
                  {/* <input type="text" className="form-control" onChange={event => setPays(event.target.value)} placeholder="Region" /> */}
                </div>
                <div className="input-group mb-3">
                  <input type="number" step="0.01" className="form-control" /*value={Longitude}*/ onChange={(event:any) => setPrix(Number(event.target.value))} placeholder="Saisissez le prix" />
                </div>
            {/* </form> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary" onClick={(event: any) => handleSubmit(event)}>Enregistrer</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
};

export default AddPrixVoyageRegion;
