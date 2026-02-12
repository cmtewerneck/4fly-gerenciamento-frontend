import { Entity } from "app/shared/models/entity.model";

export interface FornecedoraAbastecimento extends Entity{
    nome: string;
    cnpj: string;
    chavePix: string;
}
