# Kund-app

Enkel applikation med Vue 3 Javascript och lite smakprov på Typescript, samt Express Node.js.

## Funktioner

* **Paginering & Tabell:** Hämtning av kunder som visas i en tabell där paginering är möjlig.
* **Kundformulär:** Lägga till kunder med hjälp av enkelt formulär med enkel validering.
* **OpenAPI / Swagger UI:** Openapi SwaggerUI med möjlighet att öppna Swagger-gränssnittet för att tydligt se endpoints.
* **Hälsokontroll (Health Check):** Hälso-check för att se status på applikationen.
* **Docker-redo:** Använder Docker med flerstegs-bygge som paketerar både klient/frontend och server/backend i en enda container.

## För installation och utveckling

Ställ dig i rotkatalogen (kund-app) och kör följande kommandon för att först installera paket i "roten", därefter installeras respektive paket i klient och server på samma gång.
"npm install"
"npm run install-all" #Denna installerar paket i klient och server på samma gång

### Två olika sätt att starta igång applikationen

1. I rotkatalogen (kund-app) för att enkelt starta både klienten och servern samtidigt kör följande kommando:
   "npm run dev"
   Klienten/frontend nås på <http://localhost:5173> (eller den port Vite tilldelar, syns i utskriften när du kört kommandot)
   Server/backend körs på <http://localhost:3000>

2. Med docker (om du har docker desktop installerat) kan man köra följande kommando
   "docker compose up --build"
   Så startas en container upp som håller hela applikationen. Du når då webbsidan på <http://localhost:3000>

---

### URLer

Gå till <http://localhost:3000/health> — För att se hälsostatus på applikationen

Gå till <http://localhost:3000/api-docs> — Swagger-UI gränssnitt som visar endpointsen.
