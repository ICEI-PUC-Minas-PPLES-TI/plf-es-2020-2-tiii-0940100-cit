SELECT id, descricao, criado_em, anonimo, cidadao_id, organizacao_usuario_id,  GROUP_CONCAT(url) as url
FROM denuncia_contribuicao dc
LEFT JOIN denuncia_contribuicao_foto dcf
ON dc.id = dcf.denuncia_contribuicao_id
WHERE dc.denuncia_id = 1
GROUP BY dc.id;