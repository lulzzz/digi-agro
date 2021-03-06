import {Injectable} from '@angular/core';
import {MapEventModel} from '../pages/telemetry/map-events/map-event.model';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class MapEventService {

    private api: string = environment.apiUrl + '/map-event';

    constructor(private http: HttpClient) {
    }

    find(): Observable<MapEventModel[]> {
        return this.http.get<MapEventModel[]>(this.api + '/');
    }

    save(model: MapEventModel): Observable<MapEventModel> {
        return this.http.post<MapEventModel>(this.api + '/', model);
    }

    remove(model: MapEventModel): Observable<void> {
        return this.http.delete<void>(this.api + '/' + model.id);
    }

    update(id, field: any, value: any): Observable<void> {
        const updateModel = {
            id: id,
            field: field,
            value: value
        };
        return this.http.post<void>(this.api + '/update', updateModel);
    }
}
