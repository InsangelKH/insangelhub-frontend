import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './LangSwitcher.module.scss';

interface LangSwithcerProps {
    className?: string;
}

export const LangSwithcer = memo((props: LangSwithcerProps) => {
    const {
        className,
    } = props;

    const { t, i18n } = useTranslation();

    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <button
            className={classNames(cls.LangSwitcher, {}, [className])}
            onClick={toggle}
        >
            {t('language')}
        </button>
    );
});
