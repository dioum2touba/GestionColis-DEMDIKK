import React from "react";
import TypeLivraison from './TypeLivraison';
import AddTypeLivraison from './add-typeLivraison';
import { typeLivraisonService } from './services/typeLivraison-service';

class TypeLivraisons extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: false, repos: null 
    }
  }

  componentDidMount = () => {
    typeLivraisonService.getAll().then((data) => {
      this.setState({loading: true, repos: data});
   }); 
  }

  render() {
    const TypeLivraisonJSX = this.state.loading? 
        this.state.repos.map((elt) => {
          return (
            <TypeLivraison key={elt.id} typeLivraison={elt} { ...this.props } />
          )
        }) : null;

    return (
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Liste des types de livraison</h3>  
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
                    <AddTypeLivraison />
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
                    <th>Libelle</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {TypeLivraisonJSX}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default TypeLivraisons;
