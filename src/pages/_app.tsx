// pages/_app.tsx
import { AppProps } from "next/app";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} /> {/* 페이지 컴포넌트 */}
    </>
  );
}

export default MyApp;
