import cls from './Title.module.scss';

const Title = () => {
    return (
        <div className={cls.title}>
            <p>Телеграм бот</p>
            <p>"Штабной писарь"</p>
        </div>
    );
};

export default Title;
