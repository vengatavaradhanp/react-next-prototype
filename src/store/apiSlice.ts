/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create async thunks for API calls
export const fetchData = createAsyncThunk(
    'api/fetchData',
    async (url: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

export const postData = createAsyncThunk(
    'api/postData',
    async ({ url, body }: { url: string; body: unknown }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${url}`, body, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

// Add similar thunks for put and delete operations

const apiSlice = createSlice({
    name: 'api',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchData.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
        // Add similar cases for postData and other async thunks

    },
});

export default apiSlice.reducer;

// Helper function to get token from cookies
function getToken() {
    if (typeof window === 'undefined') {
        // Server-side
        return ''; // You'll need to implement server-side cookie reading here
    } else {
        // Client-side
        const match = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/);
        return match ? match[2] : '';
    }
}
