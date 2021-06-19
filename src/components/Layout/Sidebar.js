/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  const handleChangeTitle = (title) => {
    props.handleTitle(title);
    console.log("change title");
    console.log(title);
  };

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/dashboard"
            onClick={() => handleChangeTitle("Dashboard")} 
            className="brand-link">
        <img
          src="dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: 8 }}
        />
        <span className="brand-text font-weight-light">Colis DDD</span>
      </Link>

      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <Link to="#" className="d-block">
              CCN Solutions
            </Link>
          </div>
        </div>

        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw"></i>
              </button>
            </div>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item menu-open">
              <Link
                to="/dashboard"
                onClick={() => handleChangeTitle("Dashboard")}
                className="nav-link active"
              >
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Dashboard
                  {/* <i className="right fas fa-angle-left"></i> */}
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="pages/widgets.html" className="nav-link">
                <i className="nav-icon fas fa-th"></i>
                <p>
                  Notifications
                  <span className="right badge badge-danger">New</span>
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i className="nav-icon fas fa-chart-pie"></i>
                <p>
                  Gestion des colis
                  <i className="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/touslescolis" 
                        onClick={() => handleChangeTitle("Tous les colis")}
                        className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Liste des colis</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/nonReceptionne" 
                        onClick={() => handleChangeTitle("Les colis non réceptionné")}
                        className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Colis non réceptionné</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/receptionne"
                        onClick={() => handleChangeTitle("Les colis réceptionné")}
                         className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Colis réceptionnés</p>
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link to="pages/charts/inline.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Colis livrés</p>
                  </Link>
                </li> */}
              </ul>
            </li>

            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i className="nav-icon fas fa-tree"></i>
                <p>
                  Gestion des livraisons
                  <i className="fas fa-angle-left right"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/livraisons" 
                        onClick={() => handleChangeTitle("Toutes les livraisons")}
                        className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Toutes les livraisons</p>
                  </Link>
                </li>
                <li className="nav-item"> 
                  <Link to="/creerLivraion"
                        onClick={() => handleChangeTitle("Les colis déja réceptionnés")} 
                        className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Créer une livraison</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/nonlivraisons"
                        onClick={() => handleChangeTitle("Les livraisons non livrées")} 
                        className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Non livrées</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/dejalivraisons"
                        onClick={() => handleChangeTitle("Les livraisons déja livrées")} 
                        className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Déja livrées</p>
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link to="pages/UI/sliders.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Annulées</p>
                  </Link>
                </li> */}
              </ul>
            </li>

            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i className="nav-icon fas fa-edit"></i>
                <p>
                  Gestion des clients
                  <i className="fas fa-angle-left right"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/clients"
                        onClick={() => handleChangeTitle("Les clients")} className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Tous les clients</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i className="nav-icon fas fa-tools"></i>
                <p>
                  Administration
                  <i className="fas fa-angle-left right"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link
                    to="/agences"
                    className="nav-link"
                    onClick={() => handleChangeTitle("Les agences")}
                  >
                    <i className="far fa-dot-circle nav-icon"></i>
                    <p>Agences</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/moyenTransports"
                    className="nav-link"
                    onClick={() => handleChangeTitle("Les moyens de transport")}
                  >
                    <i className="far fa-dot-circle nav-icon"></i>
                    <p>Moyens de transport</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className="nav-link">
                    <i className="far fa-dot-circle nav-icon"></i>
                    <p>
                      Profils utilisateurs
                      <i className="fas fa-angle-left right"></i>
                    </p>
                  </Link>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/roles"
                        onClick={() => handleChangeTitle("Les rôles")}
                         className="nav-link">
                        <i className="far fa-circle nav-icon"></i>
                        <p>Les rôles</p>
                      </Link>
                    </li>
                    {/* <li className="nav-item">
                      <a href="pages/tables/data.html" className="nav-link">
                        <i className="far fa-circle nav-icon"></i>
                        <p>Les privilèges</p>
                      </a>
                    </li> */}
                    <li className="nav-item">
                      <a href="/users"
                        onClick={() => handleChangeTitle("Les utilisateurs")} className="nav-link">
                        <i className="far fa-circle nav-icon"></i>
                        <p>Les utilisateurs</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link to="#" className="nav-link">
                    <i className="far fa-dot-circle nav-icon"></i>
                    <p>
                      Voyages & Région
                      <i className="fas fa-angle-left right"></i>
                    </p>
                  </Link>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/prixVoyageRegions"
                        onClick={() => handleChangeTitle("Les prix des voyages entre régions")} 
                        className="nav-link"                      
                      >
                        <i className="far fa-circle nav-icon"></i>
                        <p>Prix voyages</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/regions"
                        className="nav-link"
                        onClick={() => handleChangeTitle("Les régions")}
                      >
                        <i className="far fa-circle nav-icon"></i>
                        <p>Régions</p>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link
                    to="/typeColis"
                    className="nav-link"
                    onClick={() => handleChangeTitle("Les types de colis")}
                  >
                    <i className="far fa-dot-circle nav-icon"></i>
                    <p>Types de colis</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/typeLivraisons"
                    className="nav-link"
                    onClick={() => handleChangeTitle("Les types de livraison")}
                  >
                    <i className="far fa-dot-circle nav-icon"></i>
                    <p>Types de livraison</p>
                  </Link>
                </li>
              </ul>
            </li>            
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
