import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import Head from "next/head";
import Notification from "../components/ui/notification";
import { NotificationContextProvider } from "../store/notificationContext";
function MyApp({ Component, pageProps }) {
  return;
  <NotificationContextProvider>
    <Layout>
      <Head>
        <title>NextJS Events</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
      <Notification title="test" message="test1" status="success" />
    </Layout>
  </NotificationContextProvider>;
}

export default MyApp;
