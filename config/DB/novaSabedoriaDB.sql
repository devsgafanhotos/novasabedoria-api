create database novaSabedoria default character
set
    utf8 default collate utf8_general_ci;

use novaSabedoria;

CREATE TABLE
    plano (
        id integer (10) PRIMARY KEY auto_increment,
        nome VARCHAR(255) not null unique,
        tipo enum ('Flexível', 'Fixo') not null,
        data_cadastro timestamp default current_timestamp,
        descricao TEXT
    );

CREATE TABLE
    departamento (
        id INTEGER (4) PRIMARY KEY auto_increment,
        nome VARCHAR(255) not null unique,
        data_cadastro timestamp default current_timestamp,
        descricao TEXT
    );

CREATE TABLE
    funcao (
        id integer (10) PRIMARY KEY auto_increment,
        nome VARCHAR(255) not null unique,
        descricao TEXT,
        id_departamento INTEGER (10) not null,
        foreign key (id_departamento) references departamento (id)
    );

CREATE TABLE
    disciplina (
        id INTEGER (10) PRIMARY KEY auto_increment,
        nome VARCHAR(255) not null unique,
        propina decimal(8, 2) not null,
        descricao TEXT,
        id_plano INTEGER (10) not null,
        foreign key (id_plano) references plano (id)
    );

CREATE TABLE
    funcionario (
        id INTEGER (10) PRIMARY KEY auto_increment,
        nome VARCHAR(255) not null,
        sobrenome VARCHAR(255) not null,
        data_nascimento DATE not null,
        telefone VARCHAR(20) not null unique,
        email VARCHAR(255) unique,
        sexo enum ('Masculino', 'Feminino') not null,
        tipo enum ('Admin', 'Normal') not null default "Normal",
        bi varchar(255) not null unique,
        data_cadastro timestamp default current_timestamp,
        nome_pai VARCHAR(255),
        nome_mae VARCHAR(255),
        senha VARCHAR(1000),
        id_funcionario INTEGER (10),
        foreign key (id_funcionario) references funcionario (id)
    );

CREATE TABLE
    aluno (
        id INTEGER (10) PRIMARY KEY auto_increment,
        nome VARCHAR(255) not null,
        sobrenome VARCHAR(255) not null,
        data_nascimento DATE not null,
        sexo enum ('Masculino', 'Feminino') not null,
        bi varchar(255) unique,
        nome_encarregado VARCHAR(255),
        nome_pai VARCHAR(255) not null,
        nome_mae VARCHAR(255) not null,
        telefone VARCHAR(255),
        email VARCHAR(255),
        senha VARCHAR(1000),
        id_funcionario INTEGER (10) not null,
        foreign key (id_funcionario) references funcionario (id)
    );

CREATE TABLE
    turma (
        id integer (10) PRIMARY KEY auto_increment,
        nome VARCHAR(255) not null,
        numero_alunos INTEGER (10) not null,
        numero_vagas INTEGER (10) not null,
        numero_sala INTEGER (10) not null,
        periodo enum ('Manhã', 'Tarde') not null,
        ano_lectivo varchar(255),
        data_cadastro timestamp default current_timestamp,
        id_plano INTEGER (10),
        foreign key (id_plano) references plano (id)
    );

CREATE TABLE
    receita (
        id INTEGER (10) PRIMARY KEY auto_increment,
        tipo_receita varchar(255) not null,
        mes_correspondente VARCHAR(255),
        ano_lectivo VARCHAR(255),
        data_cadastro timestamp default current_timestamp,
        descricao TEXT,
        id_funcionario integer (10),
        id_aluno integer (10),
        foreign key (id_funcionario) references funcionario (id),
        foreign key (id_aluno) references aluno (id)
    );

CREATE TABLE
    despesa (
        id INTEGER PRIMARY KEY,
        descricao TEXT,
        tipo_despesa VARCHAR(255),
        mes_correspondente VARCHAR(255),
        ano_lectivo VARCHAR(255),
        data_cadastro timestamp default current_timestamp,
        id_funcionario integer (10),
        id_funcionario_pago integer (10),
        foreign key (id_funcionario) references funcionario (id),
        foreign key (id_funcionario_pago) references funcionario (id)
    );

CREATE TABLE
    matricula (
        id INTEGER (10) PRIMARY KEY auto_increment,
        valor_matricula decimal(8, 2) not null,
        ano_lectivo varchar(255),
        data_matricula timestamp default current_timestamp,
        id_aluno INTEGER (10),
        id_disciplina INTEGER (10),
        id_funcionario INTEGER (10),
        id_plano INTEGER (10),
        foreign key (id_aluno) references aluno (id),
        foreign key (id_disciplina) references disciplina (id),
        foreign key (id_funcionario) references funcionario (id),
        foreign key (id_plano) references plano (id)
    );

CREATE TABLE
    nota (
        id INTEGER (10) PRIMARY KEY auto_increment,
        ano_lectivo varchar(255),
        valor_nota decimal(4, 2),
        tipo_nota varchar(255),
        trimestre enum ('I Trimestre', 'II Trimestre', 'III Trimestre'),
        data_lancamento timestamp default current_timestamp,
        id_matricula INTEGER (10) not null,
        id_funcionario INTEGER (10),
        id_turma INTEGER (10),
        id_aluno integer (10),
        foreign key (id_matricula) references matricula (id),
        foreign key (id_funcionario) references funcionario (id),
        foreign key (id_turma) references turma (id),
        foreign key (id_aluno) references aluno (id)
    );

CREATE TABLE
    alocamentoFuncao (
        id INTEGER (10) PRIMARY KEY auto_increment,
        ano_lectivo varchar(255),
        data_cadastro timestamp default current_timestamp,
        id_funcao INTEGER (10),
        id_funcionario INTEGER (10),
        foreign key (id_funcao) references funcao (id),
        foreign key (id_funcionario) references funcionario (id)
    );

CREATE TABLE
    alocamentoProfessores (
        id INTEGER (10) PRIMARY KEY auto_increment,
        ano_lectivo varchar(255),
        data_cadastro timestamp default current_timestamp,
        id_disciplina INTEGER (10),
        id_funcionario INTEGER (10),
        foreign key (id_disciplina) references disciplina (id),
        foreign key (id_funcionario) references funcionario (id)
    );

CREATE TABLE
    alocamentoAlunos (
        id INTEGER (10) PRIMARY KEY auto_increment,
        ano_lectivo varchar(255),
        data_cadastro timestamp default current_timestamp,
        id_aluno integer (10),
        id_turma INTEGER (10),
        id_matricula INTEGER (10),
        foreign key (id_aluno) references aluno (id),
        foreign key (id_turma) references turma (id),
        foreign key (id_matricula) references matricula (id)
    );