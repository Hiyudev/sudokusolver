import GlobalStyle from '@styles/global';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import {ThemeWrapper} from '@hooks/Theme';

export default function App({Component, pageProps}) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Sudoku Solver</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="title" content="Sudoku Solver" />
        <meta name="description" content="Web tool to solve your sudoku !" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sudokusolver.vercel.app/" />
        <meta property="og:title" content="Sudoku Solver" />
        <meta
          property="og:description"
          content="Web tool to solve your sudoku !"
        />
        <meta
          property="og:image"
          content="https://sudokusolver.vercel.app/splash.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://sudokusolver.vercel.app/" />
        <meta property="twitter:title" content="Sudoku Solver" />
        <meta
          property="twitter:description"
          content="Web tool to solve your sudoku !"
        />
        <meta
          property="twitter:image"
          content="https://sudokusolver.vercel.app/splash.png"
        />

        <meta name="theme-color" content="#000000" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={true}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        <link rel="icon" href="./favicon.ico" />
        <link rel="apple-touch-icon" href="./logo192.png" />

        <link rel="manifest" href="./manifest.json" />
        <title>Sudoku Solver</title>
      </Head>
      <GlobalStyle />

      <NextNProgress color={'#5527B9'} height={4} />
      <ThemeWrapper>
        <Component {...pageProps} />
      </ThemeWrapper>
    </>
  );
}
