import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import NProgress from "nprogress"

import Router from "next/router"

Router.events.on("routeChangeStart", () => NProgress.start())

Router.events.on("routeChangeComplete", () => NProgress.done())

Router.events.on("routeChangeError", () => NProgress.done())

const AuthenticatedProvider = dynamic(() => import('context/AuthContext'));

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AuthenticatedProvider>
      <Component {...pageProps} />
    </AuthenticatedProvider>
  )
}

export default MyApp
