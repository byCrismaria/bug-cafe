import { ref, computed } from 'vue';

const token = ref(localStorage.getItem('authToken'));
const userName = ref(localStorage.getItem('userName'));

export const useAuth = () => {
  const isAuthenticated = computed(() => !!token.value);

  const setAuth = (newToken, name) => {
    token.value = newToken;
    userName.value = name;
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('userName', name);
  };

  const logout = () => {
    token.value = null;
    userName.value = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('cartId');
  };

  return { isAuthenticated, userName, setAuth, logout };
};
