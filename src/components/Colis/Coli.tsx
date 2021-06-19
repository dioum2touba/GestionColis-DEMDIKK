import EditColis from './edit-colis';
import Moment from 'react-moment';

const Colis = (props: any) => {

    // useEffect(() => {
    //     console.log("colis Component");
    // }, [])

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
                {props.colis.receptionAgence &&        
                <p className="badge badge-success">Réceptionné</p>    
                }
                {!props.colis.receptionAgence &&        
                <p className="badge badge-primary">Non Réceptionné</p>    
                }
            </td>
            <td>
                <EditColis id={props.colis.id} { ...props } />
            </td>
        </tr>
    );
};

export default Colis;