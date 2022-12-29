import { productStore } from "../../models/product";
import supertest from "supertest";
import app from "../../server";

const req = supertest(app);

const store = new productStore();

describe("Product Handler", () => {
   it("shoud check product methods to be defined", () => {
      expect(store.index).toBeDefined();
      expect(store.show).toBeDefined();
      expect(store.create).toBeDefined();
      expect(store.update).toBeDefined();
      expect(store.delete).toBeDefined();
   });

   it("check index route - OK", async () => {
      const result = await req.get("/products");
      expect(result.status).toEqual(200);
   });

   it("check show route - OK", async () => {
      const result = await req.get("/products/1");
      expect(result.status).toEqual(200);
   });

   it("check create route - Unauthorized Access", async () => {
      const result = await req.post("/products/create");
      expect(result.status).toEqual(401);
   });

   it("check update route - Unauthorized Access", async () => {
      const result = await req.put("/products/1");
      expect(result.status).toEqual(401);
   });

   it("check delete route - Unauthorized Access", async () => {
      const result = await req.delete("/products/1");
      expect(result.status).toEqual(401);
   });
});