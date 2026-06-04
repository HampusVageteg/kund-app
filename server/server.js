import express from "express";
import path from "path";
import cors from "cors";
import { faker } from "@faker-js/faker";
import { fileURLToPath } from "url";

// Importera Swagger och YAML-läsare för openapi
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Openapi
const swaggerDocument = YAML.load(path.join(__dirname, "openapi.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Hälso-check
app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

const allCustomers = Array.from({ length: 15 }, (_, index) => ({
  id: index + 1,
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  adress: faker.location.streetAddress(),
}));

app.get("/digg/api/customers", (req, res) => {
  // Standardvärden för paginering
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedCustomers = allCustomers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allCustomers.length / limit);

  res.json({
    customers: paginatedCustomers,
    totalPages: totalPages,
    currentPage: page,
  });
});

app.post("/digg/api/customers", (req, res) => {
  const { fullName, email, phone, adress } = req.body;

  // Skapa den nya kunden och ge den ett id baserat på arrayens längd
  const newCustomer = {
    id: allCustomers.length + 1,
    fullName,
    email,
    phone,
    adress,
  };

  if (!fullName || !email || !phone || !adress) {
    return res.status(400).json({ error: "Alla fält är obligatoriska" });
  }

  // Lägg till kunden i listan i serverns minne
  allCustomers.push(newCustomer);

  res.status(201).json(newCustomer);
});

// Säg till Express att serva de färdigbyggda Vue-filerna från mappen 'dist'
app.use(express.static(path.join(__dirname, "dist")));

// Om användaren går till något annat än mina routes (obefintliga i 1.0), skicka Vue's index.html
app.use((req, res, next) => {
  if (
    req.path.startsWith("/digg/api") ||
    req.path.startsWith("/health") ||
    req.path.startsWith("/api-docs")
  ) {
    return next();
  }
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express-servern körs nu på http://localhost:${PORT}`);
  console.log(
    `Swagger-dokumentation hittas på http://localhost:${PORT}/api-docs`,
  );
});

export default app;
