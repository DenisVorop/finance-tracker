import Document, { Html, Head, Main, NextScript } from "next/document";
import type { DocumentInitialProps } from "next/document";

type ExtendedDocumentInitialProps = DocumentInitialProps & {};

class _Document extends Document<ExtendedDocumentInitialProps> {
  static async getInitialProps(ctx: App.DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="ru" className="dark">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default _Document;
