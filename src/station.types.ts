export type FuelType = 'D' | '95' | '98';

export interface IFuelPrice {
    id: number;
    type: FuelType;
    price: number;
    curreny: string;
    lastUpdated: number; // unixTimeStamp
}

export interface IStation {
    extras: unknown;
    id: number;
    latitude: string;
    location: string;
    longitude: string;
    name: string;
    pending: number;
    pictureUrl: string;
    stationDetails: IFuelPrice[]
    stationType: number
}
