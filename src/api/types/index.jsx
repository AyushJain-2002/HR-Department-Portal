// Export ApiError class
export { ApiError } from './api-error.jsx';

/**
 * -----------------------
 * Core API Types
 * -----------------------
 */

// Standard API Response
export const ApiResponse = (data, message = '', status = 200) => ({
  data,
  message,
  status,
});

// Pagination
export const PaginationParams = (offset = 0, limit = 10) => ({
  offset,
  limit,
});

// Search Parameters (web)
export const SearchParams = (
  key,
  offset = 0,
  limit = 10,
  latitude = null,
  longitude = null
) => ({
  key,
  offset,
  limit,
  latitude,
  longitude,
});

/**
 * -----------------------
 * Web Auth Types
 * -----------------------
 */

// Web Login Request (Email + Password)
export const LoginRequest = (email, password) => ({
  email,
  password,
});

// Token Refresh Request
export const TokenRefreshRequest = (token) => ({
  token,
});

// Generic Token Verify
export const TokenVerifyRequest = (email, token) => ({
  email,
  token,
});

/**
 * -----------------------
 * User Types
 * -----------------------
 */

// User Model
export const User = (
  id,
  name,
  dob,
  gender,
  mobileNumber,
  email,
  extra = {}
) => ({
  id,
  name,
  dob,
  gender,
  mobileNumber,
  email,
  ...extra,
});

// Editable User Profile
export const UserProfile = (
  name,
  mobileNumber,
  email,
  gender,
  dob,
  bloodGroup,
  maritalStatus,
  height,
  weight,
  emergencyContactNumber
) => ({
  name,
  mobileNumber,
  email,
  gender,
  dob,
  bloodGroup,
  maritalStatus,
  height,
  weight,
  emergencyContactNumber,
});

/**
 * -----------------------
 * Payment Types
 * -----------------------
 */

export const Payment = (
  id,
  userId,
  mode,
  amount,
  remarks,
  status,
  appointmentId,
  referenceId,
  createDateTime,
  updatedDateTime
) => ({
  id,
  userId,
  mode,
  amount,
  remarks,
  status,
  appointmentId,
  referenceId,
  createDateTime,
  updatedDateTime,
});

export const PaymentWebhook = (
  razorpayPaymentId,
  razorpayOrderId,
  razorpaySignature,
  status
) => ({
  razorpayPaymentId,
  razorpayOrderId,
  razorpaySignature,
  status,
});

/**
 * -----------------------
 * Appointment Types
 * -----------------------
 */

export const Appointment = (
  id,
  userId,
  doctorId,
  facilityId,
  departmentId,
  appointmentDate,
  fromTime,
  toTime,
  amount,
  currencyCode,
  status
) => ({
  id,
  userId,
  doctorId,
  facilityId,
  departmentId,
  appointmentDate,
  fromTime,
  toTime,
  amount,
  currencyCode,
  status,
});

/**
 * -----------------------
 * Doctor Types
 * -----------------------
 */

export const Doctor = (
  name,
  phoneNumber,
  email,
  address,
  degree,
  registrationNo
) => ({
  name,
  phoneNumber,
  email,
  address,
  degree,
  registrationNo,
});

// Web Doctor Login
export const DoctorLogin = (email, password) => ({
  email,
  password,
});

/**
 * -----------------------
 * Enquiry Types
 * -----------------------
 */

export const Enquiry = (
  id,
  name,
  email,
  subject,
  message,
  createdAt,
  updatedAt
) => ({
  id,
  name,
  email,
  subject,
  message,
  createdAt,
  updatedAt,
});

/**
 * -----------------------
 * User Favorites
 * -----------------------
 */

export const Favorite = (favoriteId, favoriteType, isFavorite) => ({
  favoriteId,
  favoriteType,
  isFavorite,
});

/**
 * -----------------------
 * Advertisement Types
 * -----------------------
 */

export const Advertisement = (
  id,
  title,
  description1,
  description2,
  imageurl,
  businesspageurl,
  createTime,
  expireTime
) => ({
  id,
  title,
  description1,
  description2,
  imageurl,
  businesspageurl,
  createTime,
  expireTime,
});
