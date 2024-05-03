import { createContext } from 'react';

import IntegrationsStore from 'src/entities/integrations/model/integrations.store.ts';

const IntegrationsContext = createContext(new IntegrationsStore());
export default IntegrationsContext;
