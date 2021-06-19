import { useEffect } from 'react';
import EditAgence from './edit-agence';

const Agence = (props: any) => {

    useEffect(() => {
        console.log("Agence Component");
    })

    return (
        <tr>
            <td>{props.agence.id}</td>
            <td>{props.agence.nomAgence}</td>
            <td>{props.agence.adresse}</td>
            <td>{props.agence.region.label}</td>
            <td>{props.agence.telephone}</td>
            <td>{props.agence.latitude}</td>
            <td>{props.agence.longitude}</td>
            <td>
                <EditAgence id={props.agence.id} { ...props } />
            </td>
        </tr>
    );
};

export default Agence;