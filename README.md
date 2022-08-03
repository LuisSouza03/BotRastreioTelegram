# Rastreador de Encomendas

Projeto feito para fins de estudos, é um bot do telegram, onde o usuario pode
colocar seu código de rastreio (Correios) e irá trazer os dados. Também poderá consutlar o CEP.

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)

---

<br>

## ⚠️ Informação importante

Por motivos de este projeto ser somente para fins de estudo, ele não está em um servidor, caso queira rodar localmente você irá precisar criar seu próprio bot no telegram e pegar o token, é bem simples:

- No telegram procure por [@BotFahter](https://t.me/BotFather)
- Digite /start e logo após /newbot
- Poderá dar o nome que quiser
- Logo após isso ele disponibilizará um token
- "Use this token to access the HTTP API: xxxxxxxx"
- Crie um arquivo .env
- Pegue esse token e coloque no arquivo .env TOKEN=SEUTOKEN, "process.env.TOKEN" em app.ts, exemplo:
 <img src="./public/images/env.png">
- * IMPORTANTE: MANTER O 'NTBA_FIX_319=1' NO ARQUIVO .ENV
  

<br>

## 💻 Demonstração

Para iniciar o bot digite /start
<br>
<img src="./public/images/Inicio.png">
<br>
<img src="./public/images/rastreio.png">
<br>
<img src="./public/images/cep.png">

--- 

<br>

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

---

<br>

### 🔧 Instalação

- Instalando as dependências:

```
yarn
```
ou
```
npm install
```

- Para rodar o projeto:

```
yarn dev
```

<br>

## 🛠️ Construído com

Mencione as ferramentas que você usou para criar seu projeto

* [correios-brasil](https://www.npmjs.com/package/correios-brasil) - API usada para trazer informações tanto da encomenda como do CEP
* [node-telegram-bot-api](https://www.npmjs.com/package/node-telegram-bot-api) - API usada para fazer a comunicação com o bot do telegram

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

### ✒️ Autor

 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/71300639?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Luis Gustavo</b></sub>


Feito por Luis Gustavo 👋🏽 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Luis-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/luisgustavoterrinha/)](https://www.linkedin.com/in/luisgustavoterrinha/) 
[![Gmail Badge](https://img.shields.io/badge/-luis93667@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:luis93667@gmail.com)](mailto:luis93667@gmail.com)

---

<br>

