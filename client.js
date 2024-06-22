const { Products, Counter, App } = (() => {
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

    return { Products, Counter, App };
})();

ReactDOM.hydrateRoot(document.getElementById("root"), <App products={window.__PRODUCTS__} />);
