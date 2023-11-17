import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { SERVER_URL } from 'shared/api/api';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { Input } from 'shared/ui/Input/Input';
import { getProfileForm, getProfileReadonly } from '../../../../entities/Profile/model/selectors/profileSelectors';
import { fetchProfileData } from '../../../../entities/Profile/model/services/fetchProfileData';
import { profileActions, profileReducer } from '../../../../entities/Profile/model/slice/profileSlice';
import cls from './Profile.module.scss';

interface ProfileProps {
    className?: string;
    id?: string;
}

const initalReducers = {
    profile: profileReducer,
};

export const Profile = memo((props: ProfileProps) => {
    const {
        className,
        id,
    } = props;

    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();
    const profile = useSelector(getProfileForm);
    const readonly = useSelector(getProfileReadonly);

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

    useEffect(() => {
        if (id) {
            dispatch(fetchProfileData({ id }));
        }
    }, [dispatch, id]);

    return (
        <DynamicModuleLoader reducers={initalReducers}>
            <div className={classNames(cls.Profile, {}, [className])}>
                <img
                    className={cls.avatar}
                    src={`${SERVER_URL}/images/${profile?.image}`}
                    alt="img"
                />
                <div className={cls.profileData}>
                    <h1 className={cls.profileDataTitle}>{t('user info')}</h1>
                    <div className={cls.profileField}>
                        <h3 className={cls.profileFiledTitle}>{t('user_email')}</h3>
                        <Input
                            className={classNames('', { [cls.profileFieldValue]: readonly }, [className])}
                            value={email}
                            readonly={readonly}
                            onChange={onChangeEmail}
                        />
                    </div>
                    <div className={cls.profileField}>
                        <h3 className={cls.profileFiledTitle}>{t('user_username')}</h3>
                        <Input
                            className={classNames('', { [cls.profileFieldValue]: readonly }, [className])}
                            value={username}
                            readonly={readonly}
                            onChange={onChangeUsername}
                        />
                    </div>
                    <div className={cls.profileField}>
                        <h3 className={cls.profileFiledTitle}>{t('user_bio')}</h3>
                        <Input
                            className={classNames('', { [cls.profileFieldValue]: readonly }, [className])}
                            value={bio}
                            readonly={readonly}
                            onChange={onChangeBio}
                        />
                    </div>
                </div>
            </div>
        </DynamicModuleLoader>
    );
});
