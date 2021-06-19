import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Dashboard from '../components/dashboard/Dashboard';
import { LoginForm } from '../components/login/login-form';
import { AuthenticationService } from '../components/login/authentication/authentication-service';
import Agences from '../components/Agences/Agences';
import Regions from './../components/Regions/Regions';
import TypeColis from './../components/TypeColis/TypeColis';
import Colis from './../components/Colis/Colis';
import NonReceptionne from './../components/Colis/non-receptionne';
import Livraisons from './../components/Livraisons/Livraisons';
import CreerLivraion from './../components/Livraisons/creer-livraison';
import Receptionne from './../components/Colis/receptionne';
import Users from './../components/Users/Users';
import Clients from './../components/clients/Clients';
import Roles from './../components/Roles/Roles';
import PrixVoyageRegions from './../components/PrixVoyageRegion/PrixVoyageRegions';
import MoyenTransports from './../components/MoyenTransport/MoyenTransports';
import TypeLivraisons from './../components/TypeLivraison/TypeLivraisons';
import NonLivraisons from './../components/Livraisons/nonlivraisons';
import DejaLivraisons from './../components/Livraisons/dejalivraisons';

function App() {

  // function isAuthenticated(): boolean {
  //   return userService.isAuthenticated()
  // }

  function isAuthenticated(): boolean {
    return AuthenticationService.isAuthenticated()
  }

  const contentHome = isAuthenticated() ?
          (<Layout>
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/agences" component={Agences} />
              <Route path="/regions" component={Regions} />
              <Route path="/typeColis" component={TypeColis} />
              <Route path="/touslescolis" component={Colis} />
              <Route path="/touslescolis" component={Colis} />
              <Route path="/nonReceptionne" component={NonReceptionne} />
              <Route path="/livraisons" component={Livraisons} />
              <Route path="/nonlivraisons" component={NonLivraisons} />
              <Route path="/dejalivraisons" component={DejaLivraisons} />
              <Route path="/creerLivraion" component={CreerLivraion} />
              <Route path="/receptionne" component={Receptionne} />
              <Route path="/users" component={Users} />
              <Route path="/clients" component={Clients} />
              <Route path="/roles" component={Roles} />
              <Route path="/prixVoyageRegions" component={PrixVoyageRegions} />
              <Route path="/moyenTransports" component={MoyenTransports} />
              <Route path="/typeLivraisons" component={TypeLivraisons} />
              {/* <Route path="/500" component={InternalServer} />
              <Route path="*" component={NotFound} />
              <Route path="/ownerDetails/:id" component={OwnerDetails} /> */}
            </Switch>
          </Layout>) : (<Switch><Route path="/" exact component={LoginForm} /></Switch>)

  return (
    <BrowserRouter>
      { contentHome }
    </BrowserRouter>
  );
}

export default App;
