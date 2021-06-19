import AddLivraison from './add-livraison';

const CreerDetailslivraison = (props: any) => {

    // useEffect(() => {
    //     console.log("creerDetailslivraison Component");
    // }, [])

    return (
        <tr>
            <td>{props.creerDetailslivraison.id}</td>
            <td>{props.creerDetailslivraison.libelle}</td>
            <td>{props.creerDetailslivraison.dateEnvoie}</td>
            <td>{props.creerDetailslivraison.regionDepart.label}</td>
            <td>{props.creerDetailslivraison.regionRecepteur.label}</td>
            <td>{props.creerDetailslivraison.clientSource.displayName}</td>
            <td>{props.creerDetailslivraison.clientRecepteur.displayName}</td>
            <td>{props.creerDetailslivraison.typeDeColis.name}</td>
            <td>
                <AddLivraison id={props.creerDetailslivraison.id} { ...props } />                
            </td>
        </tr>
    );
};

export default CreerDetailslivraison;