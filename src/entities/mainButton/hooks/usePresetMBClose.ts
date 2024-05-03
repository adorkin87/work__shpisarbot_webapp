export const usePresetMBClose = (): TPresetMB => {
    const tg = Telegram.WebApp;

    return {
        params: { text: 'Закрыть', is_visible: true },
        onClick: (): void => tg.close()
    };
};
