<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const customers = ref<any[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);
const limit = 5; // Antal kunder per sida

// Funktion för att hämta data baserat på aktuell sida
const fetchCustomers = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/digg/api/customers?page=${currentPage.value}&limit=${limit}`,
    );
    const data = await response.json();

    customers.value = data.customers;
    totalPages.value = data.totalPages;
  } catch (error) {
    console.error("Kunde inte hämta kunder:", error);
  }
};

// Hämta data första gången komponenten laddas
onMounted(fetchCustomers);

// Håll koll på currentPage – ändras den så hämtar vi ny data automatiskt
watch(currentPage, fetchCustomers);
defineExpose({ fetchCustomers });
</script>

<template>
  <p v-if="customers.length === 0">Inga kunder hittades...</p>
  <div v-if="customers.length > 0" class="customer-list">
    <div class="table-responsive">
      <table class="customer-table">
        <thead>
          <tr>
            <th>Namn</th>
            <th>E-post</th>
            <th>Telefon</th>
            <th>Adress</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="customers.length === 0">
            <td colspan="5" class="text-center">Inga kunder hittades...</td>
          </tr>

          <tr v-else v-for="c in customers" :key="c.id">
            <td>{{ c.fullName }}</td>
            <td>{{ c.email }}</td>
            <td>{{ c.phone }}</td>
            <td>{{ c.adress }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination-controls">
      <button :disabled="currentPage === 1" @click="currentPage--">
        Föregående
      </button>

      <span> Sida {{ currentPage }} </span>

      <button :disabled="currentPage === totalPages" @click="currentPage++">
        Nästa
      </button>
    </div>
  </div>
</template>

<style scoped>
.customer-container {
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  font-family: sans-serif;
}

.table-responsive {
  overflow-x: auto;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.customer-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  text-align: left;
}

.customer-table th,
.customer-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
}

.customer-table th {
  background-color: #4f46e5; /* En snygg lila/blå färg */
  color: white;
  font-weight: 600;
}

/* Zebra-randning (varannan rad blir ljusgrå) */
.customer-table tbody tr:nth-child(even) {
  background-color: #f9fafb;
}

/* Effekt när man håller muspekaren över en rad */
.customer-table tbody tr:hover {
  background-color: #f3f4f6;
}

.text-center {
  text-align: center;
  color: #6b7280;
  padding: 20px !important;
}

/* Paginering-styling */
.pagination-controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  align-items: center;
  margin-top: 20px;
}

button {
  padding: 8px 16px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

button:hover:not(:disabled) {
  background-color: #4338ca;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #9ca3af;
}
</style>
