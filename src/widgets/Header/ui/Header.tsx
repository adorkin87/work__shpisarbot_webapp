import { useState } from 'react';

import cls from './Header.module.scss';

import HeaderBalance from 'src/features/HeaderBalance';
import BtnMenu from 'src/features/BtnMenu';
// import BtnSearch from 'src/features/BtnSearch';

const Header = () => {
    const [onSearch] = useState<boolean>(false);

    return (
        <div className={cls.header}>
            <HeaderBalance />
            <div className={cls.navButtons}>
                {/*<BtnSearch onSearch={onSearch} setOnSearch={setOnSearch} />*/}
                <BtnMenu disable={onSearch} />
            </div>
        </div>
    );
};

export default Header;
