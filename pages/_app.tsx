import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Nav from "../components/NavBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Nav />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
