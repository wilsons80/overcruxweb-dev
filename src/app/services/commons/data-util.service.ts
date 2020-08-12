import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataUtilService {

  constructor() { }


  /**
   * Transforma a string de data retornada pela extensão em um objeto Date do javascript.
   * @param {any} date O formato esperado dessa string é "dd/MM/yyyy HH:mm:ss".
   * @returns {Date} objeto Date configurado com a data transformada da string.
   */
  private parseDate(date: string): Date {
    const dataTruncada = this.getDataTruncata(date);

    const formatoISO = date.includes('T');
    const slicedDate = formatoISO ? date.split('T') : date.split(' ');
    
    if(slicedDate[1] && slicedDate[1].length > 0) {
      const hourMinuteSecond: any[] = slicedDate[1].split(':');
      dataTruncada.setHours(hourMinuteSecond[0]);
      dataTruncada.setMinutes(hourMinuteSecond[1]);
      dataTruncada.setSeconds(hourMinuteSecond[2]);
    } 

    return dataTruncada;
  }


  public getDataTruncata(date): Date {
    if(date === null || date === undefined) return null;

    let dataString = date;

    if(date && date instanceof Date) {
      dataString = date.toISOString();
    }

    const formatoISO = dataString.includes('T');    
    const slicedDate = formatoISO ? dataString.split('T') : dataString.split(' ');
    const dayMothYear:any[] = formatoISO ? slicedDate[0].split('-') : slicedDate[0].split('/');

    const ano = dayMothYear[formatoISO ? 0 : 2];
    const mes = dayMothYear[1] - 1;
    const dia = dayMothYear[formatoISO ? 2 : 0];

    const dataTruncada = new Date(ano, mes, dia);
    return dataTruncada;
  }


  public getValorByDate(valor): Date {
    if(valor === null || valor === undefined) return null;

    if(valor && valor instanceof Date) {
      return this.parseDate(valor.toLocaleDateString());
    }

    if(valor && typeof valor === 'string') {
      return this.parseDate(valor);
    }
   
  }

  public isEntreDatasTruncada(dataInicio: Date, dataFim: Date, dataPesquisaInicio: Date, dataPesquisaFim: Date): boolean {
    const p_dataPesqIni = this.getDataTruncata(dataPesquisaInicio);
    const p_dataPesqFim = this.getDataTruncata(dataPesquisaFim);
    const p_dataIni     = this.getDataTruncata(dataInicio);
    const p_dataFim     = this.getDataTruncata(dataFim);
    return this.entreDatas(p_dataIni, p_dataFim, p_dataPesqIni, p_dataPesqFim);
  }

  public isEntreDatas(dataInicio: Date, dataFim: Date, dataPesquisaInicio: Date, dataPesquisaFim: Date): boolean {
    const p_dataPesqIni = this.getValorByDate(dataPesquisaInicio);
    const p_dataPesqFim = this.getValorByDate(dataPesquisaFim);
    const p_dataIni     = this.getValorByDate(dataInicio);
    const p_dataFim     = this.getValorByDate(dataFim);
    return this.entreDatas(p_dataIni, p_dataFim, p_dataPesqIni, p_dataPesqFim);
  }

  private entreDatas(dataInicio: Date, dataFim: Date, dataPesquisaInicio: Date, dataPesquisaFim: Date): boolean {
    return this.isVigente(dataInicio, dataPesquisaInicio, dataPesquisaFim) || this.isVigente(dataFim, dataPesquisaInicio, dataPesquisaFim);
  }


  private isVigente(dataReferencia: Date, dataIni: Date, dataFim: Date): boolean {
    if(!dataReferencia){ dataReferencia = this.getDataTruncata(new Date()); }
    if(!dataFim){ dataFim = this.getDataTruncata(new Date());}

    if(this.getValorByDate(dataReferencia).getTime() >= this.getValorByDate(dataIni).getTime()
       &&
       this.getValorByDate(dataReferencia).getTime() <= this.getValorByDate(dataFim).getTime()
       ) {
      return true;
    }

    return false;
  }

  
}
