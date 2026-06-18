export const webTokenStorage = {
  async save(key: string, value: string) {
    localStorage.setItem(key, value);
  },

  async get(key: string) {
    return localStorage.getItem(key);
  },

  // limpia el local storage de los tokens
  async remove(key: string) {
    localStorage.removeItem(key);
  },
};
