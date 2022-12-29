import { Order, orderStore } from "../../models/order";
import supertest from "supertest";
import app from "../../server";

const req = supertest(app);
const store = new orderStore();

describe("Order Handler", () => {
   it("check orders routes", () => {
      expect(store.index).toBeDefined();
      expect(store.show).toBeDefined();
      expect(store.create).toBeDefined();
      expect(store.update).toBeDefined();
      expect(store.delete).toBeDefined();
   });

   it("check index route - OK", async () => {
      const result = await req.get("/orders");
      expect(result.status).toEqual(200);
   });

   it("check show route - OK", async () => {
      const result = await req.get("/orders/1");
      expect(result.status).toEqual(200);
   });

   it("check create route - Unauthorized Access", async () => {
      const result = await req.post("/orders/create");
      expect(result.status).toEqual(401);
   });

   it("check update route - Unauthorized Access", async () => {
      const result = await req.put("/orders/1");
      expect(result.status).toEqual(401);
   });

   it("check delete route - Unauthorized Access", async () => {
      const result = await req.delete("/orders/1");
      expect(result.status).toEqual(401);
   });
});