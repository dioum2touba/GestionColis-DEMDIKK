import React from "react";
import { ApplicationSettings } from "../../configuration/application-settings";
import AddColis from './add-colis';
import DetailReceptionne from './detail-receptionne';

class Receptionne extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: false, repos: null 
    }
  }

  componentDidMount = () => {
    fetch(`${ApplicationSettings.API_URL}Colis`)
      .then((res) => res.json())
      .then((colis) => {
        console.log("Liste des colis")
        console.log(colis)
        colis.map(elt => console.log(elt.description))
        this.setState({ loading: true, repos: colis });
      });
  }

  
  render() {
    const colisJSX = this.state.loading? 
        this.state.repos.map((elt) => {
          if(elt.receptionAgence)
          {
            return (
              <DetailReceptionne key={elt.id} colis={elt} { ...this.props } />
            )
          } else { return null;}
        }) : null;

    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Liste des colis réceptionnés</h3>  
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
                    <AddColis />
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
                    <th>Libelle</th>
                    <th>Date d'envoie</th>
                    <th>Date de réception</th>
                    <th>Agence de départ</th>
                    <th>Région de départ</th>
                    <th>Agence d'arrivée</th>
                    <th>Région d'arrivée</th>
                    <th>type de colis</th>
                    <th>Client envoyeur</th>
                    <th>Client récepteur</th>
                    {/* <th>Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                    {colisJSX}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Receptionne;
