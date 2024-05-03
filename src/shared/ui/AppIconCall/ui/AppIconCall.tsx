import { FC } from 'react';

import cls from './AppIconCall.module.scss';

enum CallDirection {
    Unknown = 0,
    Income = 1,
    Outcome = 2
}

interface AppIconCallProps {
    direction: CallDirection;
}

const AppIconCall: FC<AppIconCallProps> = ({ direction }) => {
    if (direction === CallDirection.Unknown)
        return (
            <svg
                className={cls.callUnknown}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4C9.243 4 7 6.243 7 9H9C9 7.346 10.346 6 12 6C13.654 6 15 7.346 15 9C15 10.069 14.546 10.465 13.519 11.255C13.137 11.549 12.706 11.881 12.293 12.293C10.981 13.604 10.995 14.897 11 15V17H13V14.991C13 14.967 13.023 14.39 13.707 13.707C14.027 13.387 14.389 13.109 14.738 12.84C15.798 12.024 17 11.1 17 9C17 6.243 14.757 4 12 4ZM11 18H13V20H11V18Z" />
            </svg>
        );

    if (direction === CallDirection.Income)
        return (
            <svg
                className={cls.callIn}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M16.712 13.288C16.6192 13.1951 16.509 13.1214 16.3877 13.0711C16.2664 13.0207 16.1364 12.9948 16.005 12.9948C15.8737 12.9948 15.7436 13.0207 15.6223 13.0711C15.501 13.1214 15.3908 13.1951 15.298 13.288L13.701 14.884C12.877 14.639 11.535 14.113 10.711 13.288C9.83703 12.414 9.33703 11.035 9.11703 10.296L10.711 8.70205C10.804 8.60926 10.8777 8.49905 10.928 8.37774C10.9783 8.25642 11.0042 8.12638 11.0042 7.99505C11.0042 7.86371 10.9783 7.73367 10.928 7.61235C10.8777 7.49104 10.804 7.38083 10.711 7.28805L6.71103 3.28805C6.51985 3.1076 6.26691 3.00708 6.00403 3.00708C5.74114 3.00708 5.4882 3.1076 5.29703 3.28805L2.58803 5.99805C2.20603 6.37805 1.99103 6.90205 2.00003 7.43505C2.02203 8.85805 2.39603 13.802 6.29703 17.703C10.195 21.6 15.142 21.977 16.566 22H16.594C17.122 22 17.621 21.792 17.999 21.414L20.711 18.702C20.804 18.6093 20.8777 18.4991 20.928 18.3777C20.9783 18.2564 21.0042 18.1264 21.0042 17.995C21.0042 17.8637 20.9783 17.7337 20.928 17.6124C20.8777 17.491 20.804 17.3808 20.711 17.288L16.712 13.288ZM16.585 20C15.337 19.979 11.067 19.644 7.71103 16.288C4.34303 12.92 4.01903 8.63605 4.00003 7.41405L6.00403 5.40905L8.59003 7.99505L7.29703 9.28805C7.05903 9.52605 6.95703 9.87005 7.02603 10.2C7.05003 10.315 7.63703 13.042 9.29703 14.702C10.957 16.362 13.684 16.949 13.799 16.973C13.9616 17.0077 14.1302 17.0011 14.2896 16.9537C14.4489 16.9064 14.5938 16.8199 14.711 16.702L16.004 15.409L18.59 17.995L16.585 20Z" />
                <path d="M15.7949 6.79096L13.0049 3.99996V10.995H19.9999L17.2089 8.20496L21.7119 3.70196L20.2979 2.28796L15.7949 6.79096Z" />
            </svg>
        );

    if (direction === CallDirection.Outcome)
        return (
            <svg
                className={cls.callOut}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M16.712 13.288C16.6192 13.195 16.509 13.1213 16.3877 13.071C16.2664 13.0206 16.1363 12.9948 16.005 12.9948C15.8736 12.9948 15.7436 13.0206 15.6223 13.071C15.501 13.1213 15.3908 13.195 15.298 13.288L13.704 14.882C12.965 14.662 11.586 14.162 10.712 13.288C9.83797 12.414 9.33797 11.035 9.11797 10.296L10.712 8.70195C10.8049 8.60916 10.8787 8.49896 10.929 8.37765C10.9793 8.25633 11.0052 8.12629 11.0052 7.99495C11.0052 7.86362 10.9793 7.73357 10.929 7.61226C10.8787 7.49094 10.8049 7.38074 10.712 7.28795L6.71197 3.28795C6.61918 3.19501 6.50898 3.12127 6.38767 3.07096C6.26635 3.02065 6.13631 2.99475 6.00497 2.99475C5.87364 2.99475 5.74359 3.02065 5.62228 3.07096C5.50096 3.12127 5.39076 3.19501 5.29797 3.28795L2.58597 5.99995C2.20597 6.37995 1.99197 6.90195 1.99997 7.43495C2.02297 8.85895 2.39997 13.805 6.29797 17.703C10.196 21.601 15.142 21.977 16.566 22H16.594C17.122 22 17.621 21.792 17.999 21.414L20.711 18.702C20.8039 18.6092 20.8777 18.499 20.928 18.3776C20.9783 18.2563 21.0042 18.1263 21.0042 17.995C21.0042 17.8636 20.9783 17.7336 20.928 17.6123C20.8777 17.4909 20.8039 17.3807 20.711 17.288L16.712 13.288ZM16.585 20C15.337 19.979 11.067 19.644 7.71197 16.288C4.34597 12.922 4.01997 8.63695 3.99997 7.41395L6.00497 5.40895L8.59097 7.99495L7.29797 9.28795C7.18043 9.4054 7.09401 9.55029 7.04652 9.70952C6.99903 9.86875 6.99197 10.0373 7.02597 10.2C7.04997 10.315 7.63697 13.042 9.29697 14.702C10.957 16.362 13.684 16.949 13.799 16.973C13.9615 17.0077 14.1302 17.0011 14.2895 16.9538C14.4489 16.9064 14.5938 16.8198 14.711 16.702L16.004 15.409L18.59 17.995L16.585 20Z" />
                <path d="M16.7951 5.791L12.2981 10.288L13.7121 11.702L18.2091 7.205L21.0051 10V2.995H14.0001L16.7951 5.791Z" />
            </svg>
        );
};

export default AppIconCall;