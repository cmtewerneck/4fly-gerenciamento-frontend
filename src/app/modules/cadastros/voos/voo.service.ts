import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { AeronaveVoo} from "./voo.model";
import { QueryInfo } from "app/shared/models/queryInfo.model";
import { Observable } from "rxjs";
import { PagedResult } from "app/shared/models/pagedResult.model";
import { TarifaQuery } from "app/shared/models/tarifaQuery.model";

@Injectable({
    providedIn: 'root'
})
export class AeronaveVooService extends BaseApiService<AeronaveVoo>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'aeronaves_voos');
    }

    listById(query: QueryInfo, aeronaveId: string): Observable<PagedResult<AeronaveVoo>> {
        return this.api.post(`${this.path}/listByAeronaveId/` + aeronaveId, query, {});
    }

    sociosDevidos(socioNome: string, aeronaveId: string): Observable<number> {
        return this.api.get(`${this.path}/listSocioDevidos/` + socioNome + '/' + aeronaveId);
    }
}