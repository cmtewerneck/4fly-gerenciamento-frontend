import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Tripulante } from "./tripulantes.model";
import { Observable } from "rxjs";
import { TripulantesDropdown } from "../voos/voo.model";

@Injectable({
    providedIn: 'root'
})
export class TripulanteService extends BaseApiService<Tripulante>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'tripulantes');
    }

    getAllNomes(): Observable<TripulantesDropdown[]> {
        return this.api.get(this.path);
    }
}