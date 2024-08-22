<template>
  <h1>Home</h1>
  <pre>{{ user }}</pre>

  <img :src="user?.avatar" alt="" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { AuthRepository } from '@/infrastructure/repositories/AuthRepository';
import type { IUser } from '@/core/entities/IUser';

const user = ref<IUser | null>(null);
const authRepository = new AuthRepository();

onMounted(async () => {
  try {
    user.value = await authRepository.getProfile();
  } catch (error) {
    console.error(error);
  }
});
</script>
