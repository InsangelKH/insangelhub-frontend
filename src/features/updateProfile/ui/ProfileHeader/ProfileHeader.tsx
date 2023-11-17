import { getProfileData, getProfileIsLoading, getProfileReadonly } from 'entities/Profile/model/selectors/profileSelectors';
import { profileActions } from 'entities/Profile/model/slice/profileSlice';
import { getUserData } from 'entities/User/model/selectors/userSelectors';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './ProfileHeader.module.scss';
import { updateProfile } from '../../model/services/updateProfile';

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
    const isLoading = useSelector(getProfileIsLoading);
    const userId = user?.id.toString();
    const readonly = useSelector(getProfileReadonly);

    const onEdit = useCallback(() => {
        dispatch(profileActions.onEdit());
    }, [dispatch]);

    const onCancel = useCallback(() => {
        dispatch(profileActions.onCancel());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfile());
    }, [dispatch]);

    return (
        <div className={classNames(cls.ProfileHeader, {}, [className])}>
            <h1>{`${t('user')} ${profile?.username}`}</h1>
            {id === userId && readonly && (
                <Button
                    className={cls.editBtn}
                    onClick={onEdit}
                    disabled={isLoading}
                >
                    {t('edit')}
                </Button>
            )}
            {id === userId && !readonly && (
                <div className={cls.editField}>
                    <Button
                        className={cls.editBtn}
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        className={cls.editSave}
                        theme={ButtonTheme.BACKGROUND_INVERTED}
                        onClick={onSave}
                        disabled={isLoading}
                    >
                        {t('save')}
                    </Button>
                </div>
            )}
        </div>
    );
});
