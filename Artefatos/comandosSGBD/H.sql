SELECT *
FROM denuncia_contribuicao dc
LEFT JOIN denuncia_contribuicao_foto dcf
ON dc.id = dcf.denuncia_contribuicao_id
WHERE dc.denuncia_id = 1;