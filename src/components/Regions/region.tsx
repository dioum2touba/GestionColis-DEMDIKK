import React, { useEffect } from 'react';
import EditRegion from './edit-region';

const Region = (props: any) => {

    useEffect(() => {
        console.log("region Component");
        /*onClick={handleShow}*/
    })

    return (
        <tr>
            <td>{props.region.id}</td>
            <td>{props.region.label}</td>
            <td>{props.region.adresse}</td>
            <td>{props.region.telephone}</td>
            <td>{props.region.pays}</td>
            <td>{props.region.latitude}</td>
            <td>{props.region.longitude}</td>
            <td>
                <EditRegion id={props.region.id} { ...props } />
            </td>
        </tr>
    );
};

export default Region;