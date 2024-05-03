import { useRef } from 'react';
import { TailSpin } from 'react-loader-spinner';

import cls from './AppSpinner.module.scss';

import useStretchToBottom from 'src/shared/hooks/useStretchToBottom.tsx';

const AppSpinner = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    useStretchToBottom({ ref });

    return (
        <div ref={ref} className={cls.appSpinner}>
            <TailSpin
                visible={true}
                height="80"
                width="80"
                color={Telegram.WebApp.themeParams.button_color}
                ariaLabel="tail-spin-loading"
                radius="1"
            />
        </div>
    );
};

export default AppSpinner;
