import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(localStorage.getItem('access_token'));
  const refreshToken = ref<string | null>(localStorage.getItem('refresh_token'));

  const setTokens = (access_token: string, refresh_token: string) => {
    accessToken.value = access_token;
    refreshToken.value = refresh_token;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
  };

  const clearTokens = () => {
    accessToken.value = null;
    refreshToken.value = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const isAuthenticated = () => {
    return !!accessToken.value;
  };

  return {
    accessToken,
    refreshToken,
    setTokens,
    clearTokens,
    isAuthenticated,
  };
});
