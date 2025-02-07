//테스트 방법: web콘솔창에 localStorage.setItem("accessToken", "테스트용_JWT_토큰"); 입력 후 원하는 페이지로 이동

import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// API 응답 타입 정의
interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

// Axios 인스턴스 생성
// await.get/post/patch시 자동으로 토큰 요청 전송
const instance: AxiosInstance = axios.create({
  baseURL: "https://winereview-api.vercel.app/12-2/",
});

// 요청 인터셉터: 자동으로 토큰 추가
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰이 담김
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// 응답 인터셉터: 401 발생 시 토큰 갱신 처리
instance.interceptors.response.use(
  (response) => response, // 정상적인 리스폰스시 처리
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // 에러(만료 코드 401)시 리프레시 토큰 활용
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available"); // 리프레시 토큰이 없을 경우 에러 메세지

        // 리프레시 토큰으로 새 토큰 요청
        const { data } = await axios.post<RefreshResponse>(
          "https://winereview-api.vercel.app/auth/refresh",
          { refreshToken }
        );

        // 받아온 새로운 토큰 저장
        localStorage.setItem("accessToken", data.accessToken);

        // 원래 요청 다시 보내기
        // interceptors.request.use는 재사용 불가. 새로운 코드 작성.
        if (error.config) {
          // error.config : 에러를 반환한 요청의 데이터 값
          error.config.headers.Authorization = `Bearer ${data.accessToken}`;
          return axios(error.config);
        }
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // 로그인 페이지로 이동
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
