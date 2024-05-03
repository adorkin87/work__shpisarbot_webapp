import { FC, useState } from 'react';

import cls from './CallText.module.scss';

import BtnExpand from 'src/features/BtnExpand';

interface CallTextProps {
    call: TCall;
}

const CallText: FC<CallTextProps> = ({ call }) => {
    const [showText, setShowText] = useState<boolean>(false);

    if (!call.record_text) return;

    return (
        <div className={cls.recordText}>
            <div className={cls.recordText__btn} onClick={() => setShowText(!showText)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 2H8C4.691 2 2 4.691 2 8V21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H16C19.309 22 22 19.309 22 16V8C22 4.691 19.309 2 16 2ZM20 16C20 18.206 18.206 20 16 20H4V8C4 5.794 5.794 4 8 4H16C18.206 4 20 5.794 20 8V16Z" />
                    <path d="M7 9H17V11H7V9ZM7 13H14V15H7V13Z" />
                </svg>
                <p>Текст звонка</p>
                <BtnExpand onOpen={showText} />
            </div>
            {showText && (
                <div className={cls.recordText__text}>
                    {Object.entries(call.record_text).map((phrase: any) => (
                        <div key={phrase[0]}>- {phrase[1]['text']}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CallText;
