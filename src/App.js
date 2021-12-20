import React from 'react';
import './index.css';
import { VechaiProvider } from "@vechaiui/react";
import { theme } from "./themes";
import Router from "./router";

function App() {
  return (
    <VechaiProvider theme={theme} colorScheme={window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}>
      <Router />
    </VechaiProvider>
  );
}

export default App;
