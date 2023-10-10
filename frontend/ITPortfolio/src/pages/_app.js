import Favicon from "react-favicon";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../components/layout/Layout";

// Styling.
import "bootstrap/dist/css/bootstrap.css";
import "../styles/global.css";

// Google analytics.
import * as googleAnalytics from "../utils/googleAnalytics";
let tag = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG;
function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      googleAnalytics.pageview(url, tag);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Intentional Technology</title>
      </Head>
      <Favicon url="/images/logo/logo.ico" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
