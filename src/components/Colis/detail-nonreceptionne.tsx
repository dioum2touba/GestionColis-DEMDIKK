import { Button } from 'react-bootstrap'
import { ApplicationSettings } from "../../configuration/application-settings";
import Moment from 'react-moment';

const DetailNonReceptionne = (props: any) => {

    // useEffect(() => {
    //     console.log("colis Component");
    // }, [])

    const handleReceptionColis = (id: any) => {
        fetch(`${ApplicationSettings.API_URL}colis/ReceptionneUnColis/${id}`)
        .then((response) => { 
            return response.json().then((data) => {
                console.log(data)
                if(data.succeeded){
                    window.location.reload();
                }
            }).catch((err) => {
                console.log(err);
            }) 
        });
            
    }


    return (
        <tr>
            <td>{props.colis.id}</td>
            <td>{props.colis.libelle}</td>
            <td><Moment format="DD/MM/YYYY hh:mm">{props.colis.dateEnvoie}</Moment></td>
            <td>{props.colis.agenceDepart.nomAgence}</td>
            <td>{props.colis.regionDepart.label}</td>
            <td>{props.colis.agenceRecepteur.nomAgence}</td>
            <td>{props.colis.regionRecepteur.label}</td>
            <td>{props.colis.typeDeColis.name}</td>
            <td>{props.colis.clientSource.displayName}</td>
            <td>{props.colis.clientRecepteur.displayName}</td>
            <td>
                <Button variant="primary" onClick={() => handleReceptionColis(props.colis.id)} className="btn btn-sm">
                    <i className="fas fa-download"></i>
                </Button>
            </td>
        </tr>
    );
};

export default DetailNonReceptionne;