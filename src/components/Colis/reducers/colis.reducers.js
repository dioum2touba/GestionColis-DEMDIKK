import { colisConstants } from './colis.constants';
import { coliservice } from './../services/colis-service';

let colisFromDB = JSON.parse(coliservice.getAll());
const initialState = colisFromDB ? { loggedIn: true, colisFromDB } : {};

// export function colisStore(state = initialState, action) {
//     case colisConstants.ADD_COLIS: 
//         return {

//         }
// }