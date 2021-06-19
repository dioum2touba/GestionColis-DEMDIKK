import React from 'react';
import EditClient from './edit-client';

const Client = (props: any) => {

    // useEffect(() => {
    //     console.log("client Component");
    // }, [])

    return (
        <tr>
            <td>{props.client.id}</td>
            <td>{props.client.lastName}</td>
            <td>{props.client.firstName}</td>
            <td>{props.client.adresse}</td>
            <td>{props.client.cin}</td>
            <td>{props.client.telephone}</td>
            <td>
                <EditClient id={props.client.id} { ...props } />
            </td>
        </tr>
    );
};

export default Client;