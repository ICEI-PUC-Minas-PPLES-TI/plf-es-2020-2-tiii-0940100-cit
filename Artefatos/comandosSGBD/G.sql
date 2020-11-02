SELECT COUNT(d.id) as 'qtd_contribuicoes'
FROM cidadao c
INNER JOIN denuncia_contribuicao d ON c.id = d.cidadao_id
WHERE d.cidadao_id = 1 -- Passar o ID do cidadao que deseja procurar
GROUP BY (d.denuncia_id);