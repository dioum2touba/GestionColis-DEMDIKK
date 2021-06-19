import React from "react";
import { ApplicationSettings } from "../../configuration/application-settings";
import AddUser from "./add-user";
import User from "./User";
import './Users.css';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      repos: [],
    };
  }

  componentDidMount = () => {
    fetch(`${ApplicationSettings.API_URL}users`)
      .then((res) => res.json())
      .then((Users) => {
        // console.log("Liste des Users");
        // console.log(Users);
        this.setState({ loading: true, repos: Users });
      });
  };

  render() {
    const UsersJSX = this.state.loading
      ? this.state.repos.map((elt, edx) => {
          // console.log("User: ", elt.id);
          // console.log(elt);
          return <User key={elt.id} user={elt} {...this.props} />;
        })
      : null;

    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Liste des utilisateurs</h3>
              <div className="card-tools">
                <div
                  className="input-group input-group-sm"
                  style={{ width: "150px" }}
                >
                  <input
                    type="text"
                    name="table_search"
                    className="form-control float-right"
                    placeholder="Search"
                  />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-default">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                  <div className="input-group-append">
                    <AddUser />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="card-body table-responsive p-0"
              style={{ height: "50%" }}
            >
              <table className="table table-head-fixed text-nowrap">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Agence</th>
                    <th>Région</th>
                    <th>Roles</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{UsersJSX}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
