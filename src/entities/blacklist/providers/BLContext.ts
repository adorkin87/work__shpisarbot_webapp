import { createContext } from 'react';
import BlacklistStore from 'src/entities/blacklist';

const BLContext = createContext<BlacklistStore>(new BlacklistStore());

export default BLContext;
