SELECT COUNT(DISTINCT d.denuncia_id) as 'qtd_denuncias' -- Apenas denuncias distintas, para nao contar contribuicoes de uma mesma denuncia
FROM denuncia_contribuicao d
WHERE d.cidadao_id = 1 -- Passar o ID do cidadao que deseja procurar