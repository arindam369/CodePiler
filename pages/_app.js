import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="This is a Code Runner website, an assignment given by Striver"
        />
        <meta
          name="keywords"
          content="codepiler, coding, coderunner, compiler, striver"
        />
        <meta name="author" content="Arindam Halder" />
        <title>CodePiler | Run your code easily</title>
        <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
        <link rel="icon" type="image/x-icon" href="favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
