import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./UserSlice";
import documentReducer from "./DocumentSlice";
import collaboratorsReducer from "./CollaboratorsSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        document: documentReducer,
        collaborators: collaboratorsReducer,
    }
});

export default store;
