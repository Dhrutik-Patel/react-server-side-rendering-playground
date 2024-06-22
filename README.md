# Server-Side Rendering with React

## Overview

This project showcases server-side rendering (SSR) using React, demonstrating the process of fetching data on the server, rendering HTML content, and hydrating the application on the client side. Additionally, it provides insights into how Next.js operates under the hood for SSR.

## Project Explanation

### Fetches Data on Server

The server (`server.js`) fetches product data from an external API (`https://fakestoreapi.com/products`) using `node-fetch`. This data fetching is integral to SSR as it ensures that the server has the necessary data to render the React components.

### Render HTML

Using `renderToString` from `react-dom/server`, the server renders the React components (`Products`, `Counter`, `App`) into HTML strings. This server-rendered HTML includes the products table and a counter component.

### Hydrate on Client

On the client side, the server-sent HTML is hydrated using `ReactDOM.hydrate` in `client.js`. This process attaches event handlers and makes the application interactive without re-rendering everything, enhancing performance and user experience.
