import { userStore } from "../../models/user";

const store = new userStore();

const userInstance = {
   first_name: "John",
   last_name: "Doe",
   username: "johndoe-user-model-test",
   password_digest: "password",
};

describe("User Model", () => {
   it("should create a user", async (): Promise<void> => {
      const result: any = await store.create(userInstance);
      expect(result).toEqual(
         jasmine.objectContaining({
            first_name: "John",
            last_name: "Doe",
            username: "johndoe-user-model-test",
         })
      );
   });

   it("should index 1st user", async (): Promise<void> => {
      const result = await store.index();
      expect(result).toContain(result[0]);
   });

   it("should get user by user id", async (): Promise<void> => {
      const result: any = await store.show(3);
      expect(result).toEqual(
         jasmine.objectContaining({
            first_name: "AboDa7m",
            last_name: "3TB",
         })
      );
   });

   it("shouldn't update user with id 1", async (): Promise<void> => {
      const user_data = {
         first_name: "John-updated",
         last_name: "Doe-updated",
         username: "johndoe-updated",
         password_digest: "password",
         id: "4",
      };
      const result: any = await store.update(user_data);
      expect(result).toEqual(undefined);
   });

   it("should delete user with id 1", async (): Promise<void> => {
      const result: any = await store.delete(5);
      expect(result).toEqual(undefined);
   });

   it("shouldn't authenticate user", async (): Promise<void> => {
      const result: any = await store.authenticate(
         "johndoe-user-model-test",
         "password"
      );
      expect(result).toEqual(null);
   });
});