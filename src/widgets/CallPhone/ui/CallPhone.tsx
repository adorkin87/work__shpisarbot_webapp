import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//styles
import cls from './CallPhone.module.scss';

//lib
import formatDate from 'src/shared/lib/formatDate.ts';
import formatSecond from 'src/shared/lib/formatSecond.ts';

//components
import AppIconCall from 'src/shared/ui/AppIconCall';
import BtnDetailInfo from 'src/features/BtnDetailInfo';
import BtnDel from 'src/features/BtnDel';
import BtnExpand from 'src/features/BtnExpand';

interface CallPhoneProps {
    call: TCall;
    handleBtnDel: () => void;
    expand?: boolean;
    showBtnDetail?: boolean;
}

const CallPhone: FC<CallPhoneProps> = ({ call, handleBtnDel, expand = true, showBtnDetail = true }) => {
    const navigate = useNavigate();
    const [showSummary, setShowSummary] = useState<boolean>(expand);

    const handleShowSummary = () => {
        setShowSummary(!showSummary);
    };

    return (
        <>
            <div className={cls.callPhone}>
                <div>
                    <div className={cls.time}>
                        <AppIconCall direction={call.direction} />
                        <p>
                            {formatDate(call.date_of).time} - {formatSecond(call.length_sec)}
                        </p>
                    </div>

                    {call.summary && <BtnExpand onOpen={showSummary} onClick={handleShowSummary} />}
                </div>
                <div>
                    {showBtnDetail && <BtnDetailInfo onClick={() => navigate('/call?m=' + call['id'])} />}
                    <BtnDel
                        onClick={() =>
                            Telegram.WebApp.showConfirm(
                                'Удалить информацию о звонке?',
                                (okPressed) => okPressed && handleBtnDel()
                            )
                        }
                    />
                </div>
            </div>
            {call.summary && showSummary && (
                <div className={cls.summary}>
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
        </>
    );
};

export default CallPhone;
