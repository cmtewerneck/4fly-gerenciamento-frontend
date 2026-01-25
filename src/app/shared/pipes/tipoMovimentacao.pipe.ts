import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoMovimentacao'
})
export class TipoMovimentacaoPipe implements PipeTransform {

  transform(tipo: number, args?: any): string {

    if(tipo == 1){
      return "Entrada"
    } else if(tipo == 2){
      return "Saída"
    } 
  }
}