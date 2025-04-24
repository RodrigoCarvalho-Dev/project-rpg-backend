# Projeto RPG com Nest

### Rotas da aplicação

- GET /users/login
Headers : {  "Authorization": "Bearer token" }
Response : {
  "email" : "userexemple@gmail.com"
  "password" : "senha123"
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

## Envio de Emails

- POST /mail/send
Body : {
  "to": "user@example.com",
  "subject": "Confirmação de e-mail",
  "html": "<h1>Olá!</h1><a href='...'>Confirmar</a>",
  "text": "Olá! Confirme em: ..."
}