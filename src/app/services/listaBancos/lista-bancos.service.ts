import { Banco } from './../../core/banco';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListaBancosService {


  constructor() { }

  listaBancos:Banco[] = [
    {
      numero: "001",
      nome: "BANCO DO BRASIL",
    },
    {
      numero: "341",
      nome: "ITAÚ",
    },
    {
      numero: "104",
      nome: "CAIXA ECONÔMICA FEDERAL",
    },
    {
      numero: "033",
      nome: "SANTANDER",
    },
    {
      numero: "070",
      nome: "BRB - BANCO DE BRASÌLIA",
    },
    {
      numero: "077",
      nome: "BANCO INTERMEDIUM",
    },
    {
      numero: "237",
      nome: "BRADESCO",
    },
    {
      numero: "745",
      nome: "CITIBANK",
    },
    {
      numero: "422",
      nome: "BANCO SAFRA",
    },
    {
      numero: "399",
      nome: "BANCO HSBC",
    },
    {
      numero: "756",
      nome: "BANCOOB",
    },
    {
      numero: "212",
      nome: "BANCO ORIGINAL",
    },
    {
      numero: "002",
      nome: "BANCO CENTRAL DO BRASIL",
    },
    {
      numero: "003",
      nome: "BANCO DA AMAZONIA S.A",
    },
    {
      numero: "004",
      nome: "BANCO DO NORDESTE DO BRASIL S.A",
    },
    {
      numero: "007",
      nome: "BANCO NAC DESENV. ECO. SOCIAL S.A",
    },
    {
      numero: "008",
      nome: "BANCO MERIDIONAL DO BRASIL",
    },
    {
      numero: "020",
      nome: "BANCO DO ESTADO DE ALAGOAS S.A",
    },
    {
      numero: "021",
      nome: "BANCO DO ESTADO DO ESPIRITO SANTO S.A",
    },
    {
      numero: "022",
      nome: "BANCO DE CREDITO REAL DE MINAS GERAIS SA",
    },
    {
      numero: "024",
      nome: "BANCO DO ESTADO DE PERNAMBUCO",
    },
    {
      numero: "025",
      nome: "BANCO ALFA S/A",
    },
    {
      numero: "026",
      nome: "BANCO DO ESTADO DO ACRE S.A",
    },
    {
      numero: "027",
      nome: "BANCO DO ESTADO DE SANTA CATARINA S.A",
    },
    {
      numero: "028",
      nome: "BANCO DO ESTADO DA BAHIA S.A",
    },
    {
      numero: "029",
      nome: "BANCO DO ESTADO DO RIO DE JANEIRO S.A",
    },
    {
      numero: "030",
      nome: "BANCO DO ESTADO DA PARAIBA S.A",
    },
    {
      numero: "031",
      nome: "BANCO DO ESTADO DE GOIAS S.A",
    },
    {
      numero: "032",
      nome: "BANCO DO ESTADO DO MATO GROSSO S.A.",
    },
    {
      numero: "034",
      nome: "BANCO DO ESADO DO AMAZONAS S.A",
    },
    {
      numero: "035",
      nome: "BANCO DO ESTADO DO CEARA S.A",
    },
    {
      numero: "036",
      nome: "BANCO DO ESTADO DO MARANHAO S.A",
    },
    {
      numero: "037",
      nome: "BANCO DO ESTADO DO PARA S.A",
    },
    {
      numero: "038",
      nome: "BANCO DO ESTADO DO PARANA S.A",
    },
    {
      numero: "039",
      nome: "BANCO DO ESTADO DO PIAUI S.A",
    },
    {
      numero: "041",
      nome: "BANCO DO ESTADO DO RIO GRANDE DO SUL S.A",
    },
    {
      numero: "047",
      nome: "BANCO DO ESTADO DE SERGIPE S.A",
    },
    {
      numero: "048",
      nome: "BANCO DO ESTADO DE MINAS GERAIS S.A",
    },
    {
      numero: "059",
      nome: "BANCO DO ESTADO DE RONDONIA S.A",
    },
    {
      numero: "106",
      nome: "BANCO ITABANCO S.A.",
    },
    {
      numero: "107",
      nome: "BANCO BBM S.A",
    },
    {
      numero: "109",
      nome: "BANCO CREDIBANCO S.A",
    },
    {
      numero: "116",
      nome: "BANCO B.N.L DO BRASIL S.A",
    },
    {
      numero: "148",
      nome: "MULTI BANCO S.A",
    },
    {
      numero: "151",
      nome: "CAIXA ECONOMICA DO ESTADO DE SAO PAULO",
    },
    {
      numero: "153",
      nome: "CAIXA ECONOMICA DO ESTADO DO R.G.SUL",
    },
    {
      numero: "165",
      nome: "BANCO NORCHEM S.A",
    },
    {
      numero: "166",
      nome: "BANCO INTER-ATLANTICO S.A",
    },
    {
      numero: "168",
      nome: "BANCO C.C.F. BRASIL S.A",
    },
    {
      numero: "175",
      nome: "CONTINENTAL BANCO S.A",
    },
    {
      numero: "184",
      nome: "BBA - CREDITANSTALT S.A",
    },
    {
      numero: "199",
      nome: "BANCO FINANCIAL PORTUGUES",
    },
    {
      numero: "200",
      nome: "BANCO FRICRISA AXELRUD S.A",
    },
    {
      numero: "201",
      nome: "BANCO AUGUSTA INDUSTRIA E COMERCIAL S.A",
    },
    {
      numero: "204",
      nome: "BANCO S.R.L S.A",
    },
    {
      numero: "205",
      nome: "BANCO SUL AMERICA S.A",
    },
    {
      numero: "206",
      nome: "BANCO MARTINELLI S.A",
    },
    {
      numero: "208",
      nome: "BANCO PACTUAL S.A",
    },
    {
      numero: "210",
      nome: "DEUTSCH SUDAMERIKANICHE BANK AG",
    },
    {
      numero: "211",
      nome: "BANCO SISTEMA S.A",
    },
    {
      numero: "213",
      nome: "BANCO ARBI S.A",
    },
    {
      numero: "214",
      nome: "BANCO DIBENS S.A",
    },
    {
      numero: "215",
      nome: "BANCO AMERICA DO SUL S.A",
    },
    {
      numero: "216",
      nome: "BANCO REGIONAL MALCON S.A",
    },
    {
      numero: "217",
      nome: "BANCO AGROINVEST S.A",
    },
    {
      numero: "218",
      nome: "BS2",
    },
    {
      numero: "219",
      nome: "BANCO DE CREDITO DE SAO PAULO S.A",
    },
    {
      numero: "220",
      nome: "BANCO CREFISUL",
    },
    {
      numero: "221",
      nome: "BANCO GRAPHUS S.A",
    },
    {
      numero: "222",
      nome: "BANCO AGF BRASIL S. A.",
    },
    {
      numero: "223",
      nome: "BANCO INTERUNION S.A",
    },
    {
      numero: "224",
      nome: "BANCO FIBRA S.A",
    },
    {
      numero: "225",
      nome: "BANCO BRASCAN S.A",
    },
    {
      numero: "228",
      nome: "BANCO ICATU S.A",
    },
    {
      numero: "229",
      nome: "BANCO CRUZEIRO S.A",
    },
    {
      numero: "230",
      nome: "BANCO BANDEIRANTES S.A",
    },
    {
      numero: "231",
      nome: "BANCO BOAVISTA S.A",
    },
    {
      numero: "232",
      nome: "BANCO INTERPART S.A",
    },
    {
      numero: "233",
      nome: "BANCO MAPPIN S.A",
    },
    {
      numero: "234",
      nome: "BANCO LAVRA S.A.",
    },
    {
      numero: "235",
      nome: "BANCO LIBERAL S.A",
    },
    {
      numero: "236",
      nome: "BANCO CAMBIAL S.A",
    },
    {
      numero: "239",
      nome: "BANCO BANCRED S.A",
    },
    {
      numero: "240",
      nome: "BANCO DE CREDITO REAL DE MINAS GERAIS S.",
    },
    {
      numero: "241",
      nome: "BANCO CLASSICO S.A",
    },
    {
      numero: "242",
      nome: "BANCO EUROINVEST S.A",
    },
    {
      numero: "243",
      nome: "BANCO STOCK S.A",
    },
    {
      numero: "244",
      nome: "BANCO CIDADE S.A",
    },
    {
      numero: "245",
      nome: "BANCO EMPRESARIAL S.A",
    },
    {
      numero: "246",
      nome: "BANCO ABC ROMA S.A",
    },
    {
      numero: "247",
      nome: "BANCO OMEGA S.A",
    },
    {
      numero: "249",
      nome: "BANCO INVESTCRED S.A",
    },
    {
      numero: "250",
      nome: "BANCO SCHAHIN CURY S.A",
    },
    {
      numero: "251",
      nome: "BANCO SAO JORGE S.A.",
    },
    {
      numero: "252",
      nome: "BANCO FININVEST S.A",
    },
    {
      numero: "254",
      nome: "BANCO PARANA BANCO S.A",
    },
    {
      numero: "255",
      nome: "MILBANCO S.A.",
    },
    {
      numero: "256",
      nome: "BANCO GULVINVEST S.A",
    },
    {
      numero: "258",
      nome: "BANCO INDUSCRED S.A",
    },
    {
      numero: "261",
      nome: "BANCO VARIG S.A",
    },
    {
      numero: "262",
      nome: "BANCO BOREAL S.A",
    },
    {
      numero: "263",
      nome: "BANCO CACIQUE",
    },
    {
      numero: "264",
      nome: "BANCO PERFORMANCE S.A",
    },
    {
      numero: "265",
      nome: "BANCO FATOR S.A",
    },
    {
      numero: "266",
      nome: "BANCO CEDULA S.A",
    },
    {
      numero: "267",
      nome: "BANCO BBM-COM.C.IMOB.CFI S.A.",
    },
    {
      numero: "275",
      nome: "BANCO REAL S.A",
    },
    {
      numero: "277",
      nome: "BANCO PLANIBANC S.A",
    },
    {
      numero: "282",
      nome: "BANCO BRASILEIRO COMERCIAL",
    },
    {
      numero: "291",
      nome: "BANCO DE CREDITO NACIONAL S.A",
    },
    {
      numero: "294",
      nome: "BCR - BANCO DE CREDITO REAL S.A",
    },
    {
      numero: "295",
      nome: "BANCO CREDIPLAN S.A",
    },
    {
      numero: "300",
      nome: "BANCO DE LA NACION ARGENTINA S.A",
    },
    {
      numero: "302",
      nome: "BANCO DO PROGRESSO S.A",
    },
    {
      numero: "303",
      nome: "BANCO HNF S.A.",
    },
    {
      numero: "304",
      nome: "BANCO PONTUAL S.A",
    },
    {
      numero: "308",
      nome: "BANCO COMERCIAL BANCESA S.A.",
    },
    {
      numero: "318",
      nome: "BANCO B.M.G. S.A",
    },
    {
      numero: "320",
      nome: "BANCO INDUSTRIAL E COMERCIAL",
    },
    {
      numero: "346",
      nome: "BANCO FRANCES E BRASILEIRO S.A",
    },
    {
      numero: "347",
      nome: "BANCO SUDAMERIS BRASIL S.A",
    },
    {
      numero: "351",
      nome: "BANCO BOZANO SIMONSEN S.A",
    },
    {
      numero: "353",
      nome: "BANCO GERAL DO COMERCIO S.A",
    },
    {
      numero: "356",
      nome: "ABN AMRO S.A",
    },
    {
      numero: "366",
      nome: "BANCO SOGERAL S.A",
    },
    {
      numero: "369",
      nome: "PONTUAL",
    },
    {
      numero: "370",
      nome: "BEAL - BANCO EUROPEU PARA AMERICA LATINA",
    },
    {
      numero: "372",
      nome: "BANCO ITAMARATI S.A",
    },
    {
      numero: "375",
      nome: "BANCO FENICIA S.A",
    },
    {
      numero: "376",
      nome: "CHASE MANHATTAN BANK S.A",
    },
    {
      numero: "388",
      nome: "BANCO MERCANTIL DE DESCONTOS S/A",
    },
    {
      numero: "389",
      nome: "BANCO MERCANTIL DO BRASIL S.A",
    },
    {
      numero: "392",
      nome: "BANCO MERCANTIL DE SAO PAULO S.A",
    },
    {
      numero: "394",
      nome: "BANCO B.M.C. S.A",
    },
    {
      numero: "409",
      nome: "UNIBANCO - UNIAO DOS BANCOS BRASILEIROS",
    },
    {
      numero: "412",
      nome: "BANCO NACIONAL DA BAHIA S.A",
    },
    {
      numero: "415",
      nome: "BANCO NACIONAL S.A",
    },
    {
      numero: "420",
      nome: "BANCO NACIONAL DO NORTE S.A",
    },
    {
      numero: "424",
      nome: "BANCO NOROESTE S.A",
    },
    {
      numero: "434",
      nome: "BANCO FORTALEZA S.A",
    },
    {
      numero: "453",
      nome: "BANCO RURAL S.A",
    },
    {
      numero: "456",
      nome: "BANCO TOKIO S.A",
    },
    {
      numero: "464",
      nome: "BANCO SUMITOMO BRASILEIRO S.A",
    },
    {
      numero: "466",
      nome: "BANCO MITSUBISHI BRASILEIRO S.A",
    },
    {
      numero: "472",
      nome: "LLOYDS BANK PLC",
    },
    {
      numero: "473",
      nome: "BANCO FINANCIAL PORTUGUES S.A",
    },
    {
      numero: "477",
      nome: "CITIBANK N.A",
    },
    {
      numero: "479",
      nome: "BANCO DE BOSTON S.A",
    },
    {
      numero: "480",
      nome: "BANCO PORTUGUES DO ATLANTICO-BRASIL S.A",
    },
    {
      numero: "483",
      nome: "BANCO AGRIMISA S.A.",
    },
    {
      numero: "487",
      nome: "DEUTSCHE BANK S.A - BANCO ALEMAO",
    },
    {
      numero: "488",
      nome: "BANCO J. P. MORGAN S.A",
    },
    {
      numero: "489",
      nome: "BANESTO BANCO URUGAUAY S.A",
    },
    {
      numero: "492",
      nome: "INTERNATIONALE NEDERLANDEN BANK N.V.",
    },
    {
      numero: "493",
      nome: "BANCO UNION S.A.C.A",
    },
    {
      numero: "494",
      nome: "BANCO LA REP. ORIENTAL DEL URUGUAY",
    },
    {
      numero: "495",
      nome: "BANCO LA PROVINCIA DE BUENOS AIRES",
    },
    {
      numero: "496",
      nome: "BANCO EXTERIOR DE ESPANA S.A",
    },
    {
      numero: "498",
      nome: "CENTRO HISPANO BANCO",
    },
    {
      numero: "499",
      nome: "BANCO IOCHPE S.A",
    },
    {
      numero: "501",
      nome: "BANCO BRASILEIRO IRAQUIANO S.A.",
    },
    {
      numero: "502",
      nome: "BANCO SANTANDER S.A",
    },
    {
      numero: "504",
      nome: "BANCO MULTIPLIC S.A",
    },
    {
      numero: "505",
      nome: "BANCO GARANTIA S.A",
    },
    {
      numero: "600",
      nome: "BANCO LUSO BRASILEIRO S.A",
    },
    {
      numero: "601",
      nome: "BFC BANCO S.A.",
    },
    {
      numero: "602",
      nome: "BANCO PATENTE S.A",
    },
    {
      numero: "604",
      nome: "BANCO INDUSTRIAL DO BRASIL S.A",
    },
    {
      numero: "607",
      nome: "BANCO SANTOS NEVES S.A",
    },
    {
      numero: "608",
      nome: "BANCO OPEN S.A",
    },
    {
      numero: "610",
      nome: "BANCO V.R. S.A",
    },
    {
      numero: "611",
      nome: "BANCO PAULISTA S.A",
    },
    {
      numero: "612",
      nome: "BANCO GUANABARA S.A",
    },
    {
      numero: "613",
      nome: "BANCO PECUNIA S.A",
    },
    {
      numero: "616",
      nome: "BANCO INTERPACIFICO S.A",
    },
    {
      numero: "617",
      nome: "BANCO INVESTOR S.A.",
    },
    {
      numero: "618",
      nome: "BANCO TENDENCIA S.A",
    },
    {
      numero: "621",
      nome: "BANCO APLICAP S.A.",
    },
    {
      numero: "622",
      nome: "BANCO DRACMA S.A",
    },
    {
      numero: "623",
      nome: "BANCO PAnomeRICANO S.A",
    },
    {
      numero: "624",
      nome: "BANCO GENERAL MOTORS S.A",
    },
    {
      numero: "625",
      nome: "BANCO ARAUCARIA S.A",
    },
    {
      numero: "626",
      nome: "BANCO FICSA S.A",
    },
    {
      numero: "627",
      nome: "BANCO DESTAK S.A",
    },
    {
      numero: "628",
      nome: "BANCO CRITERIUM S.A",
    },
    {
      numero: "629",
      nome: "BANCORP BANCO COML. E. DE INVESTMENTO",
    },
    {
      numero: "630",
      nome: "BANCO INTERCAP S.A",
    },
    {
      numero: "633",
      nome: "BANCO REDIMENTO S.A",
    },
    {
      numero: "634",
      nome: "BANCO TRIANGULO S.A",
    },
    {
      numero: "635",
      nome: "BANCO DO ESTADO DO AMAPA S.A",
    },
    {
      numero: "637",
      nome: "BANCO SOFISA S.A",
    },
    {
      numero: "638",
      nome: "BANCO PROSPER S.A",
    },
    {
      numero: "639",
      nome: "BIG S.A. - BANCO IRMAOS GUIMARAES",
    },
    {
      numero: "640",
      nome: "BANCO DE CREDITO METROPOLITANO S.A",
    },
    {
      numero: "641",
      nome: "BANCO EXCEL ECONOMICO S/A",
    },
    {
      numero: "643",
      nome: "BANCO SEGMENTO S.A",
    },
    {
      numero: "645",
      nome: "BANCO DO ESTADO DE RORAIMA S.A",
    },
    {
      numero: "647",
      nome: "BANCO MARKA S.A",
    },
    {
      numero: "648",
      nome: "BANCO ATLANTIS S.A",
    },
    {
      numero: "649",
      nome: "BANCO DIMENSAO S.A",
    },
    {
      numero: "650",
      nome: "BANCO PEBB S.A",
    },
    {
      numero: "652",
      nome: "BANCO FRANCES E BRASILEIRO SA",
    },
    {
      numero: "653",
      nome: "BANCO INDUSVAL S.A",
    },
    {
      numero: "654",
      nome: "BANCO A. J. RENNER S.A",
    },
    {
      numero: "655",
      nome: "BANCO VOTORANTIM S.A.",
    },
    {
      numero: "656",
      nome: "BANCO MATRIX S.A",
    },
    {
      numero: "657",
      nome: "BANCO TECNICORP S.A",
    },
    {
      numero: "658",
      nome: "BANCO PORTO REAL S.A",
    },
    {
      numero: "702",
      nome: "BANCO SANTOS S.A",
    },
    {
      numero: "705",
      nome: "BANCO INVESTCORP S.A.",
    },
    {
      numero: "707",
      nome: "BANCO DAYCOVAL S.A",
    },
    {
      numero: "711",
      nome: "BANCO VETOR S.A.",
    },
    {
      numero: "713",
      nome: "BANCO CINDAM S.A",
    },
    {
      numero: "715",
      nome: "BANCO VEGA S.A",
    },
    {
      numero: "718",
      nome: "BANCO OPERADOR S.A",
    },
    {
      numero: "719",
      nome: "BANCO PRIMUS S.A",
    },
    {
      numero: "720",
      nome: "BANCO MAXINVEST S.A",
    },
    {
      numero: "721",
      nome: "BANCO CREDIBEL S.A",
    },
    {
      numero: "722",
      nome: "BANCO INTERIOR DE SAO PAULO S.A",
    },
    {
      numero: "724",
      nome: "BANCO PORTO SEGURO S.A",
    },
    {
      numero: "725",
      nome: "BANCO FINABANCO S.A",
    },
    {
      numero: "726",
      nome: "BANCO UNIVERSAL S.A",
    },
    {
      numero: "728",
      nome: "BANCO FITAL S.A",
    },
    {
      numero: "729",
      nome: "BANCO FONTE S.A",
    },
    {
      numero: "730",
      nome: "BANCO COMERCIAL PARAGUAYO S.A",
    },
    {
      numero: "731",
      nome: "BANCO GNPP S.A.",
    },
    {
      numero: "732",
      nome: "BANCO PREMIER S.A.",
    },
    {
      numero: "733",
      nome: "BANCO NACOES S.A.",
    },
    {
      numero: "734",
      nome: "BANCO GERDAU S.A",
    },
    {
      numero: "735",
      nome: "BANCO NEON",
    },
    {
      numero: "736",
      nome: "BANCO UNITED S.A",
    },
    {
      numero: "737",
      nome: "THECA",
    },
    {
      numero: "738",
      nome: "MARADA",
    },
    {
      numero: "739",
      nome: "BGN",
    },
    {
      numero: "740",
      nome: "BCN BARCLAYS",
    },
    {
      numero: "741",
      nome: "BRP",
    },
    {
      numero: "742",
      nome: "EQUATORIAL",
    },
    {
      numero: "743",
      nome: "BANCO EMBLEMA S.A",
    },
    {
      numero: "744",
      nome: "THE FIRST NATIONAL BANK OF BOSTON",
    },
    {
      numero: "746",
      nome: "MODAL S\\A",
    },
    {
      numero: "747",
      nome: "RAIBOBANK DO BRASIL",
    },
    {
      numero: "748",
      nome: "SICREDI",
    },
    {
      numero: "749",
      nome: "BRMSANTIL SA",
    },
    {
      numero: "750",
      nome: "BANCO REPUBLIC NATIONAL OF NEW YORK (BRA",
    },
    {
      numero: "751",
      nome: "DRESDNER BANK LATEInomeRIKA-BRASIL S/A",
    },
    {
      numero: "752",
      nome: "BANCO BANQUE NATIONALE DE PARIS BRASIL S",
    },
    {
      numero: "753",
      nome: "BANCO COMERCIAL URUGUAI S.A.",
    },
    {
      numero: "755",
      nome: "BANCO MERRILL LYNCH S.A",
    },
    {
      numero: "757",
      nome: "BANCO KEB DO BRASIL S.A.",
    },
    {
      numero: "260",
      nome: "NUBANK",
    },
    {
      numero: "102",
      nome: "XP INVESTIMENTOS",
    },
    {
      numero: "336",
      nome: "BANCO C6 S.A.",
    },
    {
      numero: "290",
      nome: "PagSeguro Internet S.A.",
    }
    ,
    {
      numero: "323",
      nome: "MercadoPago.com Representações Ltda.",
    }
    ,
    {
      numero: "332",
      nome: "Acesso Soluções de Pagamento S.A.",
    }
    ,
    {
      numero: "325",
      nome: "Órama DTVM S.A.",
    }
  ]

}
