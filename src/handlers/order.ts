import express, { Request, Response } from 'express'
import { Order, orderStore } from '../models/order'
import verifyAuthToken from './middleware/verifyAuthToken';

const store = new orderStore();

const index = async (_req: Request, res: Response) => {
   try {
      const order = await store.index();
      res.json(order);
   } catch (error) {
      res.status(400);
      res.json(error);
   }
}

const show = async (req: Request, res: Response) => {
   try {
      const order = await store.show(req.body.id);
      res.json(order);
   } catch (error) {
      res.status(400);
      res.json(error);
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
      res.status(400);
      res.json(error);
   }
}

const update = async (req: Request, res: Response) => {
   try {
      const order: Order = {
         product_id: req.body.product_id,
         quantity: req.body.quantity,
         user_id: req.body.user_id,
         status: req.body.status,
      }
      const result = await store.update(order);
      res.json(result);
   } catch (error) {
      res.status(400);
      res.json(error);
   }
}

const destroy = async (req: Request, res: Response) => {
   try {
      const deleted = await store.delete(req.body.id);
      res.json(deleted);
   } catch (error) {
      res.status(400);
      res.json(error);
   }
}

const createOrderProduct = async (req: Request, res: Response) => {
   const OrderProduct = {
      quantity: req.body.quantity,
      order_id: req.body.order_id,
      product_id: req.body.product_id,
   }

   try {
      const orderProductRecord = await store.createOrderProduct(OrderProduct);
      res.json(orderProductRecord);
   } catch (error) {
      res.status(400);
      res.json(error);
   }
}

const deleteOrderProduct = async (req: Request, res: Response) => {
   const orderProduct_id = req.body.orderProduct_id;
   try {
      const orderProductRecord = await store.deleteOrderProduct(orderProduct_id);
      res.json(orderProductRecord);
   } catch (error) {
      res.status(400);
      res.json(error);
   }
}

const orderRoutes = async (app: express.Application) => {
   app.get('/orders', index);
   app.get('/orders/:id', show);
   app.post('/orders', verifyAuthToken, create);
   app.put('/orders/:id', verifyAuthToken, update);
   app.delete('/orders/:id', verifyAuthToken, destroy);
   app.post('/orders/products', verifyAuthToken, createOrderProduct);
   app.delete('/orders/products', verifyAuthToken, deleteOrderProduct);
}

export default orderRoutes;