import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './ProfileError.module.scss';

interface ProfileErrorProps {
    className?: string;
}

export const ProfileError = memo((props: ProfileErrorProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('profile');

    return (
        <div className={classNames(cls.ProfileError, {}, [className])}>
            <h1>{t('profile error')}</h1>
        </div>
    );
});
