import Editlivraison from './edit-livraison';

const Livraison = (props: any) => {

    // useEffect(() => {
    //     console.log("livraison Component");
    // }, [])

    return (
        <tr>
            <td>{props.livraison.id}</td>
            <td>{props.livraison.libelle}</td>
            <td>{props.livraison.colis.dateEnvoie}</td>
            <td>{props.livraison.colis.regionDepart.label}</td>
            <td>{props.livraison.colis.regionDepart.label}</td>
            <td>{props.livraison.colis.clientSource.displayName}</td>
            <td>{props.livraison.colis.clientRecepteur.displayName}</td>
            <td>{props.livraison.livreur.displayName}</td>
            <td>{props.livraison.moyenTransport.libelle + " " + props.livraison.moyenTransport.type}</td>
            <td>{props.livraison.typeLivraison.libelle}</td>
            <td>
                {props.livraison.etatLivraison &&        
                <p className="badge badge-success">Déja livréee</p>    
                }
                {!props.livraison.etatLivraison &&        
                <p className="badge badge-primary">Non livrée</p>    
                }
            </td>
            <td>
                <Editlivraison id={props.livraison.id} { ...props } />
            </td>
        </tr>
    );
};

export default Livraison;