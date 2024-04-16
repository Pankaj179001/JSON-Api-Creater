import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../BaseUrl";

export const createApiRecords = createAsyncThunk(
  "records/createApi",
  async (requestData: { data: any[]; config: any }, thunkAPI) => {
    try {
      console.log({requestData});
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
      // Handle successful creation of record
      // You may update state here if necessary
    });
    builder.addCase(createApiRecords.rejected, (state, action) => {
      // Handle rejection of creating record
      // You may update state here if necessary
    });
  },
});

export default ApiSlice.reducer;

// Export any additional actions or selectors if needed
// export const { someAction } = recordSlice.actions;
