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

   it("should get order by user id", async (): Promise<void> => {
      const result: any = await store.show(1);
      expect(result).toEqual(
         jasmine.objectContaining({
            first_name: "Admin",
            last_name: "Saud",
         })
      );
   });
});