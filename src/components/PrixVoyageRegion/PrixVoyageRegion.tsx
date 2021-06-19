import React, { useEffect } from 'react';
import EditPrixVoyageRegion from './edit-prixVoyageRegion';

const PrixVoyageRegion = (props: any) => {

    useEffect(() => {
        console.log("prixVoyageRegion Component");
    })

    return (
        <tr>
            <td>{props.prixVoyageRegion.id}</td>
            <td>{props.prixVoyageRegion.regionDepart.label}</td>
            <td>{props.prixVoyageRegion.regionArrivee.label}</td>
            <td>{props.prixVoyageRegion.prix}</td>
            <td>
                <EditPrixVoyageRegion id={props.prixVoyageRegion.id} { ...props } />
            </td>
        </tr>
    );
};

export default PrixVoyageRegion;