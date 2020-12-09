SELECT d.id, d.descricao, d.criado_em, d.anonimo, d.denuncia_id, d.cidadao_id, d.organizacao_usuario_id, GROUP_CONCAT(f.url) as 'urls_fotos' -- O group_concat vai concatenar todas as imagens contribuidas em uma mesma denuncia, de um cidadao especifico
FROM denuncia_contribuicao d
INNER JOIN denuncia_contribuicao_foto f ON d.denuncia_id = f.denuncia_contribuicao_id -- Achar as fotos de uma mesma denúncia
WHERE d.cidadao_id = 1 -- Passar o ID do cidadao que deseja procurar
ORDER BY d.criado_em desc;