import { FormEvent, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { ApplicationSettings } from "../../configuration/application-settings";
import { Role } from './models/Role';


const EditRole = (props: any) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [Libelle, setLibelle] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const request: Role = {
      name: Libelle
    };

    console.log(request);

    fetch(`${ApplicationSettings.API_URL}roles/${Number(props.id)}`, {
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
    console.log("Roles");
  }, []);
  const handleShowEdit = () => {
    fetch(`${ApplicationSettings.API_URL}roles/${props.id}`).then((res) => res.json())
    .then((role) => {
        // this.setState({ loading: true, repos: agence });
        console.log("Editer un role");
        console.log(role);
        /*  console.log(agence);
        console.log(agence.regionId); */
        setLibelle(role.name);
    });

    setShow(true);
}

return (
<>
<Button variant="primary" onClick={handleShowEdit} className="btn btn-warning btn-sm">
    <i className="fas fa-edit"></i>
</Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modification d'un rôle</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={Libelle}
                onChange={(event) => setLibelle(event.target.value)}
                placeholder="Libellé du rôle"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="btn-sm" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" className="btn-sm">
              Enregistrer
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditRole;
