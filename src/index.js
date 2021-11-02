import React from 'react'
// import ReactDOM from 'react-dom'
import { render } from 'react-dom';
import './index.css'
import App from './App'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";

const gql_ep = () => {
    let gurl = 'http://localhost:4000/graphql'
    if (process.env.REACT_APP_GRAPHQL_ENDPOINT) {
        gurl = `https://${process.env.REACT_APP_GRAPHQL_ENDPOINT.replace(/["]+/g, '')}`
    }
    return gurl
}

const GRAPHQL_ENDPOINT = gql_ep();

const client = new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    cache: new InMemoryCache()
});

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'),
);
