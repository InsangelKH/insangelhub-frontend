import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './ProfileSkeleton.module.scss';

interface ProfileSkeletonProps {
    className?: string;
}

export const ProfileSkeleton = memo((props: ProfileSkeletonProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames(cls.ProfileSkeleton, {}, [className])}>
            <Skeleton className={cls.avatar} width="100%" height={45} border="10px" />
            <Skeleton className={cls.editBtn} width="40%" height={45} border="10px" />
            <div className={cls.skeletonData}>
                <Skeleton className={cls.deskAvatar} width={250} height={350} border="20px" />
                <Skeleton className={cls.mobileAvatar} width={200} height={200} border="50%" />
                <Skeleton className={cls.data} height={350} border="10px" />
            </div>
        </div>
    );
});
