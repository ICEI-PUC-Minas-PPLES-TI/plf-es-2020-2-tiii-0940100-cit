# Cit - Por uma cidade melhor

<p>   O Cit, busca possibilitar os cidadãos de fazerem denúncias dos problemas estruturais de suas cidades, por meio do envio de provas(Ex: fotos de buracos no asfalto, rede elétrica no meio de árvores, entre outros.) e informando o endereço do problema. Dessa forma, outros usuários da região, podem assim, votar na existência e correção para aquele transtorno.</p>
<p>   Diante disso, os dados poderão ser visualizados pelas contas que se cadastrarem como entidades aptas a receberem denúncias de problemas das respectivas localizações, como a prefeitura e/ou estado, que poderão corrigi-los, com isso, melhorando a qualidade de vida para todos. E os usuários comuns(os que fazem as denúncias), contam com a função de ver o ranking das melhores cidades, que poderia ser utilizado em diversas formas e ocasiões(Ex: um prefeito ser eleger por meio da divulgação dos seus resultados na cidade.).</p>

## Integrantes

* Guilherme Gabriel Silva Pereira
* Henrique Penna Forte Monteiro
* José Maurício Guimarães França
* Lucas Ângelo Oliveira Martins Rocha
* Marco Tullio Oliveira

## Professor

* Hugo Bastos De Paula
* Joyce Christina De Paiva Carvalho

## Instruções de utilização

### Instalação do Banco de Dados
1. Rodar o script /artefatos/sgbd/cit.sql em um servidor contendo o SGBD Mysql

### Instalação da API
1. Na raiz da pasta de API /codigo/api, instalar os pacotes utilizando `npm install`. O npm gerencia apenas as depêndencias do servidor
2. Inicie o projeto com `npm start` ou `nodemon` caso você tenha instalado na sua maquina.
3. Copie o arquivo de váriaveis de ambiente utilizando `cp .env-example .env`
4. Altere as váriaveis de ambiente para as informações do banco de dados a ser utilizado
### Instalação do Site
O site em HTML/CSS/JS é um projeto estático, logo pode ser utilizado tanto em servidores apache2 ou nginx e em sites de hospedagens estáticos como AWS S3 ou Heroku, basta fazer o upload do conteúdo da pasta /codigo. Dentro da pasta /codigo/assets/js existe um arquivo cit.js que possue uma váriavel contento o ip apontando para o servidor da API, altere para o ip do servidor de backend.


## Histórico de versões

#### [1.0.1] - 10/12/2020
##### Adicionado
* Adicionado slides de apresentação
* Adicionado vídeo de apresentação
* Adicionado resumo
* Adicionado seção de uso de software na documentação 
* Adicionado seção de avaliação na documentação 
* Adicionado seção de conclusão na documentação 
* Adicionado ata da décima terceira e décima quarta reunião

##### Atualizado
* Correções de erros na documentação
#### [1.0.0] - 03/12/2020
##### Adicionado
* Adicionado apêndices na documentação
* Adicionado frontend e backend de contribuição de usuário de organização
* Adicionado backend de contribuição de cidadão
* Adicionado upload de fotos em contribuições e denúncias novas
* Adicionado bloqueio de permissão em telas especificas do tipo de usuário

##### Atualizado
* Atualizado projeto de solução na documentação
* Correções de bugs
#### [0.3.2] - 26/11/2020
##### Adicionado
* Adicionado frontend e backend da tela de monitoramento de spam
* Adicionado frontend e backend de criação de usuário de organização
* Adicionado backend da dashboard de organização
* Adicionado backend da dashboard de cidadão
* Adicionado backend da página de cadastrar denúncia
* Adicionado backend da página de visualizar denúncia
* Adicionado token de sessão para login de usuários
##### Atualizado
* Correções na geolocalização do mapa
* Corregido ordenação em ranking de organização
* Correções de bug no mapa
* Atualizado DER

#### [0.3.1] - 19/11/2020
##### Adicionado
* Adicionado frontend e backend de funcionalidade do mapa para selecionar o local da denúncia
* Adicionado frontend e backend da dashboard de admin com indicadores
* Adicionado frontend e backend do ranking de cidades
* Adicionado frontend da dashboard de cidadão
* Adicionado frontend da dashboard de organização
* Adicionado frontend da página de cadastrar denúncia
* Adicionado frontend da página de visualizar denúncia
* Adicionado frontend da página de contribuição da denúncia pelo cidadão
* Adicionado váriaveis de ambiente para conexão com banco
* Adicionado ata da décima segunda reunião
##### Atualizado
* Corrigido da tela de cadastro
* Correções na responsividade 
* Alterado caminho de scripts

#### [0.3.0] - 12/11/2020
##### Adicionado
* Adicionado segunda versão do frontend, com a remoção do framework vue
##### Atualizado
* Corrigido responsividade de tela inicial
* Corrigido consultas SQL

#### [0.2.0] - 05/11/2020
##### Adicionado
* Adicionado primeira versão do frontend e backend contento tela inicial, e telas de login/cadastro
* Adicionado consultas pré-preparadas do sistema em SQL
* Adicionado modelo físico do banco de dados
* Adicionado modelo lógico do banco de dados
* Adicionado ata da décima primeira reunião
##### Atualizado
* Atualizado wireframes

#### [0.1.11] - 29/10/2020
* Adicionado conteúdo de tecnologia à documentação
##### Atualizado
* Corrigido erros no DER

#### [0.1.10] - 22/10/2020
##### Adicionado
* Adicionado versão preliminar de DER
* Adicionado ata da décima reunião

#### [0.1.9] - 15/10/2020
##### Adicionado
* Adicionado requisitos funcionais 07, 08 e 09

##### Atualizado
* Realizado correções no modelo BPMN à pedido dos professores
* Simplificado requisitos funcionais 01-06

#### [0.1.8] - 08/10/2020
##### Adicionado
* Adicionado atas da oitava e nona reunião
* Adicionado versão preliminar de requisitos funcionais à documentação
##### Atualizado
* Realizado correções no modelo BPMN à pedido dos professores
* Atualizado fotos de modelagens na documentação geral

#### [0.1.7] - 01/10/2020
##### Adicionado
* Adicionado ata da sétima reunião
##### Atualizado
* Realizado correções no modelo BPMN à pedido dos professores
* Atualizado modelagens na documentação geral

#### [0.1.6] - 24/09/2020
##### Adicionado
* Adicionado atas da quinta e sexta reunião
* Adicionado versão inicial dos processos de modelagem de negócios
##### Atualizado
* Mudanças na descrição geral da proposta

#### [0.1.5] - 17/09/2020
##### Atualizado
* Correção de erros ortográficos e de concordância no relatório final
* Mudanças de layout da legendas das imagens no relatório final

#### [0.1.4] - 11/09/2020
##### Atualizado
* Correção de erros ortográficos e de concordância

#### [0.1.3] - 04/09/2020
##### Adicionado
* Adicionado conteúdo ao tópico Análise da Situação Atual
##### Atualizado
* Alterado detalhes em tópicos de Contextualização e Pesquisas
* Correção de erros ortográficos

#### [0.1.2] - 27/08/2020
##### Adicionado
* Adicionado bussiness model canvas
* Adicionado ata da segunda reunião
* Adicionado mapa de stakeholder
##### Atualizado
* Alterado introdução na documentação
* Realizado mudanças na definição de problema na documentação
* Alterado tópico de modelagem de processo na documentação
* Realizado mudanças no tópico de pesquisa
    
#### [0.1.1] - 17/08/2020
##### Adicionado
* Adicionado ata da primeira reunião
##### Atualizado
* Atualização na introdução da documentação.

#### [0.1.0] - 14/08/2020
##### Adicionado
* Adicionado primeira versão da documentação


