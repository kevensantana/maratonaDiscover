const express = require("express")
const server = express()
const routes = require("./routes")

// Template engine
server.set('view engine', 'ejs')

//Habilitar arquivos statics
server.use(express.static("public"))

// Usar req.body
server.use(express.urlencoded({extended: true}))

//Routes
server.use(routes)

server.listen(3000, () => console.log('rodando'))[[



]]