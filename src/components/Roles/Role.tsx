import React, { useEffect } from 'react';
import EditRoles from './edit-role';

const Role = (props: any) => {

    useEffect(() => {
        console.log("role Component");
    })

    return (
        <tr>
            <td>{props.role.name}</td>
            <td>{props.role.normalizedName}</td>
            <td>
                <EditRoles id={props.role.id} { ...props } />
            </td>
        </tr>
    );
};

export default Role;