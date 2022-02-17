import React from 'react'
import { render,hydrate } from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";


// import {
//     ApolloClient,
//     InMemoryCache,
//     ApolloProvider,
//     createHttpLink,
//     useReactiveVar,
// } from "@apollo/client";
// import { setContext } from '@apollo/client/link/context';
// Reactive Var
// import { accessTokenVar } from './cache';
import './index.css'
import App from './App'





// const gql_ep = () => {
//     let gurl = 'http://localhost:4000/graphql'
//     if (process.env.REACT_APP_GRAPHQL_ENDPOINT) {
//         gurl = `https://${process.env.REACT_APP_GRAPHQL_ENDPOINT.replace(/["]+/g, '')}`
//     }
//     return gurl
// }
//
//
// const GRAPHQL_ENDPOINT = gql_ep();
//
// const httpLink = createHttpLink({
//     uri: GRAPHQL_ENDPOINT,
// });

// const authLink = setContext((_, { headers }) => {
//     // get the authentication token from local storage if it exists
//
//     console.log('token', accessToken);
//
//     // return the headers to the context so httpLink can read them
//     return {
//         headers: {
//             ...headers,
//             authorization: accessToken ? `Bearer ${accessToken.accessToken}` : "",
//         }
//     }
// });
//
// const client = new ApolloClient({
//     link: authLink.concat(httpLink),
//     cache: new InMemoryCache()
// });



// const client = new ApolloClient({
//     uri: GRAPHQL_ENDPOINT,
//     cache: new InMemoryCache()
// });

// render(
//     // <ApolloProvider client={client}>
//         <Router><App /></Router>,
//     // </ApolloProvider>,
//     document.getElementById('root'),
// );



const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
    hydrate(<Router><App /></Router>, rootElement);
} else {
    render(<Router><App /></Router>, rootElement);
}
