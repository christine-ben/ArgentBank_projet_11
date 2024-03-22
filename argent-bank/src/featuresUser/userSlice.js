import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const url = "http://localhost:3001/api/v1/";

    // Actions asynchrones pour les requêtes API
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
      // Envoi de la requête d'authentification
      const response = await fetch(url + "user/login", postMethod);
      // Vérification de la réponse
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
      const json = await response.json();
      return json.body.token;
    } catch (error) {
      // En cas d'erreur, rejeter avec la valeur
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
      // Envoi de la requête de profil
      const response = await fetch(url + "user/profile", postMethod);
      // Vérification de la réponse
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
      const json = await response.json();
      return json.body;
    } catch (error) {
      // En cas d'erreur, rejeter avec la valeur
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
      // Envoi de la requête de mise à jour du nom d'utilisateur
      const response = await fetch(url + "user/profile", putMethod);
      // Vérification de la réponse
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
      const json = await response.json();
      return json.body;
    } catch (error) {
      // En cas d'erreur, rejeter avec la valeur
      return rejectWithValue(error.message);
    }
  }
);

// Slice pour gérer l'état de l'utilisateur
const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    token: JSON.parse(localStorage.getItem("token")) || null,
    error: null,
  },
  reducers: {
    // Reducer pour déconnecter l'utilisateur
    logout: (state) => {
      state.profile = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
    },
    // Reducer pour réinitialiser l'erreur
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Gestion des actions asynchrones
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
      });
  },
});

export default userSlice.reducer;

// Sélecteurs pour récupérer des parties spécifiques de l'état de l'utilisateur
export const selectToken = (state) => state.user.token;
export const selectProfile = (state) => state.user.profile;
export const selectError = (state) => state.user.error;

// Actions exportées
export const { logout, resetError } = userSlice.actions;
