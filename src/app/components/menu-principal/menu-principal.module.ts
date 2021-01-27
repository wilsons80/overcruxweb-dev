import { TempoSessaoModule } from './../tempo-sessao/tempo-sessao.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';


import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';


import { RouterModule } from '@angular/router';
import { MenuConfiguracoesComponent } from './menu-configuracoes/menu-configuracoes.component';
import { MenuPrincipalComponent } from './menu-principal.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { MenuOrganizacaoInternaComponent } from './menu-organizacao-interna/menu-organizacao-interna.component';
import { MenuEstrategicoComponent } from './menu-estrategico/menu-estrategico.component';
import { MenuGestaoPessoasComponent } from './menu-gestao-pessoas/menu-gestao-pessoas.component';
import { MenuSecretariaComponent } from './menu-secretaria/menu-secretaria.component';
import { MenuSapComponent } from './menu-sap/menu-sap.component';
import { MenuPedagogicoComponent } from './menu-pedagogico/menu-pedagogico.component';
import { TbReferenciaGestaoPessoasComponent } from './menu-gestao-pessoas/tb-referencia-gestao-pessoas/tb-referencia-gestao-pessoas.component';
import { TbReferenciaSecretariaComponent } from './menu-secretaria/tb-referencia-secretaria/tb-referencia-secretaria.component';
import { TbReferenciaSapComponent } from './menu-sap/tb-referencia-sap/tb-referencia-sap.component';
import { TbReferenciaOrganizacaoInternaComponent } from './menu-organizacao-interna/tb-referencia-organizacao-interna/tb-referencia-organizacao-interna.component';
import { MenuProgramaProjetoComponent } from './menu-programa-projeto/menu-programa-projeto.component';
import { TbReferenciaEstrategicoComponent } from './menu-estrategico/tb-referencia-estrategico/tb-referencia-estrategico.component';
import { SubMenuGestaoDesempenhoComponent } from './menu-gestao-pessoas/sub-menu-gestao-desempenho/sub-menu-gestao-desempenho.component';
import { MenuGestaoFinanceiraComponent } from './menu-gestao-financeira/menu-gestao-financeira.component';
import { MenuAtendimentoMultidisciplinarComponent } from './menu-atendimento-multidisciplinar/menu-atendimento-multidisciplinar.component';
import { SubMenuDiagnosticoMultidisciplinarComponent } from './menu-atendimento-multidisciplinar/sub-menu-diagnostico-multidisciplinar/sub-menu-diagnostico-multidisciplinar.component';
import { SubMenuPlanejamentoAtividadesComponent } from './menu-atendimento-multidisciplinar/sub-menu-planejamento-atividades/sub-menu-planejamento-atividades.component';
import { TbReferenciaFinanceiroComponent } from './menu-gestao-financeira/tb-referencia-financeiro/tb-referencia-financeiro.component';
import { MenuMateriaisComponent } from './menu-materiais/menu-materiais.component';
import { TbReferenciaPedagogicoComponent } from './menu-pedagogico/tb-referencia-pedagogico/tb-referencia-pedagogico.component';
import { SubMenuRelatorioComponent } from './menu-secretaria/sub-menu-relatorio/sub-menu-relatorio.component';
import { TbProgramasProjetosComponent } from './menu-programa-projeto/tb-referencia-programa-projeto/tb-referencia-programa-projeto.component';
import { SubMenuRelatorioDpComponent } from './menu-gestao-pessoas/sub-menu-relatorio/sub-menu-relatorio-dp.component';
import { SubMenuRelatorioFinanceiroComponent } from './menu-gestao-financeira/sub-menu-relatorio/sub-menu-relatorio-financeiro.component';



@NgModule({
  declarations: [
    MenuPrincipalComponent,
    MenuConfiguracoesComponent,
    SubMenuComponent,
    MenuOrganizacaoInternaComponent,
    MenuEstrategicoComponent,
    MenuGestaoPessoasComponent,
    MenuSecretariaComponent,
    MenuSapComponent,
    MenuPedagogicoComponent,
    TbReferenciaGestaoPessoasComponent,
    TbReferenciaSecretariaComponent,
    TbReferenciaSapComponent,
    TbReferenciaOrganizacaoInternaComponent,
    TbReferenciaFinanceiroComponent,
    MenuProgramaProjetoComponent,
    TbReferenciaEstrategicoComponent,
    SubMenuGestaoDesempenhoComponent,
    MenuGestaoFinanceiraComponent,
    MenuAtendimentoMultidisciplinarComponent,
    SubMenuDiagnosticoMultidisciplinarComponent,
    SubMenuPlanejamentoAtividadesComponent,
    MenuMateriaisComponent,
    TbReferenciaPedagogicoComponent,
    TbProgramasProjetosComponent,
    SubMenuRelatorioComponent,
    SubMenuRelatorioDpComponent,
    SubMenuRelatorioFinanceiroComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    RouterModule,
    MatTooltipModule,
    TempoSessaoModule,
    MatToolbarModule,
  ],
  exports: [MenuPrincipalComponent]
})
export class MenuPrincipalModule { }
