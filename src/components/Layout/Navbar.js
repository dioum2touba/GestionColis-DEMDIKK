/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginConsts } from "../login/authentication/login-consts";
import { AuthenticationService } from './../login/authentication/authentication-service';

const Navbar = () => {
  const [data, setData] = useState({loading: false, repos: {}});
  const [connected, setConnected] = useState(AuthenticationService.isAuthenticated());

  useEffect(() => {
    if(connected) {
        var userNoFormated = window.localStorage.getItem(LoginConsts.USERNAME);
        // console.log("Navbar useEffect")
        // console.log(userNoFormated)
        var user = JSON.parse(userNoFormated)
        if(user.data.roles) {
          setConnected(true);
          setData({ loading: true, repos: user.data });
        }
    }
  }, [])

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars"></i>
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="index3.html" className="nav-link">
            Accueil
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="#" className="nav-link">
            Statistiques
          </a>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="navbar-search"
            href="#"
            role="button"
          >
            <i className="fas fa-search"></i>
          </a>
          <div className="navbar-search-block">
            <form className="form-inline">
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-navbar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="input-group-append">
                  <button className="btn btn-navbar" type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                  <button
                    className="btn btn-navbar"
                    type="button"
                    data-widget="navbar-search"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>

        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <i className="far fa-comments"></i>
            <span className="badge badge-danger navbar-badge">3</span>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <a href="#" className="dropdown-item">
              <div className="media">
                <img
                  src="dist/img/user1-128x128.jpg"
                  alt="User Avatar"
                  className="img-size-50 mr-3 img-circle"
                />
                <div className="media-body">
                  <h3 className="dropdown-item-title">
                    Brad Diesel
                    <span className="float-right text-sm text-danger">
                      <i className="fas fa-star"></i>
                    </span>
                  </h3>
                  <p className="text-sm">Call me whenever you can...</p>
                  <p className="text-sm text-muted">
                    <i className="far fa-clock mr-1"></i> 4 Hours Ago
                  </p>
                </div>
              </div>
            </a>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item">
              <div className="media">
                <img
                  src="dist/img/user8-128x128.jpg"
                  alt="User Avatar"
                  className="img-size-50 img-circle mr-3"
                />
                <div className="media-body">
                  <h3 className="dropdown-item-title">
                    John Pierce
                    <span className="float-right text-sm text-muted">
                      <i className="fas fa-star"></i>
                    </span>
                  </h3>
                  <p className="text-sm">I got your message bro</p>
                  <p className="text-sm text-muted">
                    <i className="far fa-clock mr-1"></i> 4 Hours Ago
                  </p>
                </div>
              </div>
            </a>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item">
              <div className="media">
                <img
                  src="dist/img/user3-128x128.jpg"
                  alt="User Avatar"
                  className="img-size-50 img-circle mr-3"
                />
                <div className="media-body">
                  <h3 className="dropdown-item-title">
                    Nora Silvester
                    <span className="float-right text-sm text-warning">
                      <i className="fas fa-star"></i>
                    </span>
                  </h3>
                  <p className="text-sm">The subject goes here</p>
                  <p className="text-sm text-muted">
                    <i className="far fa-clock mr-1"></i> 4 Hours Ago
                  </p>
                </div>
              </div>
            </a>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item dropdown-footer">
              See All Messages
            </a>
          </div>
        </li>
        
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <i className="far fa-bell"></i>
            <span className="badge badge-warning navbar-badge">15</span>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header">
              15 Notifications
            </span>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item">
              <i className="fas fa-envelope mr-2"></i> 4 new messages
              <span className="float-right text-muted text-sm">3 mins</span>
            </a>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item">
              <i className="fas fa-users mr-2"></i> 8 friend requests
              <span className="float-right text-muted text-sm">12 hours</span>
            </a>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item">
              <i className="fas fa-file mr-2"></i> 3 new reports
              <span className="float-right text-muted text-sm">2 days</span>
            </a>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item dropdown-footer">
              See All Notifications
            </a>
          </div>
        </li>

        {
          data.loading? 
          (
              <li className="user user-menu" style={{ marginTop: "3%" }}>
                  {/* <!-- Menu Toggle Button --> */}
                  <Link to="#" data-toggle="dropdown">
                      {/* <!-- The user image in the navbar--> */}
                      <img src={"../../images/user2-160x160.jpg"} className="user-image" alt="User Image" />
                      <span className="hidden-xs"> { data.repos.userName }  </span>
                  </Link>
                  {/* <ul className="dropdown-menu" style={{ marginLeft: "-150%" }}>
                      <li className="user-header">
                          <img src={"../../images/user2-160x160.jpg"} className="img-circle" alt="User Image" />
                          <p> { data.repos.userName } </p>
                          <small style={{color: "white"}}> { data.repos.roles[0] } </small>
                      </li>
                      <li className="user-body">
                          <div className="row">
                              <div className="col-xs-4 text-center" style={{ textAlign: "center", marginLeft: "19%", fontSize: "20px" }}>
                                  <small> { data.repos.email } </small>
                              </div>
                              <div className="col-xs-4 text-center">
                                  <small></small>
                              </div>
                          </div>
                      </li>                  
                  </ul> */}
              </li>
            
          ) : ("")
        }
        {    
          connected?
          (              
            <li className="user-body">
                <div className="text-center">
                  <button 
                    type="button" 
                    style={{margin: "5px", padding: "5px", width: "95%"}} 
                    className="btn btn-outline-danger btn-sm btn-block" 
                    onClick={() => AuthenticationService.logOff()}
                  >
                    <i className="fas fa-sign-out-alt"></i>
                  </button>
                </div>
            </li>
          ) : ("")
        }
      </ul>
    </nav>
  );
};

export default Navbar;