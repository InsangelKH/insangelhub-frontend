import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from 'shared/ui/Page/Page';
import { useParams } from 'react-router';
import { Profile } from 'features/updateProfile';
import { ProfileHeader } from 'features/updateProfile/ui/ProfileHeader/ProfileHeader';
import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo((props: ProfilePageProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();
    const { id } = useParams<{id: string}>();

    return (
        <Page className={classNames(cls.ProfilePage, {}, [className])}>
            <ProfileHeader />
            <Profile id={id} />
        </Page>
    );
});

export default ProfilePage;
