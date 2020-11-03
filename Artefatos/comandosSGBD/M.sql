-- Selecionar um usuário tipo organização (caso exista), cuja senha, email e id de empresa sejam encontrados, utilizar criptografia MD5 para senha. (Tutorial)

SELECT *
FROM organizacao_usuario
WHERE email = 'ggabriel@sga.pucminas.br'
	AND senha = MD5('654321')