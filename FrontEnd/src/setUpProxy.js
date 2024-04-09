// src/setupProxy.js

import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://192.168.6.57:3000", // Your HTTP server's address
      changeOrigin: true,
    })
  );
}
