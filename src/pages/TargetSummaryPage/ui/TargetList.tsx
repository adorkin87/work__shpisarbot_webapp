import { useContext } from 'react';

import cls from './TargetList.module.scss';

import AppSwitch from 'src/shared/ui/AppSwitch';

import TargetPromptContext from '../providers/storeContext.ts';
import { observer } from 'mobx-react-lite';

const TargetList = observer(() => {
    const targetPrompt = useContext(TargetPromptContext);

    return (
        <div className={cls.targetList}>
            {targetPrompt.value &&
                targetPrompt.value.aims_list.map((target: TTarget) => (
                    <div key={target.aim_id} className={cls.target}>
                        <p>{target.aim}</p>
                        <AppSwitch
                            value={target.aim_id === targetPrompt.value?.current_aim.aim_id}
                            setValue={() => targetPrompt.update(target.aim_id)}
                        />
                    </div>
                ))}
        </div>
    );
});

export default TargetList;
