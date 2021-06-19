import { FormEvent, useState, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap'
import { ApplicationSettings } from "../../configuration/application-settings";

interface RegisterNewUserRequest {
  nomAgence: string,
  adresse: string,
  codeAgence: string,
  regionId: number,
  pays: string,
  longitude: number,
  latitude: number,
  telephone: number,
  heureDemarrage: string,
  heureFermeture: string
}

const EditAgence = (props: any) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [Nom, setNom] = useState('');
    const [Pays, setPays] = useState('');
    const [Adresse, setAdresse] = useState('');
    const [RegionId, setRegionId] = useState(0);
    const [Latitude, setLatitude] = useState(0);
    const [Longitude, setLongitude] = useState(0);
    const [Telephone, setTelephone] = useState(0);
    const [CodeAgence, setCodeAgence] = useState('');
    const [ListPays, setListPays] = useState({pays: []});
    const [regions, setRegions] = useState({loading: false, repos: []});
    const [HeureDemarrage, setHeureDemarrage] = useState("2021-01-01T00:00:00");
    const [HeureFermeture, setHeureFermeture] = useState("2021-01-01T00:00:00");
    
    function handleSubmitEdit(event: FormEvent<HTMLFormElement>) {
        const request: RegisterNewUserRequest = {
          nomAgence: Nom,
          adresse: Adresse,
          codeAgence: CodeAgence,
          regionId: RegionId,
          pays: Pays,
          longitude: Longitude,
          latitude: Latitude,
          telephone: Telephone,
          heureDemarrage: HeureDemarrage,
          heureFermeture: HeureFermeture,
        }

        console.log(request);
        
        fetch(`${ApplicationSettings.API_URL}agences/${Number(props.id)}`, {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(request)
        });
    }

    useEffect(() => {
      fetch(`${ApplicationSettings.API_URL}regions`).then((res) => res.json())
        .then((repos) => { setRegions({ loading: true, repos: repos }); });

      fetch(`https://restcountries.eu/rest/v2/all`).then((res) => res.json())
        .then((repos) => { setListPays({pays: repos}) });
    }, []);
    
    const handleShowEdit = () => {

        fetch(`${ApplicationSettings.API_URL}agences/${props.id}`).then((res) => res.json())
          .then((agence) => {
            // this.setState({ loading: true, repos: agence });
            /* console.log("Editer une agence");
             console.log(agence);
             console.log(agence.regionId); */
            setNom(agence.nomAgence);
            setPays(agence.pays);
            setAdresse(agence.adresse);
            setRegionId(agence.regionId);
            setLatitude(Number(agence.latitude));
            setLongitude(Number(agence.longitude));
            setTelephone(Number(agence.telephone));
            setCodeAgence(agence.codeAgence);
            setHeureDemarrage(agence.heureDemarrage);
            setHeureFermeture(agence.heureFermeture);
          });

        setShow(true);
    }

    return (
      <>
        <Button variant="primary" onClick={handleShowEdit} className="btn btn-warning btn-sm">
            <i className="fas fa-edit"></i>
        </Button>

        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton> <Modal.Title>Création Agence</Modal.Title> </Modal.Header> 
          <Modal.Body>          
            <form onSubmit={handleSubmitEdit}>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" value={Nom} onChange={event => setNom(event.target.value)} placeholder="Nom agence" />
                </div>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" value={Adresse} onChange={event => setAdresse(event.target.value)} placeholder="Adresse" />
                </div>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" value={CodeAgence} onChange={event => setCodeAgence(event.target.value)} placeholder="Code agence" />
                </div>
                <div className="input-group mb-3">
                  <select id="paysId" className="form-control"  onChange={event => setPays(event.target.value)}>
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
                  <select id="regionId" className="form-control" onChange={(event: any) => setRegionId(event.target.value)}>
                    {
                      regions.repos.map((elt: any) => {
                        if(String(RegionId) === String(elt.id)) {
                          console.log("Selectionné region")
                          console.log(RegionId)
                          console.log(elt.label)
                          return  <option key={elt.id} selected value={elt.id}>{elt.label}</option>; 
                        }                           
                        else {        
                          return  <option key={elt.id} value={elt.id}>{elt.label}</option>; 
                        } 
                      })
                    }
                  </select>
                  {/* <input type="text" className="form-control" onChange={event => setPays(event.target.value)} placeholder="Region" /> */}
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
                  <input type="datetime-local" className="form-control" value={HeureDemarrage} onChange={(event:any) => setHeureDemarrage(event.target.value)} placeholder="Heure de démarrage" />
                </div>
                <div className="input-group mb-3">
                  <input type="datetime-local" className="form-control" value={HeureFermeture} onChange={(event:any) => setHeureFermeture(event.target.value)} placeholder="Heure de fermeture" />
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

export default EditAgence;
