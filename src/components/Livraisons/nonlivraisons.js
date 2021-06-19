import React, { useState, useEffect } from "react";
import { ApplicationSettings } from "../../configuration/application-settings";
import Livraison from './Livraison';
import { useParams } from "react-router-dom";

const NonLivraisons = (props) => {
  const [data, setData] = useState({loading: false, repos: [] });
  
  let { etat } = useParams();

  useEffect(() => {
    console.log("Liste des Livraisons")
    fetch(`${ApplicationSettings.API_URL}Livraisons`)
      .then((res) => res.json())
      .then((Livraisons) => {
        console.log(Livraisons)
        setData({ loading: true, repos: Livraisons });
      });
  }, [])


    return (
      <div className="row">
        <div className="col-12">
        {
          data.repos.length >0 && 
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Liste des Livraisons</h3>  
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
                    {/* <AddLivraison /> */}
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
                    <th>Date d'envoie du colis</th>
                    <th>Région de départ</th>
                    <th>Région d'arrivée</th>
                    <th>Client envoyeur</th>
                    <th>Client récepteur</th>
                    <th>Livreur</th>
                    <th>Moyens de transport</th>
                    <th>Type de livraison</th>
                    <th>Etat de la livraison</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {
                      data.loading?
                      (
                        data.repos.map((elt) => {
                            if(!elt.etatLivraison){
                                return (<Livraison key={elt.id} livraison={elt} { ...props } />)
                            }
                        })                         
                        
                      )
                      : ('')
                    }
                </tbody>
              </table>
            </div>
          </div>
          }
          {data.repos.length === 0 &&
            <h4 style={{textAlign: "center"}}>Il n'y a pas encore de livraison disponible dans la base de donnée</h4> 
          }
        </div>
      </div>
    );
};

export default NonLivraisons;
