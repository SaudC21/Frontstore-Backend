import express, { Request, Response } from 'express'
import { User, userStore } from '../models/user'

const store = new userStore();

const index = async (_req: Request, res: Response) => {
   try {
      const user = await store.index();
      res.json(user);
   } catch (error) {
      res.status(400)
      res.json(error)
   }
}

const show = async (req: Request, res: Response) => {
   try {
      const user = await store.show(req.body.id);
      res.json(user);
   } catch (error) {
      res.status(400)
      res.json(error)
   }
}

const create = async (req: Request, res: Response) => {
   try {
      const user: User = {
         first_name: req.body.first_name,
         last_name: req.body.last_name,
         username: req.body.username,
         password: req.body.password,
      }
      const userRecord = await store.create(user);
      res.json(userRecord);
   } catch (error) {
      res.status(400)
      res.json(error)
   }
}

const authenticate = async (req: Request, res: Response) => {
   try {
     const username = req.body.username as unknown as string
     const password = req.body.password as unknown as string
 
     if (username === undefined || password === undefined) {
       res.status(400)
       res.send("Some required parameters are missing! eg. :username, :password")
       return false
     }
 
     const user: User | null = await store.authenticate(username, password)
 
     if (user === null) {
       res.status(401)
       res.send(`Wrong password for user ${username}.`)
 
       return false
     }
 
     //res.json(getTokenByUser(user))
   } catch (e) {
     res.status(400)
     res.json(e)
   }
}

const destroy = async (req: Request, res: Response) => {
   try {
      const deleted = await store.delete(req.body.id);
      res.json(deleted);
   } catch (error) {
      res.status(400)
      res.json(error)
   }
}

const userRoutes = async (app: express.Application) => {
   app.get('/users', index)
   app.get('/users/:id', show)
   app.post('/users/create', create)
   app.post('/users/authenticate', create)
   app.delete('/users/:id', destroy)
}

export default userRoutes