import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      // 스타일을 서버에서 미리 렌더링하여 HTML에 삽입
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="와인 관련 사이트" />
          <meta name="keywords" content="와인정보, 와인리뷰" />
          <meta name="author" content="코드잇 스프린트 FE 12기 파트2 1팀" />
          {/* Open Graph 메타 태그 (소셜 미디어 공유 시 활용) */}
          <meta property="og:title" content="whyne" />
          <meta
            property="og:description"
            content="와인 정보를 공유하는 서비스입니다."
          />
          {/* 이미지와 url 추후에 추가 예정 */}
          <meta property="og:image" content="" />
          <meta property="og:url" content="" />
          <meta property="og:type" content="website" />
          <link
            rel="icon"
            href="/assets/images/logo_black.svg"
            type="image/svg+xml"
          />
          {/* styled-components 서버 스타일 처리 */}
          <style
            dangerouslySetInnerHTML={{
              __html: `@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
