
import { useCartStore } from './store';
import type { Product } from './store';
import './App.css';

// Имитация списка товаров
const products: Product[] = [
    { id: 1, name: 'Смартфон Alpha', price: 599 },
    { id: 2, name: 'Ноутбук ProBook', price: 1299 },
    { id: 3, name: 'Наушники SoundMax', price: 149 },
    { id: 4, name: 'Умные часы Chrono', price: 299 },
];


function Header() {
    // Считаем общее количество товаров
    const totalItems = useCartStore((state) =>
        state.cart.reduce((total, item) => total + item.quantity, 0)
    );
    const { toggleCart } = useCartStore();

    return (
        <nav className="navbar navbar-light bg-light mb-4">
            <div className="container">
                <span className="navbar-brand mb-0 h1">MyStore</span>
                <button className="btn btn-outline-primary position-relative" onClick={toggleCart}>
                    Корзина
                    {totalItems > 0 && (
                        <span
                            key={totalItems} // Ключ зависит от общего количества
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger pop-animation"
                        >
              {totalItems}
            </span>
                    )}
                </button>
            </div>
        </nav>
    );
}

// Каталог товаров
function ProductList() {
    const { addProduct } = useCartStore();

    return (
        <div>
            <h2>Каталог товаров</h2>
            <div className="row">
                {products.map((product) => (
                    <div key={product.id} className="col-md-6 col-lg-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.price} руб. </p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => addProduct(product)}
                                >
                                    Добавить в корзину
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


function Cart() {
    // Получаем функции из store
    const { isCartOpen, cart, addProduct, decreaseQuantity, removeItem, clearCart, toggleCart } = useCartStore();

    const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className={`cart-sidebar p-3 ${isCartOpen ? 'open' : ''}`}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Корзина</h3>
                <button className="btn-close" onClick={toggleCart}></button>
            </div>
            <hr />
            {cart.length === 0 ? (
                <p>Ваша корзина пуста.</p>
            ) : (
                <>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="fw-bold fs-5">Итого:</span>
                        <span className="fw-bold fs-5">{totalCost.toFixed(2)} руб. </span>
                    </div>

                    <ul className="list-group list-group-flush mb-3">
                        {cart.map((item) => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center px-0">
                                <div>
                                    {item.name} <br />
                                    <small className="text-muted">{item.price} x {item.quantity} руб.</small>
                                </div>
                                <div className="btn-group" role="group">
                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => decreaseQuantity(item.id)}>-</button>
                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => addProduct(item)}>+</button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(item.id)}>🗑️</button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Кнопка "Очистить корзину" */}
                    <button className="btn btn-danger w-100" onClick={clearCart}>
                        Очистить корзину
                    </button>
                </>
            )}
        </div>
    );
}

function App() {
    return (
        <>
            <Header />
            <div className="container">
                <ProductList />
            </div>
            <Cart />
        </>
    );
}

export default App;