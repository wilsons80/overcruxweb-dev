import { Component, OnInit, Input } from '@angular/core';
import { ParceriasProjeto } from 'src/app/core/parcerias-projeto';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { Empresa } from 'src/app/core/empresa';

@Component({
  selector: 'dados-parceiro',
  templateUrl: './dados-parceiro.component.html',
  styleUrls: ['./dados-parceiro.component.css']
})
export class DadosParceiroComponent implements OnInit {

  @Input() parceriasProjeto:ParceriasProjeto
  empresas: Empresa[];

  constructor(
    private empresaService:EmpresaService
  ) {
    
    

  }

  ngOnInit() {

    this.empresaService.getAll().subscribe((empresas: Empresa[]) => this.empresas = empresas);
  }

}
