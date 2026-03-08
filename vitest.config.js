import { defineConfig } from "vitest/config"

export default defineConfig({

  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setupTests.jsx"
  },

  esbuild: {
    jsxInject: `import React from 'react'`
  }

})