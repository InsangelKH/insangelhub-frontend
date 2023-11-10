import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ReactNode, memo } from 'react';
import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
}

export const Page = (props: PageProps) => {
    const {
        className,
        children,
    } = props;

    const { t } = useTranslation();

    return (
        <main className={classNames(cls.Page, {}, [className])}>
            {children}
        </main>
    );
};
