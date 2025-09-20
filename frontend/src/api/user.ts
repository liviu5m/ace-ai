import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

type userData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export async function createUser(userData: userData) {
  const response = await axios.post(`${baseUrl}/auth/signup`, userData);
  return response.data;
}

export async function authenticateUser(userData: userData) {
  const response = await axios.post(`${baseUrl}/auth/login`, userData);
  return response.data;
}

export async function verifyUser(code: string, id: string) {
  const response = await axios.put(`${baseUrl}/auth/verify`, {
    code,
    id,
  });
  return response.data;
}

export async function resendVerificationCode(id: string) {
  const response = await axios.put(`${baseUrl}/auth/resend`, { id });
  return response.data;
}

export async function getAuthenticatedUser(token: string) {
  const response = await axios.get(`${baseUrl}/api/user/me`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}
