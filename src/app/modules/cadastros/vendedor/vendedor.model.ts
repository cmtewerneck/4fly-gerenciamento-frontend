import { Entity } from "app/shared/models/entity.model";

export interface Vendedor extends Entity{
    nome: string;
    ativo: boolean;
}
