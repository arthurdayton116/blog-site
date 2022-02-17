// okta
import {Security, SecureRoute, LoginCallback} from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';

// apollo client
import { setContext } from '@apollo/client/link/context';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
    useReactiveVar,
} from "@apollo/client";


// React and Router
import React from 'react';
import { Route, Switch, useHistory } from "react-router-dom";

import { Box } from "rebass";
import { ThemeProvider } from '@emotion/react';

// React Helmet
import {Helmet} from "react-helmet";

// Reactive Vars - https://www.apollographql.com/blog/apollo-client/caching/local-state-management-with-reactive-variables/
import { accessTokenVar } from './cache';

// local components
import { NavigationBar } from './components/NavigationBar';
import { About } from './components/About';
import { Approval } from './components/Approval';
import NoMatch from './components/NoMatch';
import { Blogs } from './components/Blog';
import { Post } from './components/Post';
import theme from './components/Theme';

// constants for configuring OKTA
const OKTA_ISSUER = process.env.REACT_APP_OKTA_ISSUER_SUFFIX;
const OKTA_DOMAIN = process.env.REACT_APP_OKTA_DOMAIN;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CALLBACK_PATH = process.env.REACT_APP_CALLBACK_PATH;

const ISSUER = `https://${OKTA_DOMAIN}${OKTA_ISSUER}`;
const HOST = window.location.host;

const SCOPES = 'openid profile email comment_approve';

// construct graphql endpoint based on location
const gql_ep = () => {
    let gurl = 'http://localhost:4000/graphql'

    if (process.env.CYPRESS_CI_LOCAL_HOST) {
        return gurl;
    }

    if (process.env.DOCKER_GRAPHQL_ENDPOINT) {
        gurl = `http://${process.env.DOCKER_GRAPHQL_ENDPOINT.replace(/["]+/g, '')}`
    }

    if (process.env.REACT_APP_GRAPHQL_ENDPOINT) {
        gurl = `https://${process.env.REACT_APP_GRAPHQL_ENDPOINT.replace(/["]+/g, '')}`
    }

    return gurl
}

// construct graphql endpoint based on location
const redirect_ep = () => {
    let gurl = `http://${HOST}${CALLBACK_PATH}`

    if (process.env.CYPRESS_CI_LOCAL_HOST) {
        return gurl;
    }

    if (process.env.REACT_APP_GRAPHQL_ENDPOINT) {
        gurl = `https://${HOST}${CALLBACK_PATH}`
    }
    return gurl
}

const REDIRECT_URI = redirect_ep();
const GRAPHQL_ENDPOINT = gql_ep();

// for use by apollo client constructor - https://www.apollographql.com/docs/react/api/link/introduction/
const httpLink = createHttpLink({
    uri: GRAPHQL_ENDPOINT,
});

console.log('HOST - ', HOST)
console.log('OKTA_DOMAIN - ', OKTA_DOMAIN)
console.log('CALLBACK_PATH - ', CALLBACK_PATH)
console.log('ISSUER - ', ISSUER)
console.log('REDIRECT_URI - ', REDIRECT_URI)

// okta config
const config = {
    issuer: ISSUER,
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URI,
    scopes: SCOPES.split(/\s+/),
    pkce: false
};

// create oktaAuth object for use by components
const oktaAuth = new OktaAuth(config);

function App(props) {
    // get the authentication token from reactive var if it exists
    // console.log('token', accessTokenContainer.authState.accessToken.accessToken);
    const accessTokenContainer = useReactiveVar(accessTokenVar)

    const authLink = setContext((_, { headers }) => {
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: accessTokenContainer.authState ? `Bearer ${accessTokenContainer.authState.accessToken.accessToken}` : "",
            }
        }
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        // TODO - Use local cache example
        cache: new InMemoryCache()
    });

    // used by OKTA Security component
    const history = useHistory();
    const restoreOriginalUri = async (_oktaAuth, originalUri) => {
        history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    };

    return (
        // Provides theme to child components
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <Security oktaAuth={oktaAuth}
                          restoreOriginalUri={restoreOriginalUri}
                >
                    { /* Apollo client for child components - put inside Security to give it access*/ }
                    <ApolloProvider client={client}>
                        <Helmet>
                            <meta property="og:title" content="Arthur Dayton Blog" />
                            <meta property="og:description" content="Arthur uses this site to blog about and demonstrate technology concepts.  It is currently deployed using serverless technologies on AWS." />
                            <meta property="og:image" content="%PUBLIC_URL%/ObservatoryPark.jpg" />
                            <meta property="article:author" content="Arthur Dayton"/>
                            <meta property="article:published_time" content="2022-02-16"/>
                        </Helmet>
                <Box style={{'position':'fixed', 'width': '100%'}}><NavigationBar  /></Box>
                <Box sx={{height: theme.navbar.imageHeight}}/>
                      { /* App routes go here */ }
                      <Box pl={[2,2,4]}>
                      <Switch>
                          <Route exact path="/" component={Blogs} />
                          <Route path="/about" component={About} />
                          <Route path="/blog" component={Blogs} />
                          <Route path="/post/:postid" exact={true} component={Post} />
                          { /* callback component provided by OKTA */ }
                          <Route path='/login/callback' component={LoginCallback}/>
                          { /* Protected by OKTA */ }
                          <SecureRoute path="/approval" component={Approval} />
                          <Route component={NoMatch} />
                      </Switch>
                      </Box>
                    </ApolloProvider>
                  </Security>

          </React.Fragment>

        </ThemeProvider>
    )
}

export default App
