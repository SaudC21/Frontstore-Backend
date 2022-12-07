import express, { Request, Response } from 'express'
import { Order, orderStore } from '../models/order'

const store = new orderStore();

const index = async (_req: Request, res: Response) => {
   try {
      const order = await store.index();
      res.json(order);
   } catch (error) {
      res.status(400)
      res.json(error)
   }
}

const show = async (req: Request, res: Response) => {
   try {
      const order = await store.show(req.body.id);
      res.json(order);
   } catch (error) {
      res.status(400)
      res.json(error)
   }
}

const create = async (req: Request, res: Response) => {
   try {
      const order: Order = {
         product_id: req.body.product_id,
         quantity: req.body.quantity,
         user_id: req.body.user_id,
         status: req.body.status,
      }
      const orderRecord = await store.create(order);
      res.json(orderRecord);
   } catch (error) {
      res.status(400)
      res.json(error)
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

const orderRoutes = async (app: express.Application) => {
   app.get('/orders', index)
   app.get('/orders/:id', show)
   app.post('/orders', create)
   app.delete('/orders/:id', destroy)
}

export default orderRoutes