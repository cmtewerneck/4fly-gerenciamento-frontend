import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'situacaoMovimentacao'
})
export class SituacaoMovimentacaoPipe implements PipeTransform {

  transform(situacao: boolean, args?: any): string {

    if(situacao == true){
      return "Pago"
    } else if(situacao == false){
      return "Devido"
    }
  }
}