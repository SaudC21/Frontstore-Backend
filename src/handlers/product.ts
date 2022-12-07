import express, { Request, Response } from 'express'
import { Product , productStore } from '../models/product'

const store = new productStore();

const index = async (_req: Request, res: Response) => {
   try {
      const product = await store.index();
      res.json(product);
   } catch (error) {
      res.status(400)
      res.json(error)
   }
}

const show = async (req: Request, res: Response) => {
   try {
      const product = await store.show(req.body.id);
      res.json(product);
   } catch (error) {
      res.status(400)
      res.json(error)
   }
}

const create = async (req: Request, res: Response) => {
   try {
      const product: Product = {
         name: req.body.name,
         price: req.body.price,
      }
      const productRecord = await store.create(product);
      res.json(productRecord);
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

const productRoutes = async (app: express.Application) => {
   app.get('/products', index)
   app.get('/products/:id', show)
   app.post('/products', create)
   app.delete('/products/:id', destroy)
}

export default productRoutes