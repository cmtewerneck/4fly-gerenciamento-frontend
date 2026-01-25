import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formaPagamento'
})
export class FormaPagamentoPipe implements PipeTransform {

  transform(forma: number, args?: any): string {

    if(forma == 1){
      return "Cartão"
    } else if(forma == 2){
      return "PIX"
    } else if(forma == 3){
      return "Transferência"
    } else if(forma == 4){
      return "Dinheiro"
    } else if(forma == 5){
      return "Paypal"
    }
  }
}