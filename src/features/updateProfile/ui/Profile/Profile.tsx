import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SERVER_URL } from 'shared/api/api';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { serverOrUserError } from '../../model/rejections/profileRejections';
import {
    getProfileError,
    getProfileForm, getProfileImageFile, getProfileIsLoading, getProfileReadonly,
} from '../../../../entities/Profile/model/selectors/profileSelectors';
import { fetchProfileData } from '../../../../entities/Profile/model/services/fetchProfileData';
import { profileReducer } from '../../../../entities/Profile/model/slice/profileSlice';
import DefaultAvatar from '../../../../shared/assets/pictures/default-avatar.png';
import { ProfileAvatar } from '../ProfileAvatar/ProfileAvatar';
import { ProfileData } from '../ProfileData/ProfileData';
import { ProfileHeader } from '../ProfileHeader/ProfileHeader';
import { ProfileSkeleton } from '../ProfileSkeleton/ProfileSkeleton';
import cls from './Profile.module.scss';
import { ProfileError } from '../ProfileError/ProfileError';

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

    const dispatch = useAppDispatch();
    const profile = useSelector(getProfileForm);
    const readonly = useSelector(getProfileReadonly);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);

    let avatar: string;

    if (profile?.image === '') {
        avatar = DefaultAvatar;
    } else {
        avatar = `${SERVER_URL}/images/${profile?.image}`;
    }

    const imageFile = useSelector(getProfileImageFile);
    let imageSrc;

    if (imageFile) {
        imageSrc = URL.createObjectURL(imageFile);
    }

    useEffect(() => {
        if (id) {
            dispatch(fetchProfileData({ id }));
        }
    }, [dispatch, id]);

    if (isLoading) {
        return (
            <DynamicModuleLoader reducers={initalReducers}>
                <ProfileSkeleton />
            </DynamicModuleLoader>
        );
    }

    if (error === serverOrUserError) {
        return (
            <DynamicModuleLoader reducers={initalReducers}>
                <ProfileError />
            </DynamicModuleLoader>
        );
    }

    return (
        <DynamicModuleLoader reducers={initalReducers}>
            <ProfileHeader />
            <div className={classNames(cls.Profile, {}, [className])}>
                <ProfileAvatar
                    readonly={readonly}
                    avatar={avatar}
                    imageFile={imageFile}
                    imageSrc={imageSrc}
                />
                <ProfileData readonly={readonly} />
            </div>
        </DynamicModuleLoader>
    );
});
