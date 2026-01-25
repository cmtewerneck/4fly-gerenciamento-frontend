import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Aeronave } from "./aeronave.model";

@Injectable({
    providedIn: 'root'
})
export class AeronaveService extends BaseApiService<Aeronave>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'aeronaves');
    }
}