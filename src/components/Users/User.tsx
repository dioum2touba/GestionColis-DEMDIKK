import React from 'react';
import EditUser from './edit-user';

const User = (props: any) => {

    // useEffect(() => {
    //     console.log("User Component");
    // }, [])

    return (
        <tr>
            <td>{props.user.lastName}</td>
            <td>{props.user.firstName}</td>
            <td>{props.user.userName}</td>
            <td>{props.user.email}</td>
            <td>{props.user.agence.nomAgence}</td>
            <td>{props.user.region.label}</td>
            <td>
                {
                    props.user.roles.map((elt: any) => {
                        return (elt.normalizedName +", ");
                    })
                }
            </td>
            <td>
                <EditUser id={props.user.id} { ...props } />
            </td>
        </tr>
    );
};

export default User;