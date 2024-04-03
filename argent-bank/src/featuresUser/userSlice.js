import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";

const url = "http://localhost:3001/api/v1/";

export const loginRequest = createAsyncThunk(
  "user/loginRequest",
  async (userLogs, { rejectWithValue }) => {
    try {
      const postMethod = {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          email: userLogs.get("username"),
          password: userLogs.get("password"),
        }),
      };
      const response = await fetch(url + "user/login", postMethod);
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
      const json = await response.json();
      return json.body.token;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const profileRequest = createAsyncThunk(
  "user/profileRequest",
  async (token, { rejectWithValue }) => {
    try {
      const postMethod = {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url + "user/profile", postMethod);
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
      const json = await response.json();
      return json.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const usernameUpdateRequest = createAsyncThunk(
  "user/usernameUpdateRequest",
  async (props, { rejectWithValue }) => {
    try {
      const putMethod = {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify({
          userName: props.updatedUsername,
        }),
      };
      const response = await fetch(url + "user/profile", putMethod);
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
      const json = await response.json();
      return json.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    token: JSON.parse(localStorage.getItem("token")) || null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.profile = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
    },
    resetError: (state) => {
      state.error = null;
    },
    setErrorMessage: (state, action) => { // Correction ici
      state.error = action.payload;
    }, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginRequest.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem("token", JSON.stringify(state.token));
      })
      .addCase(loginRequest.rejected, (state, action) => {
        state.token = null;
        state.error = action.payload;
      })
      .addCase(profileRequest.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(usernameUpdateRequest.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(setErrorMessage, (state, action) => { // Gestion de l'action setErrorMessage
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;

export const { logout, resetError } = userSlice.actions;
export const setErrorMessage = createAction("user/setErrorMessage"); // Exportez setErrorMessage

export const selectToken = (state) => state.user.token;
export const selectProfile = (state) => state.user.profile;
export const selectError = (state) => state.user.error;
