var DataTypes = require("sequelize").DataTypes;
var _alocamentoAlunos = require("./alocamentoAlunos");
var _alocamentoFuncao = require("./alocamentoFuncao");
var _alocamentoProfessores = require("./alocamentoProfessores");
var _aluno = require("./aluno");
var _departamento = require("./departamento");
var _despesa = require("./despesa");
var _disciplina = require("./disciplina");
var _funcao = require("./funcao");
var _funcionario = require("./funcionario");
var _matricula = require("./matricula");
var _nota = require("./nota");
var _plano = require("./plano");
var _receita = require("./receita");
var _turma = require("./turma");

function initModels(sequelize) {
  var alocamentoAlunos = _alocamentoAlunos(sequelize, DataTypes);
  var alocamentoFuncao = _alocamentoFuncao(sequelize, DataTypes);
  var alocamentoProfessores = _alocamentoProfessores(sequelize, DataTypes);
  var aluno = _aluno(sequelize, DataTypes);
  var departamento = _departamento(sequelize, DataTypes);
  var despesa = _despesa(sequelize, DataTypes);
  var disciplina = _disciplina(sequelize, DataTypes);
  var funcao = _funcao(sequelize, DataTypes);
  var funcionario = _funcionario(sequelize, DataTypes);
  var matricula = _matricula(sequelize, DataTypes);
  var nota = _nota(sequelize, DataTypes);
  var plano = _plano(sequelize, DataTypes);
  var receita = _receita(sequelize, DataTypes);
  var turma = _turma(sequelize, DataTypes);

  alocamentoAlunos.belongsTo(aluno, { as: "id_aluno_aluno", foreignKey: "id_aluno"});
  aluno.hasMany(alocamentoAlunos, { as: "alocamentoAlunos", foreignKey: "id_aluno"});
  matricula.belongsTo(aluno, { as: "id_aluno_aluno", foreignKey: "id_aluno"});
  aluno.hasMany(matricula, { as: "matriculas", foreignKey: "id_aluno"});
  nota.belongsTo(aluno, { as: "id_aluno_aluno", foreignKey: "id_aluno"});
  aluno.hasMany(nota, { as: "nota", foreignKey: "id_aluno"});
  receita.belongsTo(aluno, { as: "id_aluno_aluno", foreignKey: "id_aluno"});
  aluno.hasMany(receita, { as: "receita", foreignKey: "id_aluno"});
  funcao.belongsTo(departamento, { as: "id_departamento_departamento", foreignKey: "id_departamento"});
  departamento.hasMany(funcao, { as: "funcaos", foreignKey: "id_departamento"});
  alocamentoProfessores.belongsTo(disciplina, { as: "id_disciplina_disciplina", foreignKey: "id_disciplina"});
  disciplina.hasMany(alocamentoProfessores, { as: "alocamentoProfessores", foreignKey: "id_disciplina"});
  matricula.belongsTo(disciplina, { as: "id_disciplina_disciplina", foreignKey: "id_disciplina"});
  disciplina.hasMany(matricula, { as: "matriculas", foreignKey: "id_disciplina"});
  alocamentoFuncao.belongsTo(funcao, { as: "id_funcao_funcao", foreignKey: "id_funcao"});
  funcao.hasMany(alocamentoFuncao, { as: "alocamentoFuncaos", foreignKey: "id_funcao"});
  alocamentoFuncao.belongsTo(funcionario, { as: "id_funcionario_funcionario", foreignKey: "id_funcionario"});
  funcionario.hasMany(alocamentoFuncao, { as: "alocamentoFuncaos", foreignKey: "id_funcionario"});
  alocamentoProfessores.belongsTo(funcionario, { as: "id_funcionario_funcionario", foreignKey: "id_funcionario"});
  funcionario.hasMany(alocamentoProfessores, { as: "alocamentoProfessores", foreignKey: "id_funcionario"});
  aluno.belongsTo(funcionario, { as: "id_funcionario_funcionario", foreignKey: "id_funcionario"});
  funcionario.hasMany(aluno, { as: "alunos", foreignKey: "id_funcionario"});
  despesa.belongsTo(funcionario, { as: "id_funcionario_funcionario", foreignKey: "id_funcionario"});
  funcionario.hasMany(despesa, { as: "despesas", foreignKey: "id_funcionario"});
  despesa.belongsTo(funcionario, { as: "id_funcionario_pago_funcionario", foreignKey: "id_funcionario_pago"});
  funcionario.hasMany(despesa, { as: "id_funcionario_pago_despesas", foreignKey: "id_funcionario_pago"});
  funcionario.belongsTo(funcionario, { as: "id_funcionario_funcionario", foreignKey: "id_funcionario"});
  funcionario.hasMany(funcionario, { as: "funcionarios", foreignKey: "id_funcionario"});
  matricula.belongsTo(funcionario, { as: "id_funcionario_funcionario", foreignKey: "id_funcionario"});
  funcionario.hasMany(matricula, { as: "matriculas", foreignKey: "id_funcionario"});
  nota.belongsTo(funcionario, { as: "id_funcionario_funcionario", foreignKey: "id_funcionario"});
  funcionario.hasMany(nota, { as: "nota", foreignKey: "id_funcionario"});
  receita.belongsTo(funcionario, { as: "id_funcionario_funcionario", foreignKey: "id_funcionario"});
  funcionario.hasMany(receita, { as: "receita", foreignKey: "id_funcionario"});
  alocamentoAlunos.belongsTo(matricula, { as: "id_matricula_matricula", foreignKey: "id_matricula"});
  matricula.hasMany(alocamentoAlunos, { as: "alocamentoAlunos", foreignKey: "id_matricula"});
  nota.belongsTo(matricula, { as: "id_matricula_matricula", foreignKey: "id_matricula"});
  matricula.hasMany(nota, { as: "nota", foreignKey: "id_matricula"});
  disciplina.belongsTo(plano, { as: "id_plano_plano", foreignKey: "id_plano"});
  plano.hasMany(disciplina, { as: "disciplinas", foreignKey: "id_plano"});
  matricula.belongsTo(plano, { as: "id_plano_plano", foreignKey: "id_plano"});
  plano.hasMany(matricula, { as: "matriculas", foreignKey: "id_plano"});
  turma.belongsTo(plano, { as: "id_plano_plano", foreignKey: "id_plano"});
  plano.hasMany(turma, { as: "turmas", foreignKey: "id_plano"});
  alocamentoAlunos.belongsTo(turma, { as: "id_turma_turma", foreignKey: "id_turma"});
  turma.hasMany(alocamentoAlunos, { as: "alocamentoAlunos", foreignKey: "id_turma"});
  nota.belongsTo(turma, { as: "id_turma_turma", foreignKey: "id_turma"});
  turma.hasMany(nota, { as: "nota", foreignKey: "id_turma"});

  return {
    alocamentoAlunos,
    alocamentoFuncao,
    alocamentoProfessores,
    aluno,
    departamento,
    despesa,
    disciplina,
    funcao,
    funcionario,
    matricula,
    nota,
    plano,
    receita,
    turma,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
