import { RefObject, useEffect, useState } from 'react';

interface UseSetAllHeightProps {
    ref: RefObject<HTMLDivElement> | null;
}

const useStretchToBottom = ({ ref }: UseSetAllHeightProps) => {
    if (!ref) return;

    const tg = Telegram.WebApp;
    const [viewportHeight, setViewportHeight] = useState<number>(tg.viewportStableHeight);

    tg.onEvent('viewportChanged', () => setViewportHeight(tg.viewportStableHeight));

    useEffect(() => {
        const divElem: HTMLDivElement | null = ref.current;
        if (divElem === null) return;
        divElem.style.height = viewportHeight - divElem.offsetTop + 'px';
    }, [viewportHeight]);
};

export default useStretchToBottom;
