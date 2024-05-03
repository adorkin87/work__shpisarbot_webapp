import cls from './AppLoading.module.scss';

const AppLoading = () => {
    return (
        <div className={cls.wrapper}>
            <div className={cls.loading}>
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    );
};

export default AppLoading;
