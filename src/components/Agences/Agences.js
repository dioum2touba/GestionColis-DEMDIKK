import React from "react";
import { ApplicationSettings } from "../../configuration/application-settings";
import Agence from './Agence';
import AddAgence from './add-agence';

class Agences extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: false, repos: null 
    }
  }

  componentDidMount = () => {
    fetch(`${ApplicationSettings.API_URL}agences`)
      .then((res) => res.json())
      .then((agence) => {
        console.log(agence)
        this.setState({ loading: true, repos: agence });
      });
  }

  render() {
    const agencesJSX = this.state.loading? 
        this.state.repos.map((elt) => {
          return (
            <Agence key={elt.id} agence={elt} { ...this.props } />
          )
        }) : null;

    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Liste des agences</h3>  
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
                    <AddAgence />
                  </div>
                </div>    
              </div>

            </div>
            <div
              className="card-body table-responsive p-0"
              style={{ height: "50%"}}
            >
              <table className="table table-head-fixed text-nowrap">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Adresse</th>
                    <th>Region</th>
                    <th>Téléphone</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {agencesJSX}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Agences;
