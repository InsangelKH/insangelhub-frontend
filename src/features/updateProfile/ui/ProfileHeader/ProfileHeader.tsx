import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getProfileData, getProfileReadonly } from 'entities/Profile/model/selectors/profileSelectors';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { profileActions } from 'entities/Profile/model/slice/profileSlice';
import { useParams } from 'react-router';
import { getUserData } from 'entities/User/model/selectors/userSelectors';
import cls from './ProfileHeader.module.scss';

interface ProfileHeaderProps {
    className?: string;
}

export const ProfileHeader = memo((props: ProfileHeaderProps) => {
    const {
        className,
    } = props;

    const { id } = useParams<{id: string}>();

    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();

    const profile = useSelector(getProfileData);
    const user = useSelector(getUserData);
    const userId = user?.id.toString();
    const readonly = useSelector(getProfileReadonly);

    const onEdit = useCallback(() => {
        dispatch(profileActions.onEdit());
    }, [dispatch]);

    const onCancel = useCallback(() => {
        dispatch(profileActions.onCancel());
    }, [dispatch]);

    return (
        <div className={classNames(cls.ProfileHeader, {}, [className])}>
            <h1>{`${t('user')} ${profile?.username}`}</h1>
            {id === userId && readonly && (
                <Button
                    className={cls.editBtn}
                    onClick={onEdit}
                >
                    {t('edit')}
                </Button>
            )}
            {id === userId && !readonly && (
                <div className={cls.editField}>
                    <Button
                        className={cls.editBtn}
                        onClick={onCancel}
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        className={cls.editBtn}
                        theme={ButtonTheme.BACKGROUND_INVERTED}
                    >
                        {t('save')}
                    </Button>
                </div>
            )}
        </div>
    );
});
