# Projeto RPG com Nest

### Rotas da aplicação

- GET /users/login
Headers : {  "Authorization": "Bearer token" }
Response : {
  user
}

- POST auth/login
Body : {
  "email" : "userexemple@gmail.com",
  "password" : "senha123",
},
Response : {
  "access_token" : "token"
}

- POST /auth/register
Body : {
  "email" : "user@exemple.com",
  "password" : "senha123"
}
Response : {
  ""
}