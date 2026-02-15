import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { AeronaveTarifa, TarifaResultado } from "./manutencao.model";
import { QueryInfo } from "app/shared/models/queryInfo.model";
import { Observable } from "rxjs";
import { PagedResult } from "app/shared/models/pagedResult.model";
import { TarifaQuery } from "app/shared/models/tarifaQuery.model";

@Injectable({
    providedIn: 'root'
})
export class AeronaveTarifaService extends BaseApiService<AeronaveTarifa>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'aeronaves_tarifas');
    }

    listById(query: QueryInfo, aeronaveId: string): Observable<PagedResult<AeronaveTarifa>> {
        return this.api.post(`${this.path}/listByAeronaveId/` + aeronaveId, query, {});
    }

    getResultados(entity: TarifaQuery): Observable<TarifaResultado> {
            return this.api.post(`${this.path}/resultados`, entity, {});
        }
}