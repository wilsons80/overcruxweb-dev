import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BeneficioSocial } from 'src/app/core/beneficio-social';
import { Cargo } from 'src/app/core/cargo';
import { Empresa } from 'src/app/core/empresa';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from '../base/base.service';


const rootPath = 'api/cargos/';

@Injectable({
  providedIn: 'root'
})
export class BeneficioSocialService  extends BaseService<BeneficioSocial> {

  constructor(http: HttpClient) {
    super(http, Rotas.BENEFICIOS_SOCIAIS);
  }
}
