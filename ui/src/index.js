import React from 'react'
import { render,hydrate } from 'react-dom';
import './index.css'
import App from './App'

// This is set up for postbuild react-snap that pre-renders for SEO
// https://github.com/stereobooster/react-snap
const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
    hydrate(<App />, rootElement);
} else {
    render(<App />, rootElement);
}
