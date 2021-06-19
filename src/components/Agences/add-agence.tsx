import { FormEvent, useState, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap'
import { ApplicationSettings } from "../../configuration/application-settings";

interface RegisterNewUserRequest {
  nomAgence: string,
  adresse: string,
  codeAgence: string,
  regionId: number,
  typeAgenceId: number,
  pays: string,
  longitude: number,
  latitude: number,
  telephone: number,
  // heureDemarrage: Date,
  // heureFermeture: Date
}

const AddAgence = () => {
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [Nom, setNom] = useState('');
  const [Pays, setPays] = useState("Senegal");
  const [Adresse, setAdresse] = useState('');
  const [RegionId, setRegionId] = useState(0);
  const [Latitude, setLatitude] = useState(0);
  const [Longitude, setLongitude] = useState(0);
  const [Telephone, setTelephone] = useState(0);
  const [CodeAgence, setCodeAgence] = useState('');
  const [TypeAgenceId, setTypeAgenceId] = useState(0);
  const [ListPays, setListPays] = useState({ pays: [] });
  const [ListTypeAgence, setListTypeAgence] = useState([]);
  // const [HeureDemarrage, setHeureDemarrage] = useState(new Date());
  // const [HeureFermeture, setHeureFermeture] = useState(new Date());
  const [regions, setRegions] = useState({ loading: false, repos: [] });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const request: RegisterNewUserRequest = {
      nomAgence: Nom,
      adresse: Adresse,
      codeAgence: CodeAgence,
      regionId: RegionId,
      pays: Pays,
      longitude: Longitude,
      latitude: Latitude,
      telephone: Telephone,
      typeAgenceId: TypeAgenceId
      // heureDemarrage: HeureDemarrage,
      // heureFermeture: HeureFermeture,
    }

    console.log(request);

    fetch(`${ApplicationSettings.API_URL}agences`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    }).then((res) => res.json())
      .then((repos) => {
        document.location.reload();
      });
  }

  useEffect(() => {
    fetch(`${ApplicationSettings.API_URL}regions`).then((res) => res.json())
      .then((repos) => { setRegions({ loading: true, repos: repos }) });
      
    fetch(`${ApplicationSettings.API_URL}TypeAgences`).then((res) => res.json())
      .then((repos) => { setListTypeAgence(repos) });

    fetch(`https://restcountries.eu/rest/v2/all`).then((res) => res.json())
      .then((repos) => { setListPays({ pays: repos }) });
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="btn btn-success">
        <i className="fas fa-plus"></i>
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        {/* <form onSubmit={handleSubmit}> */}
          <Modal.Header closeButton> <Modal.Title>Création Agence</Modal.Title> </Modal.Header>
          <Modal.Body>
            <div className="form-row col-md-12">
              <div className="form-group col-md-12">
                <label htmlFor="NomAgence">Nom d'agence</label>
                <input type="text" className="form-control" name="NomAgence" value={Nom} onChange={event => setNom(event.target.value)} placeholder="Nom agence" />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="Adresse">Adresse</label>
                <input type="text" className="form-control" name="Adresse" value={Adresse} onChange={event => setAdresse(event.target.value)} placeholder="Adresse" />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="CodeAgence">Code d'agence</label>
                <input type="text" className="form-control" name="CodeAgence" value={CodeAgence} onChange={event => setCodeAgence(event.target.value)} placeholder="Code agence" />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="Pays">Pays</label>
                <select id="paysId" disabled={true} className="form-control" name="Pays" onChange={event => setPays(event.target.value)}>
                  <option>Sélectionner un pays</option>
                  {
                    ListPays.pays.map((elt: any, idx) => {
                      return (
                        <option key={idx} selected value={Pays}>{"Senegal"}</option>
                      );
                    })
                  }
                </select>
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="TypeAgence">Type d'agence</label>
                <select id="regionId" className="form-control" name="TypeAgence" onChange={(event: any) => setTypeAgenceId(event.target.value)}>
                  <option>Sélectionner un type d'agence</option>
                  {
                    ListTypeAgence.map((elt: any) => {
                      return (
                        <option key={elt.id} value={elt.id}>{elt.libelle}</option>
                      );
                    })
                  }
                </select>
                {/* <input type="text" className="form-control" onChange={event => setPays(event.target.value)} placeholder="Region" /> */}
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="Region">Région</label>
                <select id="regionId" className="form-control" name="Region" onChange={(event: any) => setRegionId(event.target.value)}>
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
              <div className="form-group col-md-12">
                <label htmlFor="Longitude">Longitude</label>
                <input type="number" step="0.01" className="form-control" name="Longitude" /*value={Longitude}*/ onChange={(event: any) => setLongitude(event.target.value)} placeholder="Longitude" />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="Latitude">Latitude</label>
                <input type="number" step="0.01" className="form-control" name="Latitude" /*value={Latitude}*/ onChange={(event: any) => setLatitude(event.target.value)} placeholder="Latitude" />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="Telephone">Téléphone</label>
                <input type="number" className="form-control" name="Telephone" /*value={Telephone}*/ onChange={(event: any) => setTelephone(event.target.value)} placeholder="Téléphone" />
              </div>
            </div>
            {/* <div className="input-group mb-3">
                  <DatePicker
                    selected={HeureDemarrage}
                    onChange={(date: any) => setHeureDemarrage(date)}
                    locale="en-GB"
                    className="form-control"
                    placeholderText="Weeks start on Monday"
                  />
                </div>
                <div className="input-group mb-3">
                  <DatePicker
                    selected={HeureFermeture}
                    onChange={(date: any) => setHeureFermeture(date)}
                    locale="en-GB"
                    className="form-control"
                    placeholderText="Weeks start on Monday"
                  />
                </div> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="success" type="submit" onClick={(event: any) => handleSubmit(event)}>
              Enregistrer
            </Button>
          </Modal.Footer>
        {/* </form> */}
      </Modal>
    </>
  );
};

export default AddAgence;
