import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import { userReducer } from '../features/users/UserSlice';
import { mealReducer } from '../features/meals/mealSlice';
import { commentsReducer } from '../features/comments/commentsSlice';

const persistConfig = {
  key: 'store',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
  meal: mealReducer,
  comments: commentsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type Rootstate = ReturnType<typeof store.getState>;
