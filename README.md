# Teste técnico

## Instruções gerais
Os Kapivaras trabalham em um ambiente dinâmico, com grandes responsabilidades e muitas decisões que devem ser tomadas rapidamente. Nesta fase iremos ter um teste técnico. #dreamteam #kapivara
Leia atentamente as instruções abaixo para a realização do teste proposto.
Você terá em torno de 72h para realizar o teste proposto.
_____________________________________________

## OBJETIVO
Deverá construir uma API RESTful usando a tecnologia NodeJS.


## REQUISITOS
    ● Criar contas testes nas plataformas Pipedrive e Bling.
    ● Criar uma integração entre as plataformas Pipedrive e Bling. (A integração deve buscar as oportunidades com status igual a ganho no Pipedrive, depois inseri-las como pedido no Bling).
    ● Criar banco de dados mongo, existem serviços como MongoDB Atlas para criar de graça
    ● Criar uma collection no banco de dados MongoDB agregando as oportunidades inseridas no Bling por dia e valor total.
    ● Criar endpoint para trazer os dados consolidados da collection do MongoDB.

## INSTRUÇÕES
    ● Desenvolva e versione o projeto usando git
    ● Utilize o GitHub para hospedar o código
    ● Enviar o link do repositório para people@linkapi.com.br

## O QUE SERÁ AVALIADO
    ● Quantidade de requisitos realizados
    ● Desacoplamento de código
    ● Legibilidade
    ● Boas práticas de desenvolvimento de API RESTful
    ● Performance


## Iniciando o projeto

Para iniciar o projeto siga os passos abaixo.

### Criar .env do projeto

```dotenv
# MONGODB
MONGO_URL="mongodb://localhost:27017/linkapi" <-- mongo db rodando na porta 27017

# EXPRESS PORT
EXPRESS_PORT="3000" <-- porta configuravel da app 



INTEGRATION_PIPEDRIVE_TOKEN="" <- token do pipedrive
INTEGRATION_PIPEDRIVE_BASE_URL="https://api.pipedrive.com/v1"

INTEGRATION_BLING_TOKEN="" <- token do bling
INTEGRATION_BLING_BASE_URL="https://bling.com.br/Api/v2"

### Instalando dependências.
yarn install


### Comando para rodar a integração
yarn integration:run

### Iniciando o projeto 
yarn dev

### Pegar todas as oportunidades

```shell
  curl --location --request GET 'http://localhost:3000/api/opportunities?page=1&limit=10'
```
