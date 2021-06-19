import { FormEvent, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { ApplicationSettings } from "../../configuration/application-settings";
import { User } from "./models/User";


const AddUser = () => {
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [comparePassword, setComparePassword] = useState(false);
  const handleClose = () => setShow(false);

  const [UserName, setUserName] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [ErrorState, setErrorState] = useState("");
  const [PasswordHash, setPasswordHash] = useState("");
  const [PasswordHashConfirmed, setPasswordHashConfirmed] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState<number>();
  const [RegionId, setRegionId] = useState(0);
  const [AgenceId, setAgenceId] = useState(0);
  const [RolesId, setRolesId] = useState('');

  const [roles, setRoles] = useState({ loading: false, repos: [] });
  const [agences, setAgences] = useState({ loading: false, repos: [] });
  const [regions, setRegions] = useState({ loading: false, repos: [] });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const request: User = {
      userName: UserName,
      firstName: FirstName,
      lastName: LastName,
      email: Email,
      passwordHash: PasswordHash,
      phoneNumber: Number(PhoneNumber),
      agenceId: AgenceId,
      regionId: RegionId,
      rolesId: RolesId
    };

    console.log(request);

    fetch(`${ApplicationSettings.API_URL}users`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    })
      .then((res) => res.json())
      .then((repos) => {
        console.log("Post User From Component Uers");
        console.log(repos);
        document.location.reload();
      });
  }

  useEffect(() => {
    fetch(`${ApplicationSettings.API_URL}regions`)
      .then((res) => res.json())
      .then((repos) => {
        setRegions({ loading: true, repos: repos });
      });

    fetch(`${ApplicationSettings.API_URL}agences`)
      .then((res) => res.json())
      .then((repos) => {
        console.log("AGence depuis User")
        console.log(repos)
        setAgences({ loading: true, repos: repos });
      });

    fetch(`${ApplicationSettings.API_URL}roles`)
      .then((res) => res.json())
      .then((repos) => {
        setRoles({ loading: true, repos: repos });
      });
  }, []);

  const HandlePasswordCompare = (event: any) => {
    setPasswordHashConfirmed(event.target.value);

    if (PasswordHash === event.target.value) {
      setComparePassword(true);
      setErrorState("Les deux mot de passe sont identiques");

    } else {
      setComparePassword(false);
      setErrorState("Les deux mot de passe ne correspondent pas");
    }
  }

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
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Création d'un utilisateur</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-row col-md-12">
              <div className="form-group col-md-12">
                <label htmlFor="Prénom">Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  value={FirstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  name="Prénom"
                  placeholder="Prénom"
                />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="Nom">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  value={LastName}
                  onChange={(event) => setLastName(event.target.value)}
                  name="Nom"
                  placeholder="Nom"
                />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="Email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={Email}
                  name="Email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="xxxxxx@xxx.xxx"
                />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="Téléphone">Téléphone</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => setPhoneNumber(Number(event.target.value))}
                  placeholder="77 777 77 77"
                  name="Téléphone"
                />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="Matricule">Matricule</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => setPhoneNumber(Number(event.target.value))}
                  placeholder="N° Matricule"
                  name="Matricule"
                />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="Région">Région</label>
                <select
                  id="regionId"
                  name="Région"
                  className="form-control"
                  onChange={(event: any) => setRegionId(event.target.value)}
                >
                  <option>Sélectionner une région</option>
                  {regions.repos.map((elt: any) => {
                    return (
                      <option key={elt.id} value={elt.id}>
                        {elt.label}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="Agence">Agence</label>
                <select
                  id="agenceId"
                  name="Agence"
                  className="form-control"
                  onChange={(event: any) => setAgenceId(event.target.value)}
                >
                  <option>Sélectionner une agence</option>
                  {agences.repos.map((elt: any) => {
                    return (
                      <option key={elt.id} value={elt.id}>
                        {elt.nomAgence}
                      </option>
                    );
                  })}
                </select>
                {/* <input type="text" className="form-control" onChange={event => setPays(event.target.value)} placeholder="Region" /> */}
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="Role">Role</label>
                <select
                  id="roleId"
                  name="Role"
                  className="form-control"
                  onChange={(event: any) => setRolesId(event.target.value)}
                >
                  <option>Sélectionner un role</option>
                  {roles.repos.map((elt: any) => {
                    return (
                      <option key={elt.id} value={elt.id}>
                        {elt.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="UserName">UserName</label>
                <input
                  type="text"
                  name="UserName"
                  className="form-control"
                  value={UserName}
                  onChange={(event: any) => setUserName(event.target.value)}
                  placeholder="username"
                />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="Password">Mot de passe</label>
                <input
                  type="password"
                  name="Password"
                  className="form-control"
                  value={PasswordHash}
                  onChange={(event: any) => setPasswordHash(event.target.value)}
                  placeholder="Mot de passe"
                />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="ConfirmPassword">Confirmer le mot de passe</label>
                <input
                  type="password"
                  name="ConfirmPassword"
                  className="form-control"
                  value={PasswordHashConfirmed}
                  onChange={(event: any) => HandlePasswordCompare(event)}
                  placeholder="Confirmer le mot de passe"
                />
              </div>
              <div><p className={!comparePassword ? 'PasswordCompareError' : 'PasswordCompareSuccess'}>{ErrorState}</p></div>
              <div className="form-group col-md-12">
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" disabled={!comparePassword} onClick={(event: any) => handleSubmit(event)}>
              Enregistrer
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default AddUser;
