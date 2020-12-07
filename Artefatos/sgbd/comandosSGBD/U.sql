-- Para cidadao:
UPDATE denuncia_contribuicao d
SET d.descricao = 'Explodiu um hidrante aqui vei'
WHERE d.id = 1 AND d.cidadao_id=1; -- Tem que receber o ID da contribuicao que deseja alterar e id de qual cidadao 

-- Para organizacao:
/* UPDATE denuncia_contribuicao d
SET d.descricao = 'Hidrante arrumado.'
WHERE d.id = 1 AND d.organizacao_usuario_id=1; -- Tem que receber o ID da contribuicao que deseja alterar e id de qual organizacao */
