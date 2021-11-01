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

const GRAPHQL_ENDPOINT = `https://${process.env.GRAPHQL_ENDPOINT}` || 'http://localhost:4000/graphql'
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
