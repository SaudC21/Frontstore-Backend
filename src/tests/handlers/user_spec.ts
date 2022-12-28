import supertest from "supertest";
import app from "../../server";

const req = supertest(app);

describe("User Model", () => {
   it('should check the users route unsuccessfully', async (): Promise<void> => {
      const res: any = await req.get('/users');
      expect(res.statusCode).toBe(200);
    });
});