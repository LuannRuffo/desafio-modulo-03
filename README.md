# Desafio Módulo 3 - curso de desenvolvimento de software foco em Backend

## Tecnologias ultilizada no projeto

![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![SQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![jwt](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)



## ⭐Cadastrar usuário

-   validei campos no corpo(body)

    -  nome
    -  email
    -  senha

-   verifiquei email se já foi cadastrado
-   criptografei senha antes de salvar no banco de dados
-   cadastrei usuario e retornar status correto


## ⭐Fazer Login

-   verifiquei campos no corpo(body)

    -   email
    -   senha

-   verifiquei email se já foi cadastrado ou existe
-   verifiquei se a senha confere com o email
-   criei token de autentição com id do usuário


## ⭐Validações do token

-   verifiquei se o token foi informado no header da requisição
-   verifiquei se o token está valido
-   consultar usuário no banco de dados pelo id informado no token


## ⭐Detalhar usuário

-   mostrar dados do usuário com o id do token informado no login

## ⭐Atualizar usuário

-   verifiquei campos no corpo(body)

    -   nome
    -   email
    -   senha

-   validei o email se existe no banco de dados, caso exista não sera possivel a atualização
-   criptografei a senha antes de salvar no banco de dados
-   atualizar o usuário com o id informado no token e retornei status correto

## ⭐Criar categoria para usuário logado

-   verifiquei campos no corpo(body)
    -   descrição
-   cadastrei e vinculei ao usuário com o id informado no token de login
-   retornei os dados da categoria e o id de usuário

## ⭐Listar todas categorias do usuário logado

-   retornei todas as categorias vinculada ao usuário com o id informado no token

## ⭐Detalhar uma categoria vinculada ao usuário

-   verifiquei campos do parametro de rota
-   verifiquei se a categoria informada esta cadastrada
-   verifiquei se o id da categoria informado está vinculado ao usuário informado no token
-   retornei os dados da categoria informada no parametros

## ⭐Atualizar categoria do usuário logado

-   verifiquei campos no corpo(body)
    -   descrição
-   verifiquei campos do parametro de rota se esta vinculado ao usuario informado no token
-   atualizar a categoria e retornei o status correto

## ⭐Deletar categoria do usuário logado

-   verifiquei campos do parametro de rota
-   verifiquei se a categoria informada esta cadastrada
-   verifiquei se o id da categoria informado está vinculado ao usuário informado no token
-   verifiquei se há alguma transação vinculada a categoria informada
-   deletei a categoria e retornei o status correto

## ⭐Listar transações do usuário logado

-   retornei todas as transações do usuario logado

## ⭐Detalhar uma transação do usuário logado

-   verifiquei se o id da transação informado no parametro era do usuario logado
-   verifiquei se existia a transação
-   retornei todos os dados da transação

## ⭐Cadastrar transação para o usuário logado

-   verifiquei campos no corpo(body)

    -   descrição
    -   valor
    -   data
    -   categoria_id
    -   tipo
    
-   validei se a categoria pertence ao usuario logado
-   cadastrei a transação e retornei os dados da transação

## ⭐Atualizar transação do usuário logado

🚧 em construção 🚧

## ⭐Excluir transação do usuário logado

🚧 em construção 🚧

## ⭐Obter extrato de transações

🚧 em construção 🚧

## ⭐Filtrar transações por categoria

🚧 em construção 🚧