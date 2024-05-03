import { createContext } from 'react';

import MainButtonStore from '../model/mainButton.store.ts';
const MainButtonContext = createContext(new MainButtonStore());

export default MainButtonContext;
