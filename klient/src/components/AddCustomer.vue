<script setup lang="ts">
import { ref } from "vue";

// Definiera emit för att kunna "meddela" andra komponenter när kund lagts till
const emit = defineEmits(["customer-added"]);

const fullName = ref("");
const email = ref("");
const phone = ref("");
const adress = ref("");
const errorMessage = ref("");
const successMessage = ref("");

const handleSubmit = async () => {
  // Validering
  if (!fullName.value || !email.value || !phone.value || !adress.value) {
    errorMessage.value = "Alla fält är obligatoriska.";
    return;
  }

  const newCustomer = {
    fullName: fullName.value,
    email: email.value,
    phone: phone.value,
    adress: adress.value,
  };

  try {
    errorMessage.value = "";
    successMessage.value = "";

    const response = await fetch("http://localhost:3000/digg/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    });

    if (!response.ok) {
      throw new Error("Kunde inte spara kunden.");
    }

    successMessage.value = "Kunden har sparats!";

    // Tömmer formuläret
    fullName.value = "";
    email.value = "";
    phone.value = "";
    adress.value = "";

    // Berätta för "roten" att listan behöver laddas om
    emit("customer-added");
  } catch (error: any) {
    errorMessage.value = error.message || "Ett fel uppstod.";
  }
};
</script>

<template>
  <div class="form-container">
    <h3>Lägg till ny kund</h3>

    <form @submit.prevent="handleSubmit" class="customer-form">
      <div class="form-group">
        <label for="name">Fullständigt namn *</label>
        <input
          id="name"
          v-model="fullName"
          type="text"
          placeholder="Ankan Anksson"
        />
      </div>

      <div class="form-group">
        <label for="email">E-post *</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="ankan@anksson.se"
        />
      </div>

      <div class="form-group">
        <label for="phone">Telefon</label>
        <input
          id="phone"
          v-model="phone"
          type="text"
          placeholder="070-123 45 67"
        />
      </div>

      <div class="form-group">
        <label for="adress">Adress</label>
        <input
          id="adress"
          v-model="adress"
          type="text"
          placeholder="Ankeborg 1"
        />
      </div>

      <button type="submit" class="submit-btn">Spara kund</button>
    </form>

    <p v-if="errorMessage" class="msg error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="msg success">{{ successMessage }}</p>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

h3 {
  margin-top: 0;
  color: #1f2937;
}

.customer-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
}

input {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
}

.submit-btn {
  padding: 10px;
  background-color: #10b981; /* Grön färg för att "skapa" */
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #059669;
}

.msg {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
}

.error {
  background-color: #fee2e2;
  color: #dc2626;
}

.success {
  background-color: #ecfdf5;
  color: #059669;
}
</style>
