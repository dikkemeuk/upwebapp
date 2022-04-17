import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

const AuthenticatedProvider = dynamic(() => import('context/AuthContext'));

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AuthenticatedProvider>
      <Component {...pageProps} />
    </AuthenticatedProvider>
  )
}

export default MyApp
