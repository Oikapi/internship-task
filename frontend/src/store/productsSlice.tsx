import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { Product } from '../types/CommonTypes';

type ProductsState = {
    list: Product[];
    loading: boolean;
    error: string | null;
}

export const fetchProducts = createAsyncThunk<Product[], undefined, { rejectValue: string }>(
    'products/fetchProducts',
    async function (_, { rejectWithValue }) {
        const response = await fetch('/api/products/getAll');

        if (!response.ok) {
            return rejectWithValue('Server Error!');
        }

        const data = await response.json();

        return data;
    }
);

export const addNewProduct = createAsyncThunk<Product, Product, { rejectValue: string }>(
    'products/addNewProduct',
    async function (body, { rejectWithValue }) {

        const response = await fetch('/api/products/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            return rejectWithValue('Can\'t add task. Server error.');
        }

        return (await response.json()) as Product;
    }
);

export const editProduct = createAsyncThunk<Product, Product, { rejectValue: string, state: { products: ProductsState } }>(
    'products/editProduct',
    async function (body, { rejectWithValue, getState }) {


        const response = await fetch(`/api/products/edit/${body.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            return rejectWithValue('Can\'t edit product. Server error.');
        }

        return (await response.json()) as Product;

    }
);

export const deleteProduct = createAsyncThunk<number, number, { rejectValue: string, state: { products: ProductsState } }>(
    'products/deleteProduct',
    async function (id, { rejectWithValue, getState }) {
        const product = getState().products.list.find(product => product.id === id);

        const response = await fetch(`/api/products/delete/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            return rejectWithValue('Can\'t delete product. Server error.');
        }

        return id;
    }
);

const initialState: ProductsState = {
    list: [],
    loading: false,
    error: null,
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = action.payload.map(el => {
                    el.price = Number(el.price)
                    return el;
                });
                state.loading = false;
            })
            .addCase(addNewProduct.pending, (state) => {
                state.error = null;
            })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.list = [...state.list.map(el => {
                    if (el.id === action.payload.id) {
                        return action.payload
                    }
                    return el
                })]
                console.log(state.list)
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.list = state.list.filter(product => product.id !== action.payload);
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export default todoSlice.reducer;

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}