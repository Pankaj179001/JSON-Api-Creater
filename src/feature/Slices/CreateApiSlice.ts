import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../BaseUrl";
import { toast } from "react-toastify";

export const createApiRecords = createAsyncThunk(
  "records/createApi",
  async (requestData: { data: any[]; config: any }, thunkAPI) => {
    try {
      const response = await fetch(`${BaseUrl}/schema`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error("Api Error");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      // Specify the type of error as 'any' or 'Error'
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);
let id: any;
const ApiSlice = createSlice({
  name: "records",
  initialState: {
    // Define initial state here if needed
  },
  reducers: {
    // Define other reducers if needed
  },
  extraReducers: (builder) => {
    builder.addCase(createApiRecords.fulfilled, (state, action) => {
      console.log(state);
      toast.update(id, {
        render: "api created successfully",
        type: "success",
        isLoading: false,
        data: action?.payload,
        autoClose: 4000,
      });
    });
    builder.addCase(createApiRecords.rejected, (state, action) => {
      toast.update(id, {
        render: "failed to create your api",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    });
    builder.addCase(createApiRecords.pending, (state, action) => {
      id = toast("hold on ..we are working on your request 🔃", {
        autoClose: 3000,
        closeOnClick: true,
        isLoading: true,
      });
    });
  },
});

export default ApiSlice.reducer;
