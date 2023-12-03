import { memo } from 'react';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';

interface CommentFormSkeletonProps {
    className?: string;
}

export const CommentFormSkeleton = memo((props: CommentFormSkeletonProps) => {
    const {
        className,
    } = props;

    return (
        <Skeleton width="100%" height={110} border="15px" />
    );
});
