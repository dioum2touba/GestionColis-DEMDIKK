import { Region } from '../../Regions/models/Region';

export interface Agence {
    id: number;
    nomAgence: string;
    adresse: string;
    codeAgence: string;
    pays: string;
    longitude: string;
    latitude: string;
    telephone: string;
    heureDemarrage: string;
    heureFermeture: string;
    regionId: number;
    region: Region;
}