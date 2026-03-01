import { Entity } from "app/shared/models/entity.model";

export interface AeronaveResultado extends Entity{
    voosTotal: number;
    custoVoosTotal: number;
    abastecimentosTotal: number;
    tarifasTotal: number;
    frellancerTotal: number;
    manutencoesTotal: number;
    overhallTotal: number;
    outrasDespesasTotal: number;
    voosPagar: number;
    abastecimentosPagar: number;
    tarifasPagar: number;
    freelancersPagar: number;
    manutencoesPagar: number;
    outrasDespesasPagar: number;
}