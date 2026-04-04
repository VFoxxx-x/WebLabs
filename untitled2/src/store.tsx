import { create } from 'zustand';

export interface Product {
    id: number;
    name: string;
    price: number;
}

// интерфейс для элемента в корзине
export interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    isCartOpen: boolean;
    addProduct: (product: Product) => void;
    removeItem: (productId: number) => void; // Полностью удалить товар
    decreaseQuantity: (productId: number) => void; // Уменьшить количество на 1
    clearCart: () => void; // очистить корзину
    toggleCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    cart: [],
    isCartOpen: false,

    addProduct: (product) =>
        set((state) => {
            const existingItem = state.cart.find((item) => item.id === product.id);
            // Если товар уже в корзине, увеличиваем его количество
            if (existingItem) {
                return {
                    cart: state.cart.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }
            // Если товара нет, добавляем его с количеством 1
            return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),

    removeItem: (productId) =>
        set((state) => ({
            cart: state.cart.filter((item) => item.id !== productId),
        })),

    decreaseQuantity: (productId) =>
        set((state) => {
            return {
                cart: state.cart
                    .map((item) =>
                        item.id === productId
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    )
                    .filter((item) => item.quantity > 0), // Удаляем товар, если его количество стало 0
            };
        }),

    clearCart: () => set({ cart: [] }),

    toggleCart: () =>
        set((state) => ({
            isCartOpen: !state.isCartOpen,
        })),
}));