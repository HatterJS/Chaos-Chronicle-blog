import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

//async request to the backend for registration
export const fetchRegistrationData = createAsyncThunk(
  "authorization/fetchRegistrationData",
  async (params) => {
    try {
      const { data } = await axios.post("/authorization/registration", params);
      return data;
    } catch (err) {
      const { message } = err.response.data;
      throw new Error(message);
    }
  }
);
//async request to the backend for authorization
export const fetchUserData = createAsyncThunk(
  "authorization/fetchUserData",
  async (params) => {
    try {
      const { data } = await axios.post("/authorization/authorization", params);
      return data;
    } catch (err) {
      const { message } = err.response.data;
      throw new Error(message);
    }
  }
);
//async request to the backend for authorization by token
export const fetchToken = createAsyncThunk(
  "/authorization/fetchToken",
  async () => {
    const { data } = await axios.get("/authorization/verification");
    return data;
  }
);
//async request to the backend for Email confirmation
export const fetchConfirmEmail = createAsyncThunk(
  "/authorization/fetchConfirmEmail",
  async () => {
    try {
      const { data } = await axios.get("/confirmemail");
      localStorage.setItem("token", data.token);
      alert(data.message);
      return data;
    } catch (err) {
      const { message } = err.response.data;
      alert(message);
      throw new Error(message);
    }
  }
);
//async request to the backend to change user data
export const fetchChangeUserData = createAsyncThunk(
  "/authorization/fetchChangeUserData",
  async (params) => {
    try {
      const { data } = await axios.patch(`/authorization/changeData`, params);
      alert(data.message);
      return data;
    } catch (err) {
      const { message } = err.response.data;
      alert(message);
      throw new Error(message);
    }
  }
);

export const isAuthCheck = (state) => Boolean(state.authorization.userData);

const initialState = {
  userData: null,
  status: "loading",
};

const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    logOut: (state) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistrationData.pending, (state) => {
        state.userData = null;
        state.status = "loading";
      })
      .addCase(fetchRegistrationData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchRegistrationData.rejected, (state) => {
        state.userData = null;
        state.status = "error";
      })
      .addCase(fetchUserData.pending, (state) => {
        state.userData = null;
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.userData = null;
        state.status = "error";
      })
      .addCase(fetchToken.pending, (state) => {
        state.userData = null;
        state.status = "loading";
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchToken.rejected, (state) => {
        state.userData = null;
        state.status = "error";
      })
      .addCase(fetchConfirmEmail.pending, (state) => {
        state.userData = null;
        state.status = "loading";
      })
      .addCase(fetchConfirmEmail.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchConfirmEmail.rejected, (state) => {
        state.userData = null;
        state.status = "error";
      })
      .addCase(fetchChangeUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChangeUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchChangeUserData.rejected, (state) => {
        state.status = "loaded";
      });
  },
});

export const { logOut } = authorizationSlice.actions;

export default authorizationSlice.reducer;
