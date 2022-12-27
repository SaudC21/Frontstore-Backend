import { User, userStore } from "../../models/user";

const store = new userStore();

const userInstance = {
   firstname: "Saud",
   lastname: "Chan",
   username: "chanju0352-user-model-test",
};

describe("User Model", () => {
   it("should have an INDEX method", () => {
      expect(store.index).toBeDefined();
   });
  
   it("should have a SHOW method", () => {
      expect(store.show).toBeDefined();
   });
  
   it("should have a CREATE method", () => {
      expect(store.create).toBeDefined();
   });
  
   it("should have a AUTHENTICATE method", () => {
      expect(store.authenticate).toBeDefined();
   });
  
   it("should have a UPDATE method", () => {
      expect(store.update).toBeDefined();
   });

   it("should have a DELETE method", () => {
      expect(store.delete).toBeDefined();
   });
});