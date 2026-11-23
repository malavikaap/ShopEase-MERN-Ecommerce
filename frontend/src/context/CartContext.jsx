
import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((oldCart) => {
            const existing = oldCart.find(
                item => item._id === product._id
            );

            if (existing) {
                return oldCart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...oldCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item._id !== id));
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) {
            removeFromCart(id);
            return;
        }

        setCart(cart.map(item =>
            item._id === id
                ? { ...item, quantity: Number(quantity) }
                : item
        ));
    };

    const clearCart = () => setCart([]);

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            total
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
