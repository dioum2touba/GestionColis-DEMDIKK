import React from "react";
import Role from './Role';
import AddRoles from './add-role';
import { RolesService } from './services/roles-service';

class Roles extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: false, repos: null 
    }
  }

  componentDidMount = () => {
    RolesService.getAll().then((data) => {
      this.setState({loading: true, repos: data});
   }); 
  }

  render() {
    const RolesJSX = this.state.loading? 
        this.state.repos.map((elt) => {
          return (
            <Role key={elt.id} role={elt} { ...this.props } />
          )
        }) : null;

    return (
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Liste des roles</h3>  
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
                    <AddRoles />
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
                    <th>Libelle</th>
                    <th>Nom Normalisé</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {RolesJSX}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Roles;
