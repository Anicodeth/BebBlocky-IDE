import { type AppType } from "next/dist/shared/lib/utils";
import { Open_Sans } from "next/font/google";
import "@/styles/globals.css";
import { AuthContextProvider } from "@/components/AuthContext";
import Layout from "@/components/layout";

const open_sans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans"
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <Layout className={`${open_sans.className} font-open-sans`}>
        <style jsx global>{`
          :root {
            font-family: var(--font-open-sans);
          `}</style>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  )
};

export default MyApp;
