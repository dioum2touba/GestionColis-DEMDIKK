import React, { useEffect } from 'react';
import EditmoyenTransport from './edit-moyenTransport';

const MoyenTransport = (props: any) => {

    useEffect(() => {
        console.log("moyenTransport Component");
    })

    return (
        <tr>
            <td>{props.moyenTransport.id}</td>
            <td>{props.moyenTransport.libelle}</td>
            <td>{props.moyenTransport.type}</td>
            <td>{props.moyenTransport.matricule}</td>
            <td>{props.moyenTransport.description}</td>
            <td>
                <EditmoyenTransport id={props.moyenTransport.id} { ...props } />
            </td>
        </tr>
    );
};

export default MoyenTransport;