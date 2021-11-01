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
const RAW_GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT.replace(/["]+/g, '')
const GRAPHQL_ENDPOINT = RAW_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql'
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
