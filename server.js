const http = require("http");
const fs = require("fs");
const { parse } = require("url");
const { renderToString } = require("react-dom/server");
const React = require("react");
const fetch = require("node-fetch");

/* REACT COMPONENT */
const Products = ({ products }) => (
    <>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.description}</td>
                        <td>
                            <img src={product.image} alt={product.title} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
);

const Counter = () => {
    const [count, setCount] = React.useState(0);

    const handleIncrement = () => setCount((prevCount) => prevCount + 1);
    const handleDecrement = () => setCount((prevCount) => prevCount - 1);

    return (
        <div className='counter'>
            <button onClick={handleDecrement}>Decrement</button>
            <h1>Count: {count}</h1>
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );
};

const App = ({ products }) => (
    <>
        <Products products={products} />
        <Counter />
    </>
);
/* END REACT COMPONENT */

const HTML = fs.readFileSync(`${__dirname}/index.html`, "utf8");
const CLIENT_JS = fs.readFileSync(`${__dirname}/client.js`, "utf8");

const server = http.createServer(async (req, res) => {
    const path = parse(req.url, true).pathname;

    if (path === "/") {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            const products = await response.json();
            const REACT_HTML = renderToString(<App products={products} />);

            const HTML_WITH_DATA = HTML.replace("{{REACT_HTML}}", REACT_HTML).replace(
                "</body>",
                `<script>window.__PRODUCTS__ = ${JSON.stringify(products)}</script></body>`
            );

            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(HTML_WITH_DATA);
            res.end();
        } catch (error) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.write("Internal Server Error");
            res.end();
        }
    } else if (path === "/client.js") {
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.write(CLIENT_JS);
        res.end();
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("Not Found");
        res.end();
    }
});

server.listen(3000, "localhost", () => {
    console.log("Server is running on http://localhost:3000");
});
