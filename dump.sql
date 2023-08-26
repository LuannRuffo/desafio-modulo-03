create database dindin;

create table usuarios (
  id serial primary key,
  nome varchar(50),
  email varchar(50) unique,
  senha varchar(150)
  );

create table categorias (
  id serial primary key,
  usuario_id integer references usuarios(id),
  descricao text
);

create table transacoes (
	id serial primary key,
 	descricao text,
  valor int,
  data timestamp,
  categoria_id integer references categorias(id),
  usuario_id integer references usuarios(id),
  tipo varchar(50)
);