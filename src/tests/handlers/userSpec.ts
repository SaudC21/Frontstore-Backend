import { User, userStore } from "../../models/user";

const store = new userStore();

const userInstance = {
   first_name: "John",
   last_name: "Doe",
   username: "johndoe-user-model-test",
   password_digest: "$2b$10$QoGUepjfOZCQWVSR8F8x9.Sa0UQWwBzBcxMXmNlLtwD9pMKu9PdUK",
};

describe("User Model", () => {
   it("shoud check users routes", () => {
      expect(store.index).toBeDefined();
      expect(store.show).toBeDefined();
      expect(store.create).toBeDefined();
      expect(store.authenticate).toBeDefined();
      expect(store.update).toBeDefined();
      expect(store.delete).toBeDefined();
   });

   it("should create a user", async (): Promise<void> => {
      const result = await store.create(userInstance);
      expect(result).toEqual({
         first_name: "John",
         last_name: "Doe",
         username: "johndoe-user-model-test",
         password_digest: "$2b$10$QoGUepjfOZCQWVSR8F8x9.Sa0UQWwBzBcxMXmNlLtwD9pMKu9PdUK",
      });
   });

   it("should index 1st user", async (): Promise<void> => {
      const result = await store.index();
      expect(result).toContain(result[0]);
   });

   it("should show user with id 1", async (): Promise<void> => {
      const result: any = await store.show(1);
      expect(result).toEqual({
         id: 1,
         first_name: "John",
         last_name: "Doe",
         username: "johndoe-user-model-test",
         password_digest: "$2b$10$QoGUepjfOZCQWVSR8F8x9.Sa0UQWwBzBcxMXmNlLtwD9pMKu9PdUK",
      });
   });
});