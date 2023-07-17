const express = require('express');
// const { default: knex } = require('knex');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);
const cors = require('cors')
const app = express();
const port = 8080;

app.use(cors())

app.get('/movies', (req, res) => {
  knex.select().from('movie_info')
    .then(data => {
      // console.log(data)
      res.send(data);
    })
    .catch(err => console.log(err));

});

app.listen(port, () => console.log(
  `Server is running on port: ${port}`
))

// app.post("/auth", async (req, res) =>
// {
//   let auth = await isAuth(req);
//   console.log(auth);
//   if(auth)
//   {
//     knex.raw("SELECT isadmin from profiles where username ILIKE ?", [req.body.user])
//     .then(result =>
//       {
//         if(result.rows[0]?.id)
//         {
//           res.status(200).send(JSON.stringify({message: "Authorized", user: req.body.user, admin: result.rows[0].id}))
//           return;
//         }
//         else
//         {
//           res.status(200).send(JSON.stringify({message: "Authorized", user: req.body.user, admin: false}))
//           return;
//         }

//       })
//       return;
//   }
//   res.status(401).send(JSON.stringify({message: "Not Authorized"}))
// })

// app.put("/login", (req, res) =>
// {
//   let {user, password} = req.body;
//   if(!user || !password)
//   {
//     res.sendStatus(401);
//   }
//   else
//   {

//     knex.raw(`SELECT username, (password = crypt(?, password)) AS psmatch FROM profiles WHERE ? ILIKE username`, [password, user])
//     .then(result =>
//       {
//         if(result?.rows[0])
//         {
//           //console.log(result?.rows[0].psmatch);
//           if(result.rows[0].psmatch)
//           {
//             const token = generateToken({username: user, creation: Date.now()});
//             res.status(200).json({"token": token});
//             return;
//           }
//           res.status(401).send(JSON.stringify("Invalid user or password"));
//         }
//         else
//         {
//           res.status(401).send(JSON.stringify("Invalid user or password"));
//           return;
//         }
//       })
//       .catch(err => errorCB(err));
//   }
// })
// //Add User
// app.post("/login", (req, res) =>
// {
//   let {user, password} = req.body;
//   if(!user || !password)
//   {
//     res.status(401).send(JSON.stringify("Invalid parameters"));
//   }
//   else
//   {
//     knex.raw(`INSERT INTO profiles (username, password, isadmin) VALUES (?, passwordencrypt(?), false)`, [user, password])
//     .then(result =>
//       {
//         console.log(result);
//         if(result.rows[0])
//         {
//           console.log("test");
//         }
//         const token = generateToken({username: user, creation: Date.now()});
//         res.status(200).send(JSON.stringify("User created!"));
//       })
//       .catch(err => {
//         res.status(402).send(JSON.stringify("User already exists! Did you forget your password? Guess you should have remembered it..."))
//         errorCB((err))}
//         );
//   }
// })

// //Update password! Its a copy and paste of login... except it checks if you're authorized already and updates your password upon login
// app.patch("/login", (req, res) =>
// {
//   let {user, newPassword, password} = req.body;
//   if(!user || !newPassword || !password)
//   {
//     res.status(401).send(JSON.stringify("Invalid username or password"));
//   }
//   if(isAuth(req))
//   {
//     knex.raw(`SELECT username, (password = crypt(?, password)) AS psmatch FROM profiles WHERE ? ILIKE username`, [password, user])
//     .then(result =>
//       {
//         if(result?.rows[0])
//         {
//           //console.log(result?.rows[0].psmatch);
//           if(result.rows[0].psmatch)
//           {
//             knex.raw(`UPDATE profiles SET password = passwordencrypt(?) WHERE username ILIKE ?`, [password, user]);
//             const token = generateToken({username: user, creation: Date.now()});
//             res.status(200).json(token);
//             return;
//           }
//           res.status(401).send("Invalid user or password");
//         }
//         else
//         {
//           res.status(401).send("Invalid user or password");
//           return;
//         }
//       })
//       .catch(err => errorCB(err));
//   }
// })
// //Delete user
// app.delete("/login", async (req, res) =>
// {
//   let {user, delUser} = req.body;
//   if(!user)
//   {
//     res.status(401).send("No user specificed");
//   }
//   let adminStatus = false;
//   adminStatus = await isAdmin(req);
//   if(adminStatus)
//   {
//     knex.raw(`SELECT id from profiles where username ILIKE ?`, [delUser])
//     .then(result =>
//       {
//         console.log(result);
//         knex.raw(`SELECT deleteuser(?)`, [result.rows[0].id])
//         .then(result =>
//         {
//           res.status(200).send(`User ${delUser} deleted`);
//         })
//       })
//       .catch(err =>
//         {
//           res.status(401).send(`User possibly does not exist`);
//         })

//   }
//   else
//   {
//     res.status(401).send("Unauthorized");
//   }
// })

// //Rating Backends
// app.get("/rating", (req, res) =>
// {
//   //Get everything. No user check here
//   let returnedRatings;
//   knex.raw("SELECT DISTINCT name, avgrating FROM meal_ratings JOIN meal_type ON meal_ratings.meal_type_id = meal_type.id")
//   .then((result)=>
//   {
//     //Verify we got results back. The res return is weird...
//     if(result.rows[0])
//     {
//       //It should be an array, even if the length is only 1. Format them and return it to the front end to deal with. Hopefully its
//       //an easy format for them
//       returnedRatings = result.rows.map((element)=>
//       {
//         return {name: element.name, rating: element.avgrating};
//       })
//       //Set status and return data;
//       res.status(200).send(returnedRatings);
//     }
//     else
//     {
//       //If no data was found send a 400. I dont think this is the right code but its the one I picked.
//       res.status(400).send("No data found");
//     }
//   })
//   .catch(err => errorCB(err));
// })

// //Get ratings from a specific user, should this be auth'd users only?
// app.get("/rating/:user", (req, res) =>
// {
//   let {user} = req.params;
//   let returnedRatings = {};
//   if(!user)
//   {
//     res.sendStatus(400);
//   }
//   else
//   {
//     //Almost the exact same as the get from before. Except now we get where said user exists.
//     knex.raw(`SELECT name, rating FROM meal_ratings JOIN meal_type ON meal_ratings.meal_type_id = meal_type.id AND meal_ratings.profiles_id = (select id FROM profiles WHERE username = ?)`, [user])
//     .then(result =>
//       {
//         if(result.rows[0])
//         {
//           returnedRatings['user'] = user;
//           returnedRatings.results = result.rows.map((element) =>
//           {
//             return {name: element.name, rating: element.rating};
//           })
//           res.status(200).send(returnedRatings);
//         }
//         else
//         {
//           res.status(400).send("No data found");
//         }
//       })
//       .catch(err => errorCB(err));
//   }
// })

// app.post("/rating", (req, res) =>
// {
//   updateRating(req, res);
// })
// app.put("/rating", (req, res) =>
// {
//   updateRating(req, res);
// })

// app.delete("/rating", (req, res) =>
// {
//   //Check authorization
//   if(isAuth(req))
//   {
//     //Check params and quit while we're ahead if they dont exist
//     let {user, meal_id, rating } = req.body;
//     if(!isValidParams(req.body))
//     {
//       res.sendStatus(401);
//       return;
//     }
//     else
//     {
//       //Out with the old!
//       knex.raw(`DELETE FROM meal_ratings WHERE meal_type_id = ? AND meal_ratings.profiles_id = (SELECT id FROM profiles WHERE username = ?)`, [meal_id, user])
//       .then(result =>
//         {
//           knex.raw(`SELECT calculateaveragerating(?)`, [meal_id])
//           .then(result =>
//             {
//               if(result.rows[0])
//               {
//                 console.log(result)
//                 res.status(200).send("Rating deleted!");
//               }
//             })
//         })
//         .catch(err => errorCB(err));
//     }
//   }
// })

// //endpoints for meals
// app.get('/meals', (req, res) => {
//   knex.select('*')
//     .from('meal_type')
//     .then(meals => res.status(200).json(meals))
// })

// app.get('/meals/:id', (req, res) => {
//   let { id } = req.params;
//   knex.select('*')
//     .from('meal_type')
//     .where('id', id)
//     .then(meal => {
//       if (meal.length > 0) {
//         res.status(200).json(meal)
//       } else {
//         res.status(404).send('Meal was not found')
//       }
//     })
// })

// app.post('/meals', (req, res) => {
//   knex.insert(req.body)
//     .into('meal_type')
//     .then(meals => res.status(201).send({message: 'Meal was added!'}))
// })

// app.patch('/meals/:id', (req, res) => {
//   let { id } = req.params;
//   knex('meal_type')
//     .where('id', id)
//     .update(req.body)
//     .then(() => res.status(201).send('Meal has been updated!'))
// })

// app.delete('/meals/:id', (req, res) => {
//   let { id } = req.params;
//   knex('meal_ratings')
//     .select('*')
//     .where('meal_type_id', id)
//     .del()
//     .then(() => {
//       knex('meal_schedule')
//         .select('*')
//         .where('meal_type_id', id)
//         .del()
//         .then(() => {
//             knex('meal_type')
//               .select('*')
//               .where('id', id)
//               .del()
//               .then(() => {
//                 res.status(201).send({message: 'Meal has been deleted!'})
//               })
//         })
//     })
// })

// //endpoints for meal_schedule
// app.get('/schedule', (req, res) => {
//   knex('meal_schedule')
//     .join('meal_type', 'meal_type.id', '=', 'meal_schedule.meal_type_id')
//     .select('*')
//     .then(sched => res.status(200).json(sched))
// })

// app.get('/schedule/:date', (req, res) => {
//   let { date } = req.params;
//   knex('meal_schedule')
//     .join('meal_type', 'meal_type.id', '=', 'meal_schedule.meal_type_id')
//     .select('*')
//     .where('date', date)
//     .then(sched => res.status(200).json(sched))
// })

// app.post('/schedule', (req, res) => {
//   knex.insert(req.body)
//     .into('meal_schedule')
//     .then(() => res.status(201).send('Meal was added to the schedule!'))
// })

// app.delete('/schedule/:id', (req, res) => {
//   let { id } = req.params;
//   knex('meal_schedule')
//     .select('*')
//     .where('meal_type_id', id)
//     .del()
//     .then(() => res.status(201).send('Meal was removed from the schedule'))
// })

// app.patch('/schedule/:id', (req, res) => {
//   let { id } = req.params;
//   knex('meal_schedule')
//     .where('id', id)
//     .update(req.body)
//     .then(() => res.status(201).send('Schedule has been updated!'))
// })

// app.listen(port, async ()=>
// {
//   //Debugger extension for postgres.
//   knex.raw(`DROP EXTENSION IF EXISTS pldbgapi`)
//   .then(res =>
//     {
//       console.log("Creating Debug extension");
//       knex.raw(`CREATE EXTENSION pldbgapi`)
//       .then(res =>
//         {

//         })
//         .catch(err => errorCB(err));
//     })