import { FC, useState } from 'react';

import cls from './CallSummary.module.scss';

import BtnExpand from 'src/features/BtnExpand';

interface CallSummaryProps {
    call: TCall;
}

const CallSummary: FC<CallSummaryProps> = ({ call }) => {
    const [showSummary, setShowSummary] = useState<boolean>(true);

    if (!call.summary) return;

    return (
        <div className={cls.summary}>
            <div className={cls.summary__btn} onClick={() => setShowSummary(!showSummary)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 2H8C4.691 2 2 4.691 2 8V21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H16C19.309 22 22 19.309 22 16V8C22 4.691 19.309 2 16 2ZM20 16C20 18.206 18.206 20 16 20H4V8C4 5.794 5.794 4 8 4H16C18.206 4 20 5.794 20 8V16Z" />
                    <path d="M11 6H13V14H11V6ZM11 16H13V18H11V16Z" />
                </svg>
                <p>Итог звонка:</p>
                <BtnExpand onOpen={showSummary} />
            </div>
            {showSummary && (
                <div className={cls.summary__text}>
                    {call.summary.split('\n').map((line, index) => (
                        <p key={index}>
                            {line.indexOf(':') !== -1 ? (
                                <>
                                    <span>{line.slice(0, line.indexOf(':') + 1)}</span>{' '}
                                    {line.slice(line.indexOf(':') + 1)}
                                </>
                            ) : (
                                line
                            )}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CallSummary;
