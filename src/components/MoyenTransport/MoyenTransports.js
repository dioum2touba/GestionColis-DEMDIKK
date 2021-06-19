import React from "react";
import { ApplicationSettings } from "../../configuration/application-settings";
import MoyenTransport from './MoyenTransport';
import AddMoyenTransport from './add-moyenTransport';

class MoyenTransports extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: false, repos: null 
    }
  }

  componentDidMount = () => {
    fetch(`${ApplicationSettings.API_URL}MoyenTransports`)
      .then((res) => res.json())
      .then((moyenTransport) => {
        this.setState({ loading: true, repos: moyenTransport });
      });
  }

  render() {
    const MoyenTransportsJSX = this.state.loading? 
        this.state.repos.map((elt) => {
          return (
            <MoyenTransport key={elt.id} moyenTransport={elt} { ...this.props } />
          )
        }) : null;

    return (
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Liste des moyens de transport</h3>  
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
                    <AddMoyenTransport />
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
                    <th>Libellé</th>
                    <th>Type</th>
                    <th>Matricule</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {MoyenTransportsJSX}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MoyenTransports;
