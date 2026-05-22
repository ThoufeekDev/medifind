import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Send cookies automatically
});

// Refresh Token Lock
let isRefreshing = false;

// Failed Request Queue Type
type FailedQueueItem = {
  resolve: (value?:any) => void;
  reject: (reason?:any) => void;
};

// Failed Request Queue
let failedQueue: FailedQueueItem[] = [];

// Process Waiting Requests
const processQueue = (error: any = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });

  failedQueue = [];
};

// Response Interceptor
api.interceptors.response.use(
  // Success Response
  (response) => response,

  // Error Response
  async (error) => {
    const originalRequest = error.config;

    // Access Token Expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh-token"
    ) {
      // Prevent Infinite Retry Loop
      originalRequest._retry = true;

      // If Refresh Already Running
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        // Request New Access Token
        await api.post("/auth/refresh-token");

        // Retry All Waiting Requests
        processQueue();

        // Retry Original Request
        return api(originalRequest);

      } catch (refreshError) {
        // Reject Waiting Requests
        processQueue(refreshError);

        // Redirect To Login
        window.location.href = "/login";

        return Promise.reject(refreshError);

      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;