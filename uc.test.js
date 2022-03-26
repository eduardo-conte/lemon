const UnidadeConsumidora = require('./uc.js')

describe('Definir se consumidor é elegível para GD', () => {

  let inputs = [
    {
      "numeroDoDocumento": "14041737706",
      "tipoDeConexao": "bifasico",
      "classeDeConsumo": "comercial",
      "modalidadeTarifaria": "convencional",
      "historicoDeConsumo": [
        3878, // mes atual
        9760, // mes anterior
        5976, // 2 meses atras
        2797, // 3 meses atras
        2481, // 4 meses atras
        5731, // 5 meses atras
        7538, // 6 meses atras
        4392, // 7 meses atras
        7859, // 8 meses atras
        4160, // 9 meses atras
        6941, // 10 meses atras
        4597  // 11 meses atras
      ]
    },
    {
      "numeroDoDocumento": "14041737706",
      "tipoDeConexao": "bifasico",
      "classeDeConsumo": "rural",
      "modalidadeTarifaria": "verde",
      "historicoDeConsumo": [
        3878, // mes atual
        9760, // mes anterior
        5976, // 2 meses atras
        2797, // 3 meses atras
        2481, // 4 meses atras
        5731, // 5 meses atras
        7538, // 6 meses atras
        4392, // 7 meses atras
        7859, // 8 meses atras
        4160, // 9 meses atras
      ]
    }
  ];
  let outputs = [
    {
      "elegivel": true,
      "economiaAnualDeCO2": 462.77 * 12, //Consumo Anual CORRETO
    },
    {
      "elegivel": false,
      "razoesInelegibilidade": [
        "Classe de consumo não atendida",
        "Modalidade tarifária não aceita"
      ]
    }
  ];

  test('Input 0 - Elegível', () => {
    expect(UnidadeConsumidora.isElegivel(inputs[0])).toEqual(outputs[0]);
  });

  test('Input 1 - Não-Elegível', () => {
    expect(UnidadeConsumidora.isElegivel(inputs[1])).toEqual(outputs[1]);
  });

});

describe('Calcular consumo médio', () => {
  var input = [
    3878, // mes atual
    9760, // mes anterior
    5976, // 2 meses atras
    2797, // 3 meses atras
    2481, // 4 meses atras
    5731, // 5 meses atras
    7538, // 6 meses atras
    4392, // 7 meses atras
    7859, // 8 meses atras
    4160, // 9 meses atras
    6941, // 10 meses atras
    4597  // 11 meses atras
  ];
  let outputEsperado = 5509.17;
  test('Teste consumo médio de um array', () => {
    expect(Math.round((UnidadeConsumidora.consumoMedio(input) + Number.EPSILON) * 100) / 100).toEqual(outputEsperado);
  });
});

describe('Calcular economia ANUAL de CO2', () => {
  var input = [
    3878, // mes atual
    9760, // mes anterior
    5976, // 2 meses atras
    2797, // 3 meses atras
    2481, // 4 meses atras
    5731, // 5 meses atras
    7538, // 6 meses atras
    4392, // 7 meses atras
    7859, // 8 meses atras
    4160, // 9 meses atras
    6941, // 10 meses atras
    4597  // 11 meses atras
  ];
  let outputEsperado = 5553.24;
  test('Teste economia de CO2', () => {
    expect(Math.round((UnidadeConsumidora.economiaAnualCO2(input) + Number.EPSILON) * 100) / 100).toEqual(outputEsperado);
  });
});