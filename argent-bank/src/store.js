// configureStore : Une fonction de la boîte à outils Redux qui simplifie la configuration du store.
import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./featuresUser/userSlice"


//Appel à la fonction configureStore pour créer un store Redux.

const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export default store

