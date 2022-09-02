import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import anomaliesReducer from './anomalieSlice';
import compteursReducer from './compteurSlice';
import rueSecteurReducer from './rueSecteurSlice';
import tourneReducer from './tourneSlice';
import terminalReducer from './terminalSlice';

export const store = configureStore({
    reducer : {
        user : userReducer,
        anomalies : anomaliesReducer,
        compteurs : compteursReducer,
        rueSecteurs : rueSecteurReducer,
        tournes : tourneReducer,
        terminals : terminalReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
      })
});
