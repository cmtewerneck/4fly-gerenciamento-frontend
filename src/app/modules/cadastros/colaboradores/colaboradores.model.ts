import { Entity } from "app/shared/models/entity.model";

export interface Colaborador extends Entity{
    nome: string;
    cargo: string;
    cpf: string;
    telefone: string;
    admissao?: Date;
    demissao?: Date;
    salario?: number;
    validadeFamiliarizacaoSGSO?: Date;
    validadeConscientizacaoAvsec?: Date;
    validadeDDA?: Date;
    validadeApam?: Date;
    validadeCredencial?: Date;
    imagem: string;
    imagemUpload: string;
}
