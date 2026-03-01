import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { AeronaveResultado } from "./resultado.model";
import { QueryInfo } from "app/shared/models/queryInfo.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AeronaveResultadoService extends BaseApiService<AeronaveResultado>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'aeronaves_resultados');
    }

    listByAeronaveId(dataInicio: string, dataTermino: string, aeronaveId: string): Observable<AeronaveResultado> {
        return this.api.get(`${this.path}` + '/' + dataInicio + '/' + dataTermino + '/' + aeronaveId);
    }
}