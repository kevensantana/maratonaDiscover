const express = require('express')
const routes = express.Router()

const views = __dirname + "/views/"

const Profile = {
   data: {
      name: "keven Santana",
      avatar: "https://avatars.githubusercontent.com/u/44447313?v=4",
      "monthly-budget": 3000,
      "hours-per-day": 5,
      "days-per-week": 5,
      "vacation-per-year": 4,
      "value-hour": 75
   },

   controllers:{
      index(req, res){
         return res.render(views + "profile", { profile: Profile.data })
      },

      update(){
         //req.body para pegar os dados
         

      }
   },
}


const Job = {

   data: [
      {
         id: 1,
         name: "Pizzaria",
         "daily-hours": 2,
         "total-hours": 1,
         created_at: Date.now()
      },
      {
         id: 2,
         name: "OneTwo Project",
         "daily-hours": 3,
         "total-hours": 47,
         created_at: Date.now()
      }
   ],

   controllers: {
      index(req, res){
         const updatedJobs = Job.data.map((job) => {
            //ajustes no job
            const remaining = Job.services.remainingDays(job);
            const status = remaining <= 0 ? 'done' : 'progress'

            return {
               ...job,
               remaining,
               status,
               budget: Profile.data["value-hour"] * job["total-hours"]
            }
         })

         return res.render(views + "index", { jobs: updatedJobs })
      },
      
      create(req, res){
         return res.render(views + "job")
      },

      save(req, res){
         //calculo do id
         const lastId = Job.data[Job.data.length - 1]?.id || 1;

         Job.data.push({
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now()//atribuindo data de Hoje
         })

         return res.redirect('/')
      },
   },

   services:{
      remainingDays(job) {
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
   }
}

//GET
routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.get('/job-edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', Profile.controllers.index)


//POST  
routes.post('/job', Job.controllers.save)
routes.post('/profile', Profile.controllers.update)

module.exports = routes;