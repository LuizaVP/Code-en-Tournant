Create database codeentournant;
use codeentournant;

Create table usuario(
idUsuario int primary key auto_increment,
Nome varchar(100),
Email varchar(100),
Senha varchar(100)
);

create table historico_quiz(
dtJogada DATETIME,
QtdAcertos int,
Fkusuario int,
constraint Fkusuario FOREIGN KEY (fkUsuario)
references usuario (idUsuario));


-- total de quizzes realizados pelos usuários
SELECT usuario.Nome, COUNT(quiz.Fkusuario) AS TotalQuizzes
FROM usuario
LEFT JOIN quiz ON usuario.idUsuario = quiz.Fkusuario
GROUP BY usuario.Nome;

-- selecionar os usuários que ainda nao realizaram nenhum quiz
SELECT usuario.Nome
FROM usuario
LEFT JOIN quiz ON usuario.idUsuario = quiz.Fkusuario
WHERE quiz.Fkusuario IS NULL;



