import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  products: [],
  error: "",
};

export const tableProducts = createAsyncThunk(
  "tableProducts/fetchProducts",
  async () => {
    return await axios
      .get("http://localhost:8000/rostAbout")
      .then((response) => response.data);
  }
);

export const deleteProduct = createAsyncThunk(
  "tableProducts/fetchProducts",
  async (id) => {
    return await axios
      .delete(`http://localhost:8000/rostAbout/${id}`)
      .then((response) => response.data);
  }
);

export const updatePost = createAsyncThunk(
  "tableProducts/updatePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.put(
        `http://localhost:8000/rostAbout/${id}`,
        initialPost
      );
      console.log(response.data);
    } catch (err) {
      return initialPost;
    }
  }
);

const tableProductSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(tableProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(tableProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(tableProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });
  },
});
export default tableProductSlice.reducer;
