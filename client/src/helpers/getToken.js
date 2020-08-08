export const getToken = () => {
  const token = localStorage.getItem("x-access-token");
  return `Bearer ${token}`;
};
