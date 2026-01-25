import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'situacaoVendedor'
})
export class SituacaoVendedorPipe implements PipeTransform {

  transform(situacao: boolean, args?: any): string {

    if(situacao == true){
      return "Ativo"
    } else if(situacao == false){
      return "Inativo"
    }
  }
}