import { Injectable } from '@angular/core';
import { Estoques } from 'src/app/core/estoques';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstoquesService extends BaseService<Estoques> {

  constructor(http: HttpClient) {
    super(http, Rotas.ESTOQUES);
  }


  getFilter(idMaterial: string|number, idPrograma: string|number, idProjeto: string|number) {
    idMaterial = idMaterial || '';
    idPrograma = idPrograma || '';
    idProjeto = idProjeto || '';

    return this.http.get(Rotas.ESTOQUES + 'filter', { params: {
        material: `${idMaterial}` ,
        programa: `${idPrograma}` ,
        projeto: `${idProjeto}`
      }
    });
  }

}
