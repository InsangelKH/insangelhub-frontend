import { Profile } from 'features/updateProfile';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
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
            <Profile id={id} />
        </Page>
    );
});

export default ProfilePage;
