import { Entity } from "app/shared/models/entity.model";

export interface AeronaveVoo extends Entity{
    data: Date;
    descricao: string;
    horimetroInicial: number;
    horimetroFinal: number;
    totalHorimetro: number;
    empresa: string;
    piloto: string;
    valor: number;
    statusPgtoVoo: string;
    statusPgtoPiloto: string;
    aeronaveId: string;
}

export interface AeronaveDropdown{
    matricula: string;
    id: string;
}

export interface TripulantesDropdown{
    nome: string;
}