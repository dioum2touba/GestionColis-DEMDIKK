import { ClientSource } from './client-source';
import { ClientRecepteur} from './client-recepteur';

export interface RegisterNewColisRequest {
    createdBy: string,
    libelle: string,
    description: string,
    dateEnvoie: Date,
    regionRecepteurId: number,
    agenceRecepteurId: number,
    moyenTransportId: number,
    typeDeColisId: number,
    clientSource: ClientSource,
    clientRecepteur: ClientRecepteur,
    id: number
  }
  