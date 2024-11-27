
Create database codeentournant;
use codeentournant;


Create table usuario(
idUsuario int primary key auto_increment,
Nome varchar(100),
Email varchar(100),
Senha varchar(100)
);

create table historico(
id_historico int auto_increment primary key,
QtdPerguntas int,
QtdAcertos int,
Fkusuario int,
fkQuiz int,
constraint FkQuiz FOREIGN KEY (fkQuiz)
references quiz (idQuiz),
constraint Fkusuario FOREIGN KEY (fkUsuario)
references usuario (idUsuario)
);

create table quiz (
idQuiz int auto_increment primary key,
nome varchar(45)
);


insert into quiz values
(default, 'QuizHistória'),
(default, 'QuizArtigos');


