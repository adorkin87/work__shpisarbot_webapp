import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

//types
import { HistoryCalls } from 'src/entities/calls/types/enums.ts';

//styles
import cls from './CallHistory.module.scss';

//components
import BtnExpand from 'src/features/BtnExpand';
import CallPhone from 'src/widgets/CallPhone';

//stores
import CallsStore from 'src/entities/calls';

interface CallHistoryProps {
    call: TCall;
}

const CallHistory: FC<CallHistoryProps> = observer(({ call }) => {
    const [showHistory, setShowHistory] = useState<boolean>(false);
    const [historyCalls] = useState(() => new CallsStore({}));

    useEffect(() => {
        if (showHistory && historyCalls.value.length === 0) {
            historyCalls.getCalls({ history: HistoryCalls.CONTACT, messageID: call.id });
        }
    }, [showHistory]);

    const handleShowHistory = () => {
        setShowHistory(!showHistory);
    };

    return (
        <div className={cls.history}>
            <div className={cls.history__btn} onClick={handleShowHistory}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 11H9V13H7V11ZM7 15H9V17H7V15ZM11 11H13V13H11V11ZM11 15H13V17H11V15ZM15 11H17V13H15V11ZM15 15H17V17H15V15Z" />
                    <path d="M5 22H19C20.103 22 21 21.103 21 20V6C21 4.897 20.103 4 19 4H17V2H15V4H9V2H7V4H5C3.897 4 3 4.897 3 6V20C3 21.103 3.897 22 5 22ZM19 8L19.001 20H5V8H19Z" />
                </svg>
                <p>История звонков</p>
                <BtnExpand onOpen={showHistory} />
            </div>
            {showHistory && (
                <div className={cls.history__list}>
                    {historyCalls.value.length > 1 ? (
                        historyCalls.value.map((historyCall: TCall) => (
                            <CallPhone
                                key={historyCall.id}
                                call={historyCall}
                                handleBtnDel={() => historyCalls.delCall({ messageID: historyCall.id })}
                                expand={false}
                                showBtnDetail={!(historyCall.id === call.id)}
                            />
                        ))
                    ) : (
                        <p>Нет истории звонков</p>
                    )}
                </div>
            )}
        </div>
    );
});

export default CallHistory;
