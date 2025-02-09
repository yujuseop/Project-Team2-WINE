import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

// API 응답 타입 정의
interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

// Axios 인스턴스 생성
const instance: AxiosInstance = axios.create({
  baseURL: "https://winereview-api.vercel.app/12-2/",
});

// 요청 인터셉터: 자동으로 토큰 추가
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("accessToken"); // 로컬 스토리지에서 토큰 가져오기 -> 쿠키에서 accessToken 가져오기 변경
    console.log("Axios 요청 시 accessToken:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰이 담김
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// 응답 인터셉터: 401 발생 시 토큰 갱신 처리
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // 에러(만료 코드 401)시 리프레시 토큰 활용
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available");

        // 리프레시 토큰으로 새 토큰 요청
        const { data } = await axios.post<RefreshResponse>(
          "https://winereview-api.vercel.app/12-2/auth/refresh-token",
          { refreshToken }
        );

        // 받아온 새로운 토큰 저장
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        if (!error.config) return Promise.reject(error);
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        if (originalRequest._retry) {
          return Promise.reject(error);
        }

        originalRequest._retry = true;
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
