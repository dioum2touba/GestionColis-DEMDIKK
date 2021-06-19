import { FormEvent, useState, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap'
import { ApplicationSettings } from "../../configuration/application-settings";

interface RegisterNewUserRequest {
  label: string,
  adresse: string,
  telephone: number,
  pays: string,
  longitude: number,
  latitude: number,
}

const AddRegion = () => {
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [Label, setLabel] = useState('');
    const [Pays, setPays] = useState('');
    const [Adresse, setAdresse] = useState('');
    const [Latitude, setLatitude] = useState(0);
    const [Longitude, setLongitude] = useState(0);
    const [Telephone, setTelephone] = useState(0);
    const [ListPays, setListPays] = useState({pays: []});
    
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        const request: RegisterNewUserRequest = {
          label: Label,
          adresse: Adresse,
          telephone: Telephone,
          pays: Pays,
          longitude: Longitude,
          latitude: Latitude,
        }

        console.log(request);
        
        fetch(`${ApplicationSettings.API_URL}Regions`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(request)
        }).then((res) => res.json())
        .then((repos) => { 
          document.location.reload();
         });

        document.location.href = '/';
    }

    useEffect(() => {
      fetch(`https://restcountries.eu/rest/v2/all`).then((res) => res.json())
        .then((repos) => { setListPays({pays: repos}) });
    }, []);

    return (
      <>
        <Button variant="primary" onClick={handleShow} className="btn btn-success">
          <i className="fas fa-plus"></i>
        </Button>

        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton> <Modal.Title>Création Region</Modal.Title> </Modal.Header> 
          <Modal.Body>          
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" value={Label} onChange={event => setLabel(event.target.value)} placeholder="Nom région" />
                </div>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" value={Adresse} onChange={event => setAdresse(event.target.value)} placeholder="Adresse" />
                </div>
                <div className="input-group mb-3">
                  <select id="paysId" className="form-control"  onChange={event => setPays(event.target.value)}>
                    <option>Sélectionner un pays</option>
                    {
                      ListPays.pays.map((elt: any, idx) => {
                        return (
                          <option key={idx} value={elt.name}>{elt.name}</option>
                        );
                      })
                    }
                  </select>
                </div>
                <div className="input-group mb-3">
                  <input type="number" step="0.01" className="form-control" /*value={Longitude}*/ onChange={(event:any) => setLongitude(event.target.value)} placeholder="Longitude" />
                </div>
                <div className="input-group mb-3">
                  <input type="number" step="0.01" className="form-control" /*value={Latitude}*/ onChange={(event:any) => setLatitude(event.target.value)} placeholder="Latitude" />
                </div>
                <div className="input-group mb-3">
                  <input type="number" className="form-control" /*value={Telephone}*/ onChange={(event:any) => setTelephone(event.target.value)} placeholder="Téléphone" />
                </div>
                <div className="input-group mb-3">
                  <input type="submit" value="Enregistrer" />
                </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
};

export default AddRegion;
