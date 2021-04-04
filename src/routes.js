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
    "value-hour":75
}

const jobs = [
    {
        id: 1,
        name:"Pizzaria",
        "daily-hours": 2,
        "total-hours": 1,
        created_at: Date.now()
    },
    {
        id: 2,
        name:"OneTwo Project",
        "daily-hours": 3,
        "total-hours": 47,
        created_at: Date.now()
    }
]


function remainingDays(job){
    //Caluclo de tempo restante 
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

    //criando uma data 
    const createdDate = new Date(job.created_at);
    const dueDay = createdDate.getDate() + Number(remainingDays);
    const dueDateInMs = createdDate.setDate(dueDay);

    const timeDiffInMs = dueDateInMs - Date.now();
    //transformar Ms em dias 
    const dayInMs = 1000 * 60 * 60 * 24;
    const dayDiff = Math.floor(timeDiffInMs / dayInMs);

    //restam x dias
    return dayDiff;
        
}

//GET
routes.get('/', (req, res) => {


    const updatedJobs = jobs.map((job) => {
        //ajustes no job
        const remaining = remainingDays(job);
        const status = remaining <= 0 ? 'done' : 'progress' 

        return{
            ...job,
            remaining,
            status,
            budget: profile["value-hour"] * job["total-hours"]
        }
    })


    return res.render(views + "index", { jobs: updatedJobs })
})




routes.get('/job', (req, res) => res.render(views + "job"))
routes.get('/job-edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", {profile}))

//POST  
routes.post('/job', (req, res) => {   
    //calculo do id
    const lastId = jobs[jobs.length - 1]?.id || 1;

    jobs.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now()//atribuindo data de Hoje
    })
    return res.redirect('/')
})

module.exports = routes;