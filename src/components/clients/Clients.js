import React from "react";
import { ApplicationSettings } from "../../configuration/application-settings";
import Addclient from "./add-client";
import Client from "./Client";
import './Client.css';

class Clients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      repos: [],
    };
  }

  componentDidMount = () => {
    fetch(`${ApplicationSettings.API_URL}Clients`)
      .then((res) => res.json())
      .then((Clients) => {
        console.log("Liste des Clients");
        console.log(Clients);
        this.setState({ loading: true, repos: Clients });
      });
  };

  render() {
    const ClientsJSX = this.state.loading
      ? this.state.repos.map((elt, edx) => {
          // console.log("client: ", elt.id);
          // console.log(elt);
          return <Client key={elt.id} client={elt} {...this.props} />;
        })
      : null;

    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Liste des clients</h3>
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
                    <button type="submit" class="btn btn-default">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                  <div className="input-group-append">
                    <Addclient />
                  </div>
                </div>
              </div>
            </div>
            <div
              class="card-body table-responsive p-0"
              style={{ height: "50%" }}
            >
              <table class="table table-head-fixed text-nowrap">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Adresse</th>
                    <th>CIN</th>
                    <th>Téléphone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{ClientsJSX}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Clients;
