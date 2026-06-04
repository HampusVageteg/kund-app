<script lang="ts" setup>
import { ref } from "vue";
import AddCustomer from "./AddCustomer.vue";
import GetCustomers from "./GetCustomers.vue";

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
  <div>
    <GetCustomers ref="customerListRef"></GetCustomers>
    <AddCustomer @customer-added="refreshCustomerList" />
  </div>
</template>
