import { Unidade } from './unidade'
import { InformacoesBanco } from './informacoes-banco'

export class ContaBancaria{
    id:number
    tipoContaBancaria:string
    numeroAgencia:string
    numeroContaBancaria:number
    informacoesBanco:InformacoesBanco
    unidade:Unidade
    
}

