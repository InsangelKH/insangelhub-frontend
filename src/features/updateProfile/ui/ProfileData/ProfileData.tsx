import { getProfileForm } from 'entities/Profile/model/selectors/profileSelectors';
import { getUserData } from 'entities/User/model/selectors/userSelectors';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { profileActions } from 'entities/Profile/model/slice/profileSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import cls from './ProfileData.module.scss';

interface ProfileDataProps {
    className?: string;
    readonly?: boolean;
}

export const ProfileData = memo((props: ProfileDataProps) => {
    const {
        className,
        readonly,
    } = props;

    const { t } = useTranslation('profile');

    const dispatch = useAppDispatch();

    const profile = useSelector(getProfileForm);
    const user = useSelector(getUserData);

    const email = profile?.email || '';
    const username = profile?.username || '';
    const bio = profile?.bio || '';

    const onChangeEmail = useCallback((value?: string) => {
        dispatch(profileActions.updateForm({ email: value || '' }));
    }, [dispatch]);

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateForm({ username: value || '' }));
    }, [dispatch]);

    const onChangeBio = useCallback((value?: string) => {
        dispatch(profileActions.updateForm({ bio: value || '' }));
    }, [dispatch]);

    return (
        <div className={classNames(cls.ProfileData, {}, [className])}>
            <h1 className={cls.profileDataTitle}>{t('user info')}</h1>
            {profile?.id === user?.id && (
                <div className={cls.profileField}>
                    <h3 className={cls.profileFieldTitle}>{t('user_email')}</h3>
                    {readonly && <p>{email}</p>}
                    {!readonly && (
                        <Input
                            className={classNames(cls.input, { [cls.profileFieldValue]: readonly }, [className])}
                            value={email}
                            readonly={readonly}
                            onChange={onChangeEmail}
                        />
                    ) }
                </div>
            )}
            <div className={cls.profileField}>
                <h3 className={cls.profileFieldTitle}>{t('user_username')}</h3>
                {readonly && <p>{username}</p>}
                {!readonly && (
                    <Input
                        className={classNames(cls.input, { [cls.profileFieldValue]: readonly }, [className])}
                        value={username}
                        readonly={readonly}
                        onChange={onChangeUsername}
                    />
                ) }
            </div>
            <div className={cls.profileField}>
                <h3 className={cls.profileFieldTitle}>{t('user_bio')}</h3>
                {readonly && <p>{bio}</p>}
                {!readonly && (
                    <Input
                        className={classNames(cls.input, { [cls.profileFieldValue]: readonly }, [className])}
                        value={bio}
                        readonly={readonly}
                        onChange={onChangeBio}
                    />
                )}
            </div>
        </div>
    );
});
