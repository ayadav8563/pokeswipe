import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.theswornapp.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

type SignupPayload = {
  name: string;
  email: string;
  type: 'MANUAL' | 'GOOGLE';
  password: string;
};

type VerifyOtpPayload = {
  email: string;
  otp: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

const AUTH_TOKEN_KEY = 'demoSwipe_auth_token';
const AUTH_USER_KEY = 'demoSwipe_auth_user';

function normalizeApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data as
      | {message?: string; error?: string}
      | undefined;
    return (
      responseData?.message ||
      responseData?.error ||
      error.message ||
      'Request failed'
    );
  }

  return 'Something went wrong';
}

export async function signupManual(payload: SignupPayload) {
  try {
    await api.post('/api/v1/user/signup', payload);
    return {ok: true as const};
  } catch (error) {
    return {ok: false as const, message: normalizeApiError(error)};
  }
}

export async function verifyOtp(payload: VerifyOtpPayload) {
  try {
    await api.post('/api/v1/user/verify-otp', payload);
    return {ok: true as const};
  } catch (error) {
    return {ok: false as const, message: normalizeApiError(error)};
  }
}

export async function loginManual(payload: LoginPayload) {
  try {
    const response = await api.post('/api/v1/user/login', payload);
    return {ok: true as const, data: response.data};
  } catch (error) {
    return {ok: false as const, message: normalizeApiError(error)};
  }
}

export async function storeSession(data: unknown) {
  const tokenFromKnownKeys =
    (data as {accessToken?: string})?.accessToken ||
    (data as {token?: string})?.token ||
    '';
  const userFromKnownKeys =
    (data as {user?: unknown})?.user || (data as {data?: unknown})?.data || null;

  await AsyncStorage.multiSet([
    [AUTH_TOKEN_KEY, tokenFromKnownKeys ? String(tokenFromKnownKeys) : ''],
    [AUTH_USER_KEY, JSON.stringify(userFromKnownKeys)],
  ]);
}

export async function clearSession() {
  await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, AUTH_USER_KEY]);
}
