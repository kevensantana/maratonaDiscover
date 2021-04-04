const express = require('express')
const routes = express.Router()

const views = __dirname + "/views/"

const profile = {
    name: "keven Santana",
    avatar: "https://avatars.githubusercontent.com/u/44447313?v=4",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4,
}

//GET
routes.get('/', (req, res) => res.render(views + "index"))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.get('/job-edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", {profile}))

//POST  
routes.post('/job', (req, res) => console.log(req.body))

module.exports = routes;