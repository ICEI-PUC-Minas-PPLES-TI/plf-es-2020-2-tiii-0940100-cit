-- Criar um INSERT de um usuário tipo instituição

INSERT INTO organizacao_usuario (nome, email, senha, organizacao_id)
VALUES ('Guilherme Gabriel', 'ggabriel@sga.pucminas.br', MD5('654321'), 5);