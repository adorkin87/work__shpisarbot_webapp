import { useCallback, useState } from 'react';

interface IUseIntersectionObserver {
    rootMargin?: string;
    threshold?: number;
}

const useIntersectionObserver = ({ rootMargin = '0', threshold = 0 }: IUseIntersectionObserver) => {
    const [observer, setObserver] = useState<IntersectionObserver | null>(null);
    const [isIntersecting, setIntersecting] = useState<boolean>(false);

    const measureRef = useCallback((node: HTMLElement) => {
        if (node) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    setIntersecting(entry.isIntersecting);
                },
                { root: document, rootMargin, threshold }
            );

            observer.observe(node);
            setObserver(observer);
        }
    }, []);

    return { measureRef, isIntersecting, observer };
};

export default useIntersectionObserver;
