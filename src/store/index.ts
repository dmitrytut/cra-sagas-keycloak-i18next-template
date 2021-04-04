import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { initialReduxState, rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

/**
 * Redux store initialization.
 */
const init = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];

    const store = configureStore({
        reducer: rootReducer,
        middleware: [...getDefaultMiddleware({ thunk: false }), ...middlewares],
        preloadedState: initialReduxState(),
        devTools: process.env.NODE_ENV !== 'production',
    });

    sagaMiddleware.run(rootSaga);

    return store;
};

export const StoreService = {
    init,
};
