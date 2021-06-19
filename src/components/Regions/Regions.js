import React from "react";
import Region from './region';
import AddRegion from './add-region';
import { regionService } from './services/region-service';

class Regions extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: false, repos: [] 
    }
  }

  componentDidMount = () => {
    regionService.getAll().then((data) => {
        this.setState({loading: true, repos: data});
     });     
  }

  render() {
    const RegionsJSX = this.state.loading? 
    this.state.repos.map((elt) => {
      return (
        <Region key={elt.id} region={elt} { ...this.props } />
      )
    }) : null;
    console.log("From Region Service In Regions Component");
    console.log(this.state.repos);

    return (
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Liste des Regions</h3>  
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
                    <AddRegion />
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
                    <th>Nom</th>
                    <th>Adresse</th>
                    <th>Téléphone</th>
                    <th>Pays</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                    {RegionsJSX}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Regions;
