import React, { useEffect } from 'react';
import EditTypeLivraison from './edit-typeLivraison';

const TypeLivraison = (props: any) => {

    useEffect(() => {
        console.log("TypeLivraison Component");
    })

    return (
        <tr>
            <td>{props.typeLivraison.id}</td>
            <td>{props.typeLivraison.libelle}</td>
            <td>{props.typeLivraison.description}</td>
            <td>
                <EditTypeLivraison id={props.typeLivraison.id} { ...props } />
            </td>
        </tr>
    );
};

export default TypeLivraison;