import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusVoo'
})
export class StatusVooPipe implements PipeTransform {

  transform(status: number, args?: any): string {

    if(status == 1){
      return "Agendado"
    } else if(status == 2){
      return "Realizado"
    } else if(status == 3){
      return "No Show"
    } else if(status == 4){
      return "Cancelado"
    }
  }
}