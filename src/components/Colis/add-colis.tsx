import { FormEvent, useState, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap'
import { ApplicationSettings } from "../../configuration/application-settings";
import './Colis.css';
import { RegisterNewColisRequest } from './models/colis';
import { AuthenticationService } from './../login/authentication/authentication-service';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddColis = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [Libelle, setLibelle] = useState('');
  const [Description, setDescription] = useState('');
  const [TypeColisId, setTypeColisId] = useState(0);
  const [DateEnvoi, setDateEnvoi] = useState(new Date());
  const [RegionId, setRegionId] = useState(0);
  const [AgenceId, setAgenceId] = useState(0);
  const [MoyenTransportId, setMoyenTransportId] = useState(0);

  const [regions, setRegions] = useState({ loading: false, repos: [] });
  const [agences, setAgences] = useState({ loading: false, repos: [] });
  const [typeColis, setTypeColis] = useState({ loading: false, repos: [] });
  const [moyenTransport, setMoyenTransport] = useState({ loading: false, repos: [] });

  const [TelephoneEnvoyeur, setTelephoneEnvoyeur] = useState<number>(0);
  const [CINEnvoyeur, setCINEnvoyeur] = useState<number>();
  const [PrenomEnvoyeur, setPrenomEnvoyeur] = useState('');
  const [NomEnvoyeur, setNomEnvoyeur] = useState('');
  const [AdresseEnvoyeur, setAdresseEnvoyeur] = useState('');

  const [TelephoneRecepteur, setTelephoneRecepteur] = useState<number>(0);
  const [CINRecepteur, setCINRecepteur] = useState<number>();
  const [PrenomRecepteur, setPrenomRecepteur] = useState('');
  const [NomRecepteur, setNomRecepteur] = useState('');
  const [AdresseRecepteur, setAdresseRecepteur] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    console.log("Date d'envoi");
    console.log(DateEnvoi);

    const request: RegisterNewColisRequest = {
      createdBy: (AuthenticationService.getUserId() || "").toString(),
      id: 0,
      libelle: Libelle,
      description: Description,
      dateEnvoie: DateEnvoi,
      regionRecepteurId: RegionId,
      agenceRecepteurId: AgenceId,
      moyenTransportId: MoyenTransportId,
      typeDeColisId: TypeColisId,
      clientSource: {
        firstName: PrenomEnvoyeur,
        lastName: NomEnvoyeur,
        telephone: TelephoneEnvoyeur,
        adresse: AdresseEnvoyeur,
        cin: Number(CINEnvoyeur),
      },
      clientRecepteur: {
        firstName: PrenomRecepteur,
        lastName: NomRecepteur,
        telephone: TelephoneRecepteur,
        adresse: AdresseRecepteur,
        cin: Number(CINRecepteur),
      }
    }

    console.log("request for POST COLIS");
    console.log(request);

    fetch(`${ApplicationSettings.API_URL}colis`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    }).then((res) => res.json())
      .then((repos) => {
        console.log("After posted colis object")
        console.log(repos)
        window.location.reload();
      });
  }

  const handleShow = () => {
    if (regions.repos.length === 0) {
      fetch(`${ApplicationSettings.API_URL}regions`).then((res) => res.json())
        .then((repos) => { setRegions({ loading: true, repos: repos }) });
    }

    if (typeColis.repos.length === 0) {
      fetch(`${ApplicationSettings.API_URL}typedecolis`).then((res) => res.json())
        .then((repos) => { setTypeColis({ loading: true, repos: repos }) });
    }

    if (agences.repos.length === 0) {
      fetch(`${ApplicationSettings.API_URL}agences`).then((res) => res.json())
        .then((repos) => { setAgences({ loading: true, repos: repos }) });
    }

    if (moyenTransport.repos.length === 0) {
      fetch(`${ApplicationSettings.API_URL}MoyenTransports`).then((res) => res.json())
        .then((repos) => { setMoyenTransport({ loading: true, repos: repos }) });
    }

    setShow(true);
  }

  const handleTelephoneEnvoyeur = (telephone: any) => {
    setTelephoneEnvoyeur(telephone);
    console.log("Date d'envoi");
    console.log(DateEnvoi);

    fetch(`${ApplicationSettings.API_URL}clients/ClientParTelephone/${telephone}`).then((res) => res.json())
      .then((client) => {
        // this.setState({ loading: true, repos: agence });
        console.log("Editer une handleTelephoneEnvoyeur");
        console.log(client);
        setPrenomEnvoyeur(client.firstName);
        setNomEnvoyeur(client.lastName);
        setAdresseEnvoyeur(client.adresse);
        setCINEnvoyeur(client.cin);
      });
  }

  const handleTelephoneRecepteur = (telephone: any) => {
    setTelephoneRecepteur(telephone);

    fetch(`${ApplicationSettings.API_URL}clients/ClientParTelephone/${telephone}`).then((res) => res.json())
      .then((client) => {
        // this.setState({ loading: true, repos: agence });
        console.log("Editer une handleTelephoneRecepteur");
        console.log(client);
        setPrenomRecepteur(client.firstName);
        setNomRecepteur(client.lastName);
        setAdresseRecepteur(client.adresse);
        setCINRecepteur(client.cin);
      });
  }

  useEffect(() => {
    console.log("Component Add Colis")
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="btn btn-success" data-toggle="modal" data-target=".bd-example-modal-lg">
        <i className="fas fa-plus"></i>
      </Button>

      <Modal size="lg" show={show} onHide={handleClose} animation={true} className="modal fade bd-example-modal-lg" >
        {/* <form onSubmit={handleSubmit}> */}
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">Envoi de colis</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <fieldset className="form-group">
              <legend className="col-form-label col-sm-12 pt-0">Informations du colis</legend>
              <div className="form-row col-md-12">
                <div className="form-group col-md-4">
                  <label htmlFor="Libelle">Libellé</label>
                  <input type="text" className="form-control" value={Libelle} onChange={event => setLibelle(event.target.value)} required placeholder="Libellé du colis" />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="Description">Description</label>
                  <input type="text" className="form-control" value={Description} onChange={event => setDescription(event.target.value)} placeholder="Description du colis" />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="DateEnvoi">Date d'envoie</label>
                  <DatePicker
                    selected={DateEnvoi}
                    onChange={(date: any) => setDateEnvoi(date)}
                    locale="en-GB"
                    className="form-control"
                    placeholderText="Date d'envoie"
                  />
                  {/* <input type="datetime-local" className="form-control" value={DateEnvoi} onChange={event => setDateEnvoi(event.target.value)} placeholder="Date d'envoie" /> */}
                </div>
              </div>
              <div className="form-row col-md-12">
                <div className="form-group col-md-4">
                  <label htmlFor="Libelle">Destination</label>
                  <select id="regionId" className="form-control" onChange={(event: any) => setRegionId(event.target.value)}>
                    <option>Sélectionner une région</option>
                    {
                      regions.repos.map((elt: any) => {
                        return (
                          <option key={elt.id} value={elt.id}>{elt.label}</option>
                        );
                      })
                    }
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="Libelle">Agence récepteur</label>
                  <select id="AgenceId" className="form-control" onChange={(event: any) => setAgenceId(event.target.value)}>
                    <option>Sélectionner une agence</option>
                    {
                      agences.repos.map((elt: any) => {
                        return (
                          <option key={elt.id} value={elt.id}>{elt.nomAgence}</option>
                        );
                      })
                    }
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="Libelle">Type de colis</label>
                  <select id="TypeColisId" className="form-control" onChange={(event: any) => setTypeColisId(event.target.value)}>
                    <option>Sélectionner un type de colis</option>
                    {
                      typeColis.repos.map((elt: any) => {
                        return (
                          <option key={elt.id} value={elt.id}>{elt.name}</option>
                        );
                      })
                    }
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="Libelle">Moyen de transport</label>
                  <select id="TypeColisId" className="form-control" onChange={(event: any) => setMoyenTransportId(event.target.value)}>
                    <option>Sélectionner un moyen de transport</option>
                    {
                      moyenTransport.repos.map((elt: any) => {
                        return (
                          <option key={elt.id} value={elt.id}>{elt.libelle}</option>
                        );
                      })
                    }
                  </select>
                </div>
              </div>
            </fieldset>
            <br />
            <fieldset className="form-group">
              <legend className="envoyeur col-form-label col-sm-12 pt-0">Envoyeur</legend>
              <div className="form-row col-md-12">
                <div className="form-group col-md-6">
                  <label htmlFor="TelephoneEnvoyeur">Téléphone</label>
                  <input type="text" className="form-control" value={TelephoneEnvoyeur} onChange={event => handleTelephoneEnvoyeur(event.target.value)} placeholder="Téléphone" />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="NomEnvoyeur">Numéro CIN</label>
                  <input type="number" className="form-control" value={CINEnvoyeur} onChange={event => setCINEnvoyeur(Number(event.target.value))} placeholder="Numéro CIN" />
                </div>
              </div>
              <div className="form-row col-md-12">
                <div className="form-group col-md-4">
                  <label htmlFor="NomEnvoyeur">Prénom</label>
                  <input type="text" className="form-control" value={PrenomEnvoyeur} onChange={event => setPrenomEnvoyeur(event.target.value)} placeholder="Prénom" />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="NomEnvoyeur">Nom</label>
                  <input type="text" className="form-control" value={NomEnvoyeur} onChange={event => setNomEnvoyeur(event.target.value)} placeholder="Nom" />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="AdresseEnvoyeur">Adresse</label>
                  <input type="text" className="form-control" value={AdresseEnvoyeur} onChange={event => setAdresseEnvoyeur(event.target.value)} placeholder="Adresse" />
                </div>
              </div>
            </fieldset>
            <br />
            <fieldset className="form-group">
              <legend className="destinataire col-form-label col-sm-12 pt-0">Destinataire</legend>
              <div className="form-row col-md-12">
                <div className="form-group col-md-6">
                  <label htmlFor="TelephoneRecepteur">Téléphone</label>
                  <input type="text" className="form-control" value={TelephoneRecepteur} onChange={event => handleTelephoneRecepteur(event.target.value)} placeholder="Téléphone" />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="NomEnvoyeur">Numéro CIN</label>
                  <input type="number" className="form-control" value={CINRecepteur} onChange={event => setCINRecepteur(Number(event.target.value))} placeholder="Numéro CIN" />
                </div>
              </div>
              <div className="form-row col-md-12">
                <div className="form-group col-md-4">
                  <label htmlFor="NomRecepteur">Prénom</label>
                  <input type="text" className="form-control" value={PrenomRecepteur} onChange={event => setPrenomRecepteur(event.target.value)} placeholder="Prénom" />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="NomRecepteur">Nom</label>
                  <input type="text" className="form-control" value={NomRecepteur} onChange={event => setNomRecepteur(event.target.value)} placeholder="Nom" />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="AdresseRecepteur">Adresse</label>
                  <input type="text" className="form-control" value={AdresseRecepteur} onChange={event => setAdresseRecepteur(event.target.value)} placeholder="Adresse" />
                </div>
              </div>
            </fieldset>
            {/* <div className="input-group mb-3">
              <input type="submit" className="btn-primary btn-sm" style={{ float: "right" }} value="Enregistrer" />
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

export default AddColis;
