import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { AeronaveOutrasDespesas, OutrasDespesasResultado } from "./outrasDespesas.model";
import { QueryInfo } from "app/shared/models/queryInfo.model";
import { Observable } from "rxjs";
import { PagedResult } from "app/shared/models/pagedResult.model";
import { ManutencaoQuery } from "app/shared/models/manutencaoQuery.model";
import { OutrasDespesasQuery } from "app/shared/models/outrasDespesasQuery.model";

@Injectable({
    providedIn: 'root'
})
export class AeronaveOutrasDespesasService extends BaseApiService<AeronaveOutrasDespesas>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'aeronaves_outras_despesas');
    }

    listById(query: QueryInfo, aeronaveId: string): Observable<PagedResult<AeronaveOutrasDespesas>> {
        return this.api.post(`${this.path}/listByAeronaveId/` + aeronaveId, query, {});
    }

    getResultados(entity: OutrasDespesasQuery): Observable<OutrasDespesasResultado> {
        return this.api.post(`${this.path}/resultados`, entity, {});
    }
}