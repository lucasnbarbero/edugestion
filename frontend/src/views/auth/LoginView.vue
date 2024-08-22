<template>
  <form @submit.prevent="onSubmit">
    <MyField as="v-text-field" name="email" v-model="email" />
    <MyField as="v-text-field" name="password" v-model="password" />
    <VBtn type="submit" color="primary" :disabled="isSubmitting" :loading="isSubmitting" block>
      Ingresar
    </VBtn>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';

import { useAuthStore } from '@/stores/auth';
import { LoginUser } from '@/core/use-cases/LoginUser';

import MyField from '@/components/MyField.vue';

const loginUseCase = new LoginUser();

const email = ref<string>('john@mail.com');
const password = ref<string>('changeme');

const authStore = useAuthStore();
const router = useRouter();
const { handleSubmit, isSubmitting } = useForm();

const onSubmit = handleSubmit(async () => {
  isSubmitting.value = true;
  try {
    const { access_token, refresh_token } = await loginUseCase.execute(email.value, password.value);
    authStore.setTokens(access_token, refresh_token);

    await router.push('/');
  } catch (error) {
    console.error('Error al iniciar sesión', error);
  } finally {
    isSubmitting.value = false;
  }
});
</script>
