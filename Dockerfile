# 1 Bygg klient
FROM node:22 AS klient-builder
WORKDIR /app/klient
COPY klient/package*.json ./
RUN npm install
COPY klient/ ./
RUN npm run build  # Detta skapar 'dist'-mappen

# 2 Starta server
FROM node:22
WORKDIR /app
COPY server/package*.json ./server/
RUN cd server && npm install

COPY server/ ./server/

# 3 Kör tester
RUN cd server && npm run test

COPY --from=klient-builder /app/klient/dist ./server/dist

EXPOSE 3000
CMD ["node", "server/server.js"]