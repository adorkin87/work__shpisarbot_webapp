import { forwardRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//styles
import cls from './CallGeneral.module.scss';

//lib
import formatDate from 'src/shared/lib/formatDate.ts';
import formatSecond from 'src/shared/lib/formatSecond.ts';

//components
import AppIconCall from 'src/shared/ui/AppIconCall';
import BtnDetailInfo from 'src/features/BtnDetailInfo';
import BtnDel from 'src/features/BtnDel';

interface ICallGeneral {
    call: TCall;
    handleBtnDel: () => void;
}

const CallGeneral = forwardRef<any, ICallGeneral>(({ call, handleBtnDel }, ref) => {
    const navigate = useNavigate();

    return (
        <div ref={ref} className={cls.callGeneral}>
            <div>
                <AppIconCall direction={call['direction']} />
                <p>{formatDate(call['date_of']).time}</p>
                <Link to={'/calls?m=' + call['id'] + '&h=1'}>{call['phone']}</Link>
                <p> {formatSecond(call['length_sec'])}</p>
            </div>
            <div>
                <BtnDetailInfo onClick={() => navigate('/call?m=' + call['id'])} />
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
    );
});

export default CallGeneral;
