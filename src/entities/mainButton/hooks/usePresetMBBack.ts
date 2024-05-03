import { useLocation, useNavigate } from 'react-router-dom';

export const usePresetMBBack = (): TPresetMB => {
    const navigate = useNavigate();
    const location = useLocation();

    return {
        params: { text: location.key === 'default' ? 'На главную' : 'Назад', is_visible: true },
        onClick: (): void => {
            location.key === 'default' ? navigate('/') : navigate(-1);
        }
    };
};
