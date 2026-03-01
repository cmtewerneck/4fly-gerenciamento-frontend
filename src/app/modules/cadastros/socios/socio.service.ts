import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { AeronaveSocio } from "./socio.model";
import { QueryInfo } from "app/shared/models/queryInfo.model";
import { Observable } from "rxjs";
import { PagedResult } from "app/shared/models/pagedResult.model";
import { ManutencaoQuery } from "app/shared/models/manutencaoQuery.model";

@Injectable({
    providedIn: 'root'
})
export class AeronaveSocioService extends BaseApiService<AeronaveSocio>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'aeronaves_socios');
    }

    listById(query: QueryInfo, aeronaveId: string): Observable<PagedResult<AeronaveSocio>> {
        return this.api.post(`${this.path}/listByAeronaveId/` + aeronaveId, query, {});
    }
}