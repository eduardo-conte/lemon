function isElegivel(input) {

  let output = {};
  let razoesInelegibilidade = [];
  let classesDeConsumoElegiveis = ['residencial','industrial','comercial'];
  let modalidadesTarifariasElegiveis = ['branca', 'convencional'];

  if (!classesDeConsumoElegiveis.includes(input.classeDeConsumo)) {
    razoesInelegibilidade.push('Classe de consumo não atendida')
  };
  if (!modalidadesTarifariasElegiveis.includes(input.modalidadeTarifaria)) {
    razoesInelegibilidade.push('Modalidade tarifária não aceita')
  };

  let mediaConsumo = consumoMedio(input.historicoDeConsumo);//Calcula média do consumo
  
  let condMonof = input.tipoDeConexao == 'monofasico' && mediaConsumo > 400; //Condição p/ conexões monofásicas
  let condBif = input.tipoDeConexao == 'bifasico' && mediaConsumo > 500; //Condição p/ conexões bifásicas
  let condTrif = input.tipoDeConexao == 'trifasico' && mediaConsumo > 750; //Condição p/ conexões trufásicas
  if (!condMonof && !condBif && !condTrif) { //Se não atende alguma das condições de elegibilidade de consumo
    razoesInelegibilidade.push('Consumo muito baixo para tipo de conexão')
  }

  if (razoesInelegibilidade.length > 0) {//Define como inelegível caso hajam razões de inelegibilidade
    output.elegivel = false;
    output.razoesInelegibilidade = razoesInelegibilidade;
  } else { //caso contrário, seta como elegível calcula o carbono evitado
    output.elegivel = true;
    output.economiaAnualDeCO2 = economiaAnualCO2(input.historicoDeConsumo);//Utilizei média x 12 pois o histórico pode ter menos de 12 registros 
  }//Na descrição deste teste o output fica inconsistente porque calcularam a economia "Mensal" e não "Anual"
  
  return (output)
  
}

function consumoMedio(arr){
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function economiaAnualCO2(arr){
  let economia = consumoMedio(arr)*0.084*12;
  return Math.round((economia + Number.EPSILON) * 100) / 100;
}

module.exports = {
  isElegivel,
  economiaAnualCO2,
  consumoMedio
}