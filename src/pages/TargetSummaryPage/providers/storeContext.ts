import { createContext } from 'react';
import TargetPromptStore from 'src/entities/targetPrompt/model/targetPrompt.store.ts';

const TargetPromptContext = createContext<TargetPromptStore>(new TargetPromptStore());
export default TargetPromptContext;
