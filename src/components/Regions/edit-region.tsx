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

const EditRegion = (props: any) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [Label, setLabel] = useState('');
    const [Pays, setPays] = useState('');
    const [Adresse, setAdresse] = useState('');
    const [Latitude, setLatitude] = useState(0.0);
    const [Longitude, setLongitude] = useState(0.0);
    const [Telephone, setTelephone] = useState(0.0);
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
        
        fetch(`${ApplicationSettings.API_URL}Regions/${props.id}`, {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(request)
        });

        document.location.href = '/';
    }

    useEffect(() => {
      fetch(`https://restcountries.eu/rest/v2/all`).then((res) => res.json())
        .then((repos) => { setListPays({pays: repos}) });
    }, []);
    
    const handleShowEdit = () => {

        fetch(`${ApplicationSettings.API_URL}regions/${props.id}`).then((res) => res.json())
          .then((region) => {
              // this.setState({ loading: true, repos: agence });
            console.log("Editer une région");
            setLabel(region.label);
            setPays(region.pays);
            setAdresse(region.adresse);
            setLatitude(+region.latitude);
            setLongitude(Number(region.longitude));
            setTelephone(Number(region.telephone));
          });

        setShow(true);
    }

    return (
      <>
        
        <Button variant="primary" onClick={handleShowEdit} className="btn btn-warning btn-sm">
            <i className="fas fa-edit"></i>
        </Button>

        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton> <Modal.Title>Modification d'une Region</Modal.Title> </Modal.Header> 
          <Modal.Body>          
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" value={Label} onChange={event => setLabel(event.target.value)} placeholder="Nom région" />
                </div>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" value={Adresse} onChange={event => setAdresse(event.target.value)} placeholder="Adresse" />
                </div>
                <div className="input-group mb-3">
                  <select id="paysId" className="form-control" onChange={event => setPays(event.target.value)}>
                    {
                      ListPays.pays.map((elt: any, idx) => {
                            if(Pays === elt.name) {
                                return  <option key={idx} selected value={elt.name}>{elt.name}</option>; 
                            }                           
                            else {        
                              return  <option key={idx} value={elt.name}>{elt.name}</option>; 
                            }                            
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

export default EditRegion;
