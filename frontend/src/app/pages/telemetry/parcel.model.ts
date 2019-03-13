import {LatLng} from '../../interfaces/lat-lng.interface';

export class ParcelModel {

    id: number;
    name: string;
    cadasterNumber: string;
    landWorthinessPoints: number;
    area: number;
    irrigated: boolean;
    description: string;

    coordinates: [number, number][];

    paths: LatLng[];
    fillColor: string;
    center: LatLng;
    icon: string;

    cropName: string;
    cropNameRo: string;
    cropNameRu: string;

    plantedAt: Date;
    rowsOnParcel: number;
    plantsOnRow: number;
    spaceBetweenRows: number;
    spaceBetweenPlants: number;

    lastWorkType: string;
    lastWorkTypeRo: string;
    lastWorkTypeRu: string;

    lastWorkDate: Date;
}
