import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Tripulante } from "./tripulantes.model";

@Injectable({
    providedIn: 'root'
})
export class TripulanteService extends BaseApiService<Tripulante>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'tripulantes');
    }
}