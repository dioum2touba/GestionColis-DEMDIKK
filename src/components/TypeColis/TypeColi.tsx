import React, { useEffect } from 'react';
import EditTypeColis from './edit-typecolis';

const TypeColi = (props: any) => {

    useEffect(() => {
        console.log("typeColi Component");
    })

    return (
        <tr>
            <td>{props.typeColi.id}</td>
            <td>{props.typeColi.libelle}</td>
            <td>{props.typeColi.categorie}</td>
            <td>{props.typeColi.prix}</td>
            <td>
                <EditTypeColis id={props.typeColi.id} { ...props } />
            </td>
        </tr>
    );
};

export default TypeColi;