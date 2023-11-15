import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { useSelector } from 'react-redux';
import cls from './Profile.module.scss';
import { profileReducer } from '../model/slice/profileSlice';
import { fetchProfileData } from '../model/services/fetchProfileData';
import { getProfileData } from '../model/selectors/profileSelectors';

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

    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const profile = useSelector(getProfileData);

    useEffect(() => {
        if (id) {
            dispatch(fetchProfileData({ id }));
        }
    }, [dispatch, id]);

    return (
        <DynamicModuleLoader reducers={initalReducers}>
            <div className={classNames(cls.Profile, {}, [className])}>
                <img src={profile?.image} alt="img" />
            </div>
        </DynamicModuleLoader>
    );
});
