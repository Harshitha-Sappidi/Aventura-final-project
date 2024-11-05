import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  availableQuantity: number;
  image: string;
  type?: string;
}

interface CartState {
  items: CartItem[];
  userEmail: string | null;
}

const initialState: CartState = {
  items: [],
  userEmail: null,
};

const saveCartToLocalStorage = (userEmail: string, items: CartItem[]) => {
  localStorage.setItem(`cartItems_${userEmail}`, JSON.stringify(items));
};

const loadCartFromLocalStorage = (userEmail: string): CartItem[] => {
  const storedCart = localStorage.getItem(`cartItems_${userEmail}`);
  return storedCart ? JSON.parse(storedCart) : [];
};

const updateAppBadge = (totalItems: number) => {
  if ('setAppBadge' in navigator) {
    // @ts-ignore
    navigator.setAppBadge(totalItems).catch(err => console.error('Badge API error:', err));
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
      state.items = loadCartFromLocalStorage(action.payload);
      updateAppBadge(state.items.reduce((total, item) => total + item.quantity, 0));
    },
    initializeCart: (state) => {
      if (state.userEmail) {
        state.items = loadCartFromLocalStorage(state.userEmail);
        updateAppBadge(state.items.reduce((total, item) => total + item.quantity, 0));
      }
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemToAdd = action.payload;
      const existingItem = state.items.find(item => item._id === itemToAdd._id && item.type === itemToAdd.type);
      if (existingItem) {
        const newQuantity = existingItem.quantity + itemToAdd.quantity;

        if (newQuantity > itemToAdd.availableQuantity) {
          existingItem.quantity = itemToAdd.availableQuantity;
        } else {
          existingItem.quantity = newQuantity;
        }
      } else {
        if (itemToAdd.quantity > itemToAdd.availableQuantity) {
          itemToAdd.quantity = itemToAdd.availableQuantity;
        }
        state.items.push(itemToAdd);
      }

      if (state.userEmail) {
        saveCartToLocalStorage(state.userEmail, state.items);
      }

      // Update the badge after adding to the cart
      updateAppBadge(state.items.reduce((total, item) => total + item.quantity, 0));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      if (state.userEmail) {
        saveCartToLocalStorage(state.userEmail, state.items);
      }
      updateAppBadge(state.items.reduce((total, item) => total + item.quantity, 0));
    },
    clearCart: (state) => {
      state.items = [];
      if (state.userEmail) {
        saveCartToLocalStorage(state.userEmail, state.items);
      }
      updateAppBadge(0); // Clear the badge when the cart is cleared
    },
    updateCartItemQuantity: (state, action: PayloadAction<{ productId: string, quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find(item => item._id === productId);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      if (state.userEmail) {
        saveCartToLocalStorage(state.userEmail, state.items);
      }
      updateAppBadge(state.items.reduce((total, item) => total + item.quantity, 0));
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCartItemQuantity, setUserEmail, initializeCart } = cartSlice.actions;

export default cartSlice.reducer;
