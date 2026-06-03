<script setup lang="ts">
import { ref } from "vue";
import GetCustomers from "./components/GetCustomers.vue";
import AddCustomer from "./components/AddCustomer.vue";

// Skapa en referens till GetCustomers-komponenten
const customerListRef = ref<any>(null);

// Funktion som körs när AddCustomer säger till att en kund har lagts till
const refreshCustomerList = () => {
  if (customerListRef.value) {
    // Anropa fetchCustomers-funktionen inuti GetCustomers.vue!
    customerListRef.value.fetchCustomers();
  }
};
</script>

<template>
  <h1>Diggs fantastiska kunder</h1>
  <br />
  <GetCustomers ref="customerListRef"></GetCustomers>
  <br />

  <AddCustomer @customer-added="refreshCustomerList" />
</template>

<style scoped></style>
