# API de gerenciamento de dieta

## Sobre o Projeto

Essa API de gerenciamento de dieta foi desenvolvida com NodeJS tendo o intuito de melhorar minhas habilidades em Fastify, migrations, knex, cookies, CRUD, middlewares e gerenciamento de sessões

## 🛠️ Construído com

* [Typescript](https://www.typescriptlang.org/) - A linguagem de programação usada
* [Fastify](https://fastify.dev/) - O framework web usado
* [Knex](https://knexjs.org/) - ORM utilizada
* [SQLite](https://www.sqlite.org/) - Banco de dados usado


## Requisitos funcionais

- [x] O usuário deve poder criar uma conta;
- [x] O usuário deve poder criar uma refeição;
- [x] O usuário deve poder listar todas as refeições que já ocorreram;
- [x] O usuário deve poder deletar uma refeição;
- [x] O usuário deve poder atualizar uma refeição;
- [x] O usuário deve listar a quantidade de refeições totais, as refeições na dieta e as que nao estao na dieta

## Requisitos não funcionais

- [x] A refeição deve ter nome, descrição e se estão na dieta ou não;
- [x] Deve ser possível identificarmos o usuário entre as requisições;
- [x] O usuário só pode visualizar transações o qual ele criou;
- [x] O usuário só pode modificar transações o qual ele criou;
