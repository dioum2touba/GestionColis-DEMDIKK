import React from "react";
import { ApplicationSettings } from "../../configuration/application-settings";
import PrixVoyageRegion from './PrixVoyageRegion';
import AddPrixVoyageRegion from './add-prixVoyageRegion';

class PrixVoyageRegions extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: false, repos: null 
    }
  }

  componentDidMount = () => {
    fetch(`${ApplicationSettings.API_URL}prixVoyageRegions`)
      .then((res) => res.json())
      .then((prixVoyageRegion) => {
        this.setState({ loading: true, repos: prixVoyageRegion });
      });
  }

  render() {
    const prixVoyageRegionsJSX = this.state.loading? 
        this.state.repos.map((elt) => {
          return (
            <PrixVoyageRegion key={elt.id} prixVoyageRegion={elt} { ...this.props } />
          )
        }) : null;

    return (
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Liste des prix de voyage entre régions</h3>  
              <div class="card-tools">
                <div
                  class="input-group input-group-sm"
                  style={{ width: "150px" }}
                >
                  <input
                    type="text"
                    name="table_search"
                    class="form-control float-right"
                    placeholder="Search"
                  />  
                  <div class="input-group-append">
                    <button type="submit" class="btn btn-default">
                      <i class="fas fa-search"></i>
                    </button>
                  </div>            
                  <div class="input-group-append">
                    <AddPrixVoyageRegion />
                  </div>
                </div>    
              </div>

            </div>
            <div
              class="card-body table-responsive p-0"
              style={{ height: "50%"}}
            >
              <table class="table table-head-fixed text-nowrap">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Départ</th>
                    <th>Destinataire</th>
                    <th>Prix</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {prixVoyageRegionsJSX}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PrixVoyageRegions;
