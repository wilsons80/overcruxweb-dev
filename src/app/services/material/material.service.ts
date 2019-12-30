import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseService } from '../base/base.service';



import { Rotas } from 'src/app/core/rotas';
import { Material } from 'src/app/core/material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService extends BaseService<Material> {

  constructor(http: HttpClient) {
    super(http, Rotas.MATERIAIS);
  }

}