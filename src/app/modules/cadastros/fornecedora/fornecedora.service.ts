import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "app/shared/services/baseApi";
import { BaseApiService } from "app/shared/services/baseApiService";
import { FornecedoraAbastecimento } from "./fornecedora.model";
import { Observable } from "rxjs";
import { VendedoresDropdown } from "../camera/cameras.model";
import { FornecedorasDropdown } from "../abastecimentos/abastecimento.model";

@Injectable({
    providedIn: 'root'
})
export class FornecedoraAbastecimentoService extends BaseApiService<FornecedoraAbastecimento>
{
    constructor(api: BaseApi, private http: HttpClient) {
        super(api, 'fornecedores-abastecimentos');
    }

    getAllNomes(): Observable<FornecedorasDropdown[]> {
        return this.api.get(this.path);
    }
}