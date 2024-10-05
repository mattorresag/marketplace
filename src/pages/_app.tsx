import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from "../provider/Auth/AuthProvider";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { CookieAuthenticator } from "../features/CookieAuthenticator";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "../provider/Cart/CartProvider";
import { MultiBasketsProvider } from "../provider/Basket/MultiBasketsProvider";
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer theme="dark" limit={5} />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CookieAuthenticator>
            <MultiBasketsProvider>
              <CartProvider>
                <Component {...pageProps} />
              </CartProvider>
            </MultiBasketsProvider>
          </CookieAuthenticator>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
