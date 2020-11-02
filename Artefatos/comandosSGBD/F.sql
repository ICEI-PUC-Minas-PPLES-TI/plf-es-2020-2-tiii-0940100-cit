SELECT c.id as 'cidadao_id', d.id as 'denuncia_id', d.descricao, d.criado_em, d.anonimo, d.denuncia_id, d.cidadao_id, d.organizacao_usuario_id, GROUP_CONCAT(f.url) as 'urls_fotos'
FROM cidadao c
INNER JOIN denuncia_contribuicao d ON c.id = d.cidadao_id
INNER JOIN denuncia_contribuicao_foto f ON d.denuncia_id = f.denuncia_contribuicao_id
WHERE c.id = 1 -- Passar o ID do cidadao que deseja procurar
ORDER BY d.criado_em desc;