import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuncoesUteisService {

  constructor() { }


  /**
   * Retorna um array com valores distintos.
   * 
   * @param array 
   * @param nomeCampoDistinct 
   */
  arrayDistinct(array:any[], nomeCampoDistinct:string): any[] {
    const uniqueCombo: any[] = [];
    const distinctCombo: any[] = [];
    for( let i = 0; i < array.length; i++ ){
      if( !uniqueCombo[array[i][nomeCampoDistinct]]){
        distinctCombo.push(array[i]);
        uniqueCombo[array[i][nomeCampoDistinct]] = 1;
      }
    }
    return distinctCombo;
  }


}
