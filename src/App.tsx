import React from 'react';
import { Provider } from 'react-redux';

import { AppRouter } from './routes';
import { StoreService } from './store';

const store = StoreService.init();

export const App: React.FC = () => {
    return <Provider store={store}>{AppRouter}</Provider>;
};
