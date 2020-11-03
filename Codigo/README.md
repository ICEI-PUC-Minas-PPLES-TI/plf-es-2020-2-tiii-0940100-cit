# CIT
<img src="https://i.imgur.com/LzqlP5N.png" alt="Logo Cit" width="200"/>

### install dependencies

[Download NPM](https://www.npmjs.com/get-npm)
ou [Download Yarn](https://classic.yarnpkg.com/pt-BR/docs/install/#windows-stable)

$ npm install # Or yarn install

### serve with hot reload at localhost:3000
$ npm run dev

### build for production and launch server
$ npm run build
$ npm start

### Folder Structure

📦Codigo

 ┣ 📂api                  # Express backend routes

 ┃ ┣ 📂routes             # API Routes
 
 ┃ ┣ 📂utils              # Utilities used on routes
 
 ┃ ┣ 📜index.js           # Config file for express.js and contains route imports
 
 ┣ 📂assets               # Contains uncompiled assets such as styles, images, or fonts.
 
 ┣ 📂components           # Vue.js Component's folder
 
 ┣ 📂layouts              # Contains layout files for routes (Optional)
 
 ┣ 📂middleware           # Contains custom JavaScript functions that run right before a page or group of pages
 
 ┣ 📂pages                # Contains your application's views and routes
 
 ┣ 📂plugins              # Contains custom js libraries
 
 ┣ 📂static               # Files mapped to the server root (Ex: Robots.txt, favicon.ico)
 
 ┣ 📂store                # Custom files used in vuex
 
 ┣ 📜nuxt.config.js       # Config file for Nuxt.js
