import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* 공통 메타 태그나 favicon 등은 여기서 설정 */}
        <meta name="description" content="와인 관련 사이트" />
        <link
          rel="icon"
          href="/assets/images/logo_black.svg"
          type="image/svg+xml"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
