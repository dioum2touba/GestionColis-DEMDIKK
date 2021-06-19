import { FormEvent, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { ApplicationSettings } from "../../configuration/application-settings";
import { User } from "./models/User";

const EditUser = (props: any) => {
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

    fetch(`${ApplicationSettings.API_URL}TypeDeColis/${Number(props.id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      })
      .then((res) => res.json())
      .then((repos) => {
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

    if(PasswordHash === PasswordHashConfirmed) {
      setComparePassword(true);
      setErrorState("Les deux mot de passe sont identiques");
      console.log("Les deux mot de passe sont identiques");
    } else {
      setComparePassword(false);
      setErrorState("Les deux mot de passe ne correspondent pas");
      console.log("Les deux mot de passe ne correspondent pas");
    }
  }

    const handleShowEdit = () => {
        fetch(`${ApplicationSettings.API_URL}users/${props.id}`).then((res) => res.json())
        .then((user) => {
            // this.setState({ loading: true, repos: agence });
            console.log("Editer un utilisateur");
            console.log(user);
            /*  console.log(agence);
            console.log(agence.regionId); */
            setUserName(user.userName);
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setPasswordHash(user.passwordHash);
            setPhoneNumber(user.phoneNumber);
            setRegionId(user.regionId);
            setAgenceId(user.agenceId);
            setRolesId('');
        });

        if(regions.repos.length === 0) {
            fetch(`${ApplicationSettings.API_URL}regions`)
            .then((res) => res.json())
            .then((repos) => {
              setRegions({ loading: true, repos: repos });
            });
        }
        
        if(agences.repos.length === 0) {
            fetch(`${ApplicationSettings.API_URL}agences`)
            .then((res) => res.json())
            .then((repos) => {
              setAgences({ loading: true, repos: repos });
            });
        }

        if(roles.repos.length === 0) {
            fetch(`${ApplicationSettings.API_URL}roles`)
            .then((res) => res.json())
            .then((repos) => {
              setRoles({ loading: true, repos: repos });
            });
        }

        setShow(true);
    }

  return (
    <>
    <Button variant="primary" onClick={handleShowEdit} className="btn btn-warning btn-sm">
        <i className="fas fa-edit"></i>
    </Button>

    <Modal show={show} onHide={handleClose} animation={false}>
        <form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
            <Modal.Title>Création d'un utilisateur</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="input-group mb-3">
                <input
                type="text"
                className="form-control"
                value={FirstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="Prénom"
                />
            </div>
            <div className="input-group mb-3">
                <input
                type="text"
                className="form-control"
                value={LastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Nom"
                />
            </div>
            <div className="input-group mb-3">
                <input
                type="text"
                className="form-control"
                value={Email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="xxxxxx@xxx.xxx"
                />
            </div>
            <div className="input-group mb-3">
                <input
                type="text"
                value={PhoneNumber}
                className="form-control"
                onChange={(event) => setPhoneNumber(Number(event.target.value))}
                placeholder="77 777 77 77"
                />
            </div>
            <div className="input-group mb-3">
                <select
                id="regionId"
                className="form-control"
                onChange={(event: any) => setRegionId(event.target.value)}
                >
                <option>Sélectionner une région</option>
                {regions.repos.map((elt: any) => {
                    if(RegionId === elt.id) {
                        return (
                            <option selected key={elt.id} value={elt.id}>
                                {elt.label}
                            </option>
                            );
                    } else {
                        return (
                            <option key={elt.id} value={elt.id}>
                                {elt.label}
                            </option>
                            );
                    }
                })}
                </select>
            </div>
            <div className="input-group mb-3">
                <select
                id="agenceId"
                className="form-control"
                onChange={(event: any) => setAgenceId(event.target.value)}
                >
                <option>Sélectionner une agence</option>
                {agences.repos.map((elt: any) => {
                    if(AgenceId === elt.id) {
                        return (
                            <option selected key={elt.id} value={elt.id}>
                                {elt.nomAgence}
                            </option>
                        );
                    } else {
                        return (
                            <option key={elt.id} value={elt.id}>
                                {elt.nomAgence}
                            </option>
                        );
                    }
                })}
                </select>
                {/* <input type="text" className="form-control" onChange={event => setPays(event.target.value)} placeholder="Region" /> */}
            </div>
            <div className="input-group mb-3">
                <select
                id="roleId"
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
            <div className="input-group mb-3">
                <input
                type="text"
                className="form-control"
                value={UserName}
                onChange={(event: any) => setUserName(event.target.value)}
                placeholder="username"
                />
            </div>
            <div className="input-group mb-3">
                <input
                type="password"
                className="form-control"
                value={PasswordHash}
                onChange={(event: any) => setPasswordHash(event.target.value)}
                placeholder="Mot de passe"
                />
            </div>
            <div className="input-group mb-3">
                <input
                type="password"
                className="form-control"
                value={PasswordHashConfirmed}
                onChange={(event: any) => HandlePasswordCompare(event)}
                placeholder="Confirmer le mot de passe"
                />
            </div>
                <div><p className={!comparePassword? 'PasswordCompareError' : 'PasswordCompareSuccess'}>{ErrorState}</p></div>
            <div className="input-group mb-3">
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="success" onClick={(event: any) => handleSubmit(event)}>
                Enregistrer
            </Button>
            </Modal.Footer>
        </form>
        </Modal>
    </>
  );
};

export default EditUser;
