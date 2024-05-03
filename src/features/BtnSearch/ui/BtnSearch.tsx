import { FC } from 'react';

import cls from './BtnSearch.module.scss';

import { classNames } from 'src/shared/lib/classNames.ts';

interface BtnSearchProps {
    onSearch: boolean;
    setOnSearch: (newVol: boolean) => void;
}

const BtnSearch: FC<BtnSearchProps> = ({ onSearch, setOnSearch }) => {
    const handleToggleSearch = (): void => {
        setOnSearch(!onSearch);
    };

    return (
        <div className={cls.btnSearch}>
            <button onClick={handleToggleSearch}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.023 16.977C18.5546 16.5284 18.0988 16.0669 17.656 15.593C17.284 15.215 17.06 14.94 17.06 14.94L14.26 13.603C15.381 12.3316 15.9997 10.695 16 9C16 5.141 12.86 2 9 2C5.14 2 2 5.141 2 9C2 12.859 5.14 16 9 16C10.763 16 12.37 15.34 13.603 14.261L14.94 17.061C14.94 17.061 15.215 17.285 15.593 17.657C15.98 18.02 16.489 18.511 16.977 19.024L18.335 20.416L18.939 21.062L21.06 18.941L20.414 18.337C20.035 17.965 19.529 17.471 19.023 16.977ZM9 14C6.243 14 4 11.757 4 9C4 6.243 6.243 4 9 4C11.757 4 14 6.243 14 9C14 11.757 11.757 14 9 14Z" />
                </svg>
            </button>
            <input className={classNames('', { [cls.disable]: !onSearch })} type={'search'} />
            <button className={classNames('', { [cls.disable]: !onSearch })} onClick={handleToggleSearch}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.04999 18.364L5.63599 16.95L10.586 12L5.63599 7.04999L7.04999 5.63599L12 10.586Z" />
                </svg>
            </button>
        </div>
    );
};

export default BtnSearch;
