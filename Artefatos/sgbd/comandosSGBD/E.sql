-- Selecionar todas as denuncias que a empresa (Filtro de ID da empresa) atende dentro da cidade da mesma (Utilizando a tabela de Categoria como mediadora)

SELECT d.*, MIN(dco.descricao) AS contribuicao, MIN(dco.criado_em) AS criado_em
FROM denuncia_has_categoria dc
INNER JOIN organizacao_has_categoria oc ON oc.categoria_id=dc.categoria_id
INNER JOIN denuncia d ON d.id=dc.denuncia_id
INNER JOIN categoria c ON c.id=dc.categoria_id
INNER JOIN organizacao o ON o.uf=d.uf AND o.cidade=d.municipio
INNER JOIN denuncia_contribuicao dco ON dco.denuncia_id=d.id
WHERE o.id=3
