import React from 'react'
// import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './components/NavigationBar';
import { About } from './components/About';
import NoMatch from './components/NoMatch';
import { Blogs } from './components/Blog';
import { Post } from './components/Post';
import { ThemeProvider } from '@emotion/react';
import theme from './components/Theme'
import { Box } from "rebass";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <Box style={{'position':'fixed', 'width': '100%'}}><NavigationBar  /></Box>
                <Box sx={{height: theme.navbar.imageHeight}}/>
              <Router>
                      <Box pl={[2,2,4]}>
                      <Switch>
                          <Route exact path="/" component={Blogs} />
                          <Route path="/about" component={About} />
                          <Route path="/blog" component={Blogs} />
                          <Route path="/post/*" component={Post} />
                          <Route component={NoMatch} />
                      </Switch>
                      </Box>
              </Router>
          </React.Fragment>
        </ThemeProvider>
    )
}

export default App
