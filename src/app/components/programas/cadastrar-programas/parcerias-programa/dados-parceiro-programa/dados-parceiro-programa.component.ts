import { Component, OnInit, Input } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { Empresa } from 'src/app/core/empresa';
import { ParceriasPrograma } from 'src/app/core/parcerias-programa';
import {ControlContainer, NgForm} from '@angular/forms';
import { AditivoParceriaPrograma } from 'src/app/core/aditivo-parceria-programa';

@Component({
  selector: 'dados-parceiro-programa',
  templateUrl: './dados-parceiro-programa.component.html',
  styleUrls: ['./dados-parceiro-programa.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DadosParceiroProgramaComponent implements OnInit {

  @Input() parceriasPrograma:ParceriasPrograma;
  empresas: Empresa[];

  constructor(

    private empresaService:EmpresaService
  ) {
    
  }

  ngOnInit() {
    this.empresaService.getAll().subscribe((empresas: Empresa[]) => this.empresas = empresas);
  }

  adicionarAditivo(parceriasPrograma:ParceriasPrograma){
    parceriasPrograma.aditivosParceriasProgramas.push(new AditivoParceriaPrograma());
  }

  deletarAditivo(parceriasPrograma:ParceriasPrograma, aditivo:AditivoParceriaPrograma){
    let index = parceriasPrograma.aditivosParceriasProgramas.indexOf(aditivo);
    parceriasPrograma.aditivosParceriasProgramas.splice(index,1);
  }


}
