import { memo, useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { getArticleError } from 'entities/Article/model/selectors/articleSelectors';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { leaveArticleComment } from '../../model/services/leaveArticleComment';
import { commentActions, commentReducer } from '../../model/slice/commentSlice';
import { getCommentListAsync } from '../../model/services/getCommentsListAsync';
import { CommentForm } from '../CommentForm/CommentForm';
import cls from './Comments.module.scss';
import { getCommentIsLoading, getCommentList, getCommentText } from '../../model/selectors/commentSelectors';
import { CommentCard } from '../CommentCard/CommentCard';
import { CommentFormSkeleton } from '../CommentSkeletons/CommentFormSkeleton';
import { CommentCardSkeleton } from '../CommentSkeletons/CommentCardSkeleton';

interface CommentsProps {
    className?: string;
    slug: string;
}

const initialReducers: ReducersList = {
    comments: commentReducer,
};

export const Comments = memo((props: CommentsProps) => {
    const {
        className,
        slug,
    } = props;

    const dispatch = useAppDispatch();

    const commentList = useSelector(getCommentList);
    const commentText = useSelector(getCommentText);
    const isLoading = useSelector(getCommentIsLoading);
    const articleError = useSelector(getArticleError);

    const onSendComment = useCallback(() => {
        if (commentText !== '' && commentText !== undefined) {
            dispatch(leaveArticleComment({ slug, text: commentText }));
            dispatch(commentActions.setCommentText(''));
        }
    }, [commentText, dispatch, slug]);

    useEffect(() => {
        dispatch(getCommentListAsync({ slug }));
    }, [dispatch, slug]);

    if (articleError === 'Request failed with status code 404') {
        return null;
    }

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <div className={classNames(cls.Comments, {}, [className])}>
                {isLoading && <CommentFormSkeleton />}
                {!isLoading && <CommentForm onSend={onSendComment} />}
                {isLoading && <CommentCardSkeleton />}
                {!isLoading && commentList?.map((comment, index) => (
                    <CommentCard
                        key={index}
                        id={comment.id}
                        authorId={comment.author.id}
                        author={comment.author.username}
                        avatar={comment.author.image}
                        comment={comment.text}
                        slug={slug}
                    />
                ))}
            </div>
        </DynamicModuleLoader>
    );
});
