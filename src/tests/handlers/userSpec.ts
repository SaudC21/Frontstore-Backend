import { User, userStore } from "../../models/user";
import supertest from "supertest";
import app from "../../server";

const req = supertest(app);
const store = new userStore();

describe("User Handler", () => {
   it("shoud check users methods", () => {
      expect(store.index).toBeDefined();
      expect(store.show).toBeDefined();
      expect(store.create).toBeDefined();
      expect(store.authenticate).toBeDefined();
      expect(store.update).toBeDefined();
      expect(store.delete).toBeDefined();
   });

   it("check index route - Unauthorized Access", async () => {
      const result = await req.get("/users");
      expect(result.status).toEqual(401);
   });

   it("check show route - Unauthorized Access", async () => {
      const result = await req.get("/users/1");
      expect(result.status).toEqual(401);
   });

   it("check create route - Not Found", async () => {
      const result = await req.post("/users/create").send({
         first_name: "Test",
         last_name: "User",
         username: "test-user",
         password: "password",
      });
      expect(result.status).toEqual(404);
   });

   it("check update route - Unauthorized Access", async () => {
      const result = await req.put("/users/1");
      expect(result.status).toEqual(401);
   });

   it("check delete route - Unauthorized Access", async () => {
      const result = await req.delete("/users/1");
      expect(result.status).toEqual(401);
   });

   it("check authenticate route - Bad Request", async () => {
      const result = await req.post("/users/authenticate").send({
         username: "test-user",
         password: "password",
      });
      expect(result.status).toEqual(400);
   });
});