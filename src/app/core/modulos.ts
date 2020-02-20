import { Funcoes } from './funcoes';
export enum Modulos{
     ADMINISTRATIVO                  	    = 'ADMINISTRATIVO'
     ,ACAO_COMPETENCIA                	    = 'ACAO_COMPETENCIA'
     ,ACOES_ATIVIDADE                	    = 'ACOES_ATIVIDADE'
    , ACESSO						  	    = 'ACESSO'
    , ALUNO 							    = 'ALUNO'
    , ALUNO_TRABALHANDO					    = 'ALUNO_TRABALHANDO'
    , ATENDIMENTO 						    = 'ATENDIMENTO'
    , ATIVIDADE_ALUNO 					    = 'ATIVIDADE_ALUNO'
    , MATRICULA                             = 'MATRICULA'
    , AVALIACAO_ALUNO  					    = 'AVALIACAO_ALUNO'
    , AVALIACAO_ATIVIDADE      			    = 'AVALIACAO_ATIVIDADE'
    , AVALIACAO_DESEMPENHO      			= 'AVALIACAO_DESEMPENHO'
    , CADASTRO_RESERVA_ATIVIDADE 		    = 'CADASTRO_RESERVA_ATIVIDADE'
    , CARGO 							    = 'CARGO'
    , CONDICOES_MORADIA 				    = 'CONDICOES_MORADIA'
    , CURSO_FORMACAO 					    = 'CURSO_FORMACAO'
    , DEPARTAMENTO 						    = 'DEPARTAMENTO'
    , DIAGNOSTICO_ATENDIMENTO 			    = 'DIAGNOSTICO_ATENDIMENTO'
    , DOCUMENTO_ATIVIDADE    			    = 'DOCUMENTO_ATIVIDADE'
    , PARCERIAS      					    = 'EMPRESA'
    , ENCAMINHAMENTO_ALUNO 				    = 'ENCAMINHAMENTO_ALUNO'
    , ENTIDADE_SOCIAL 					    = 'ENTIDADE_SOCIAL'
    , FALTAS_FUNCIONARIO 				    = 'FALTAS_FUNCIONARIO'
    , FAMILIAR_ALUNO 					    = 'FAMILIAR_ALUNO'
    , FREQUENCIA_ALUNO 					    = 'FREQUENCIA_ALUNO'
    , FUNCIONARIO 						    = 'FUNCIONARIO'
    , GRAUS_INSTRUCAO 					    = 'GRAUS_INSTRUCAO'
    , HOME 								    = 'HOME'
    , INICIATIVAS 						    = 'INICIATIVAS'
    , INDICADORES 						    = 'INDICADORES'
    , METAS 							    = 'METAS'
    , METAS_FUNCAO 							= 'METAS_FUNCAO'
    , OBJETIVO 							    = 'OBJETIVO'
    , PERSPECTIVA 						    = 'PERSPECTIVA'
    , PLANOS_ACAO 						    = 'PLANOS_ACAO'
    , MATERIAL 							    = 'MATERIAL'
    , MATERIAIS_ATIVIDADE 				    = 'MATERIAIS_ATIVIDADE'
    , PROGRAMAS 						    = 'PROGRAMAS'
    , PROJETO 							    = 'PROJETO'
    , QUESTIONARIO 						    = 'QUESTIONARIO'
    , REPROVACAO_ALUNO 					    = 'REPROVACAO_ALUNO'
    , RESPONSAVEL_ALUNO 				    = 'RESPONSAVEL_ALUNO'
    , SITUACAO_VULNERABILIDADE 			    = 'SITUACAO_VULNERABILIDADE'
    , TALENTO 							    = 'TALENTO'
    , UNIDADE 							    = 'UNIDADE'
    , UNIFORME_ENTREGUE_ALUNO 			    = 'UNIFORME_ENTREGUE_ALUNO'
    , USUARIO 							    = 'USUARIO'
    , VULNERABILIDADE_ALUNO	   			    = 'VULNERABILIDADE_ALUNO'
    , VULNERABILIDADE_FAMILIAR 			    = 'VULNERABILIDADE_FAMILIAR'
    , SOLUCAO_ATENDIMENTO    			    = 'SOLUCAO_ATENDIMENTO'
    , INSTITUICAO           			    = 'INSTITUICAO'
    , GRUPO_MODULO           			    = 'GRUPO_MODULO'
    , TB_REFERENCIA_ORGANIZACAO_INTERNA     = 'TB_REFERENCIA_ORGANIZACAO_INTERNA'
    , TB_REFERENCIA_GESTAO_PESSOA           = 'TB_REFERENCIA_GESTAO_PESSOA'
    , TB_REFERENCIA_SECRETARIA              = 'TB_REFERENCIA_ORGANIZACAO_INTERNA'
    , TB_REFERENCIA_SAP                     = 'TB_REFERENCIA_ORGANIZACAO_INTERNA'
    , ORGANIZACAO_INTERNA                   = 'ORGANIZACAO_INTERNA'
    , GESTAO_DESEMPENHO                     = 'GESTAO_DESEMPENHO'
    , GESTAO_PESSOA                         = 'GESTAO_PESSOA'
    , SECRETARIA                            = 'SECRETARIA'
    , SAP                                   = 'SAP'
    , PEDAGOGICO                            = 'PEDAGOGICO'
    , CONFIGURACOES                         = 'CONFIGURACOES'
    , PLANO_DESENVOLVIMENTO_INDIVIDUAL      = 'PLANO_DESENVOLVIMENTO_INDIVIDUAL'
    //, FUNCAO                                = 'FUNCAO'
    , COMPETENCIA                           = 'COMPETENCIA'
    , ATRIBUTO_AVALIACAO_DESEMPENHO         = 'ATRIBUTO_AVALIACAO_DESEMPENHO'
    , CBO                                   = 'CBO'
    , TIPO_OCORRENCIA_ALUNO                 = 'TIPOOCORRENCIA'
    , OCORRENCIA_ALUNO                      = 'OCORRENCIA_ALUNO'
    , TIPOS_CONTRATACOES                    = 'TIPOS_CONTRATACOES'
    , PRESTACAO_CONTAS                      = 'PRESTACAO_CONTAS'
    , PROGRAMAS_PROJETOS                    = 'PROGRAMAS_PROJETOS'
    , NIVEIS_TURMAS                         = 'NIVEIS_TURMAS'
    , TURMAS                                = 'TURMAS'
    , OFICINA                               = 'OFICINA'
    , PLANO_CARGO_SALARIO                   = 'PLANO_CARGO_SALARIO'
    , PLANO_DE_INTERVENCAO                  = 'PLANO_DE_INTERVENCAO'
    , CONTROLE_PPRA_PCMSO                   = 'CONTROLE_PPRA_PCMSO'
    , AVALIACAO_SOCIO_FAMILIAR              = 'AVALIACAO_SOCIO_FAMILIAR'
    , GESTAO_FINANCEIRA                     = 'GESTAO_FINANCEIRA'

    , ATENDIMENTO_MULTIDISCIPLINAR          = 'ATENDIMENTO_MULTIDISCIPLINAR'
    , DIAGNOSTICO_MULTIDISCIPLINAR          = 'DIAGNOSTICO_MULTIDISCIPLINAR'
    , DIAGNOSTICO_FISIOTERAPIA              = 'DIAGNOSTICO_FISIOTERAPIA'
    , DIAGNOSTICO_FONOAUDIOLOGIA            = 'DIAGNOSTICO_FONOAUDIOLOGIA'
    , DIAGNOSTICO_TERAPIA_OCUPACIONAL       = 'DIAGNOSTICO_TERAPIA_OCUPACIONAL'
    , DIAGNOSTICO_PSICOLOGIA                = 'DIAGNOSTICO_PSICOLOGIA'
    , PLANEJAMENTO_ATIVIDADES               = 'PLANEJAMENTO_ATIVIDADES'
    , PLANEJAMENTO_FISIOTERAPIA             = 'PLANEJAMENTO_FISIOTERAPIA'
    , PLANEJAMENTO_FONOAUDIOLOGIA           = 'PLANEJAMENTO_FONOAUDIOLOGIA'
    , PLANEJAMENTO_TERAPIA_OCUPACIONAL      = 'PLANEJAMENTO_TERAPIA_OCUPACIONAL'
    , PLANEJAMENTO_PSICOLOGIA               = 'PLANEJAMENTO_PSICOLOGIA'
    , ESTUDO_CASOS_RESULTADOS               = 'ESTUDO_CASOS_RESULTADOS'
    , ALTERAR_SENHA                         = 'ALTERAR_SENHA'
 
    , MOVIMENTACOES                         = 'MOVIMENTACOES'
    , CATEGORIAS_CONTABEIS                  = 'CATEGORIAS_CONTABEIS'
    , COTACOES_MATERIAIS                    = 'COTACOES_MATERIAIS'
    , MOVIMENTACOES_MATERIAIS               = 'MOVIMENTACOES_MATERIAIS'
    , FUNCOES                               = 'FUNCOES'
    , CONTAS_BANCARIA                       = 'CONTAS_BANCARIA'
    , ESTOQUES                              = 'ESTOQUES'
    , MATERIAIS                             = 'MATERIAIS'
    , SALDOS_CONTAS_BANCARIA                = 'SALDOS_CONTAS_BANCARIA'
    , PEDIDOS_MATERIAIS                     = 'PEDIDOS_MATERIAIS'
}
