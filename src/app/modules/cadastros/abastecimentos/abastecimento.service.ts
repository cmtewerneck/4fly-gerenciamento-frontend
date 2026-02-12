import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { AbastecimentoResultado, AeronaveAbastecimento } from "./abastecimento.model";
import { QueryInfo } from "app/shared/models/queryInfo.model";
import { Observable } from "rxjs";
import { PagedResult } from "app/shared/models/pagedResult.model";
import { AbastecimentoQuery } from "app/shared/models/abastecimentoQuery.model";

@Injectable({
    providedIn: 'root'
})
export class AeronaveAbastecimentoService extends BaseApiService<AeronaveAbastecimento>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'aeronaves_abastecimentos');
    }

    listById(query: QueryInfo, aeronaveId: string): Observable<PagedResult<AeronaveAbastecimento>> {
        return this.api.post(`${this.path}/listByAeronaveId/` + aeronaveId, query, {});
    }

    getResultados(entity: AbastecimentoQuery): Observable<AbastecimentoResultado> {
        return this.api.post(`${this.path}/resultados`, entity, {});
    }
}