import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './CommentCardSkeleton.module.scss';

interface CommentCardSkeletonProps {
    className?: string;
}

export const CommentCardSkeleton = memo((props: CommentCardSkeletonProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames(cls.CommentCardSkeleton, {}, [className])}>
            <Skeleton width="100%" height={128} border="15px" />
            <Skeleton width="100%" height={128} border="15px" />
        </div>
    );
});
