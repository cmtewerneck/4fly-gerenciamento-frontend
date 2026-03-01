import { Entity } from "app/shared/models/entity.model";

export interface AeronaveSocio extends Entity{
    nome: string;
    aeronaveId: string;
    percentual: number;
}

export interface AeronaveDropdown{
    matricula: string;
    id: string;
}

export interface AeronaveSocioResultado{
    nome: string;
    percentual: number;
    id: string;
}