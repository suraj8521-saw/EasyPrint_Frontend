export const loginApi = async (credentials) => {
  // API Login implementation
  return { success: true, user: { name: 'Satyam' } };
};
export const guestLoginApi = async () => {
  return { success: true, user: { name: 'Guest User', isGuest: true } };
};