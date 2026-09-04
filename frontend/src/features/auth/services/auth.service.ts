import api from '../../../api/axios';

import type { LoginDTO } from '../dtos/login.dto';
import type { RegisterDTO } from '../dtos/register.dto';
import type { ResendOtp } from '../dtos/resent_otp.dto';
import type { VerifyOtpDTO } from '../dtos/verify-otp.dto';

export const registerUser = async (data: RegisterDTO) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const verifyOtpPaylod = async (data: VerifyOtpDTO) => {
  const response = await api.post('/auth/verify-otp', data);
  return response.data;
};

export const loginUser = async (data: LoginDTO) => {
  const response = await api.post('/auth/login', data);

  return response.data.user;
};

export const logoutUser = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/auth/profile');

  return response.data;
};

export const refreshAccessToken = async () => {
  const response = await api.post('/auth/refresh-token');
  return response.data;
};


export const resendOtp = async (data: ResendOtp) => {
  console.log("tigger 2",data)
  const response = await api.post('/auth/resend-otp',data);
  console.log("resend otp response is ",response)
  return response.data;
}