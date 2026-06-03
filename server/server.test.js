import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "./server.js";

import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "./server.js"; // Importera din Express-app

describe("DIGG API Endpoints", () => {
  describe("GET /health", () => {
    it("borde returnera status 200 och status 'UP'", async () => {
      const res = await request(app).get("/health");

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("status", "UP");
      expect(res.body).toHaveProperty("uptime");
    });
  });

  describe("GET /digg/api/customers", () => {
    it("borde returnera en lista med kunder och pagineringsdata", async () => {
      const res = await request(app).get("/digg/api/customers?page=1&limit=5");

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("customers");
      expect(Array.isArray(res.body.customers)).toBe(true);
      expect(res.body.customers.length).toBeLessThanOrEqual(5);
      expect(res.body).toHaveProperty("totalPages");
      expect(res.body).toHaveProperty("currentPage", 1);
    });
  });

  describe("POST /digg/api/customers", () => {
    it("borde skapa en ny kund och returnera status 201", async () => {
      const newCustomer = {
        fullName: "Test Testsson",
        email: "test@digg.se",
        phone: "123456",
        adress: "Testgatan 1",
      };

      const res = await request(app)
        .post("/digg/api/customers")
        .send(newCustomer);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body.fullName).toBe("Test Testsson");
      expect(res.body.email).toBe("test@digg.se");
    });

    it("borde inte tillåta att skapa en kund utan namn eller e-post", async () => {
      // Skicka ett tomt objekt
      const res = await request(app).post("/digg/api/customers").send({});

      // Tips: Om du inte lagt till validering i din Express-POST än,
      // kommer detta test att misslyckas. Det är ett jättebra sätt att se
      // att testerna faktiskt gör sitt jobb!
      expect(res.status).toBe(400);
    });
  });
});
