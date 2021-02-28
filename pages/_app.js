import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/createWithApollo'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={useApollo({})}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
