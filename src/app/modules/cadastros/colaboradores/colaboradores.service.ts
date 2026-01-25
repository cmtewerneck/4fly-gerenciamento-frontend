import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { Colaborador } from "./colaboradores.model";

@Injectable({
    providedIn: 'root'
})
export class ColaboradorService extends BaseApiService<Colaborador>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'colaboradores');
    }
}