import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { getCommentText } from '../../model/selectors/commentSelectors';
import { commentActions, commentReducer } from '../../model/slice/commentSlice';
import cls from './CommentForm.module.scss';

interface CommentFormProps {
    className?: string;
    onSend: () => void;
}

export const CommentForm = memo((props: CommentFormProps) => {
    const {
        className,
        onSend,
    } = props;

    const { t } = useTranslation('articles');
    const placeHolder = t('text placeholder');
    const dispatch = useAppDispatch();
    const [emptyError, setEmptyError] = useState(false);

    const commentText = useSelector(getCommentText);

    const onChangeCommentText = useCallback((value: string) => {
        dispatch(commentActions.setCommentText(value));
        setEmptyError(false);
    }, [dispatch]);

    const onSendComment = useCallback(() => {
        if (commentText === '' || commentText === undefined) {
            setEmptyError(true);
        }

        onSend();
    }, [commentText, onSend]);

    return (
        <div className={classNames(cls.CommentForm, {}, [className])}>
            <Input
                className={classNames(cls.input, {
                    [cls.emptyError]: emptyError,
                }, [])}
                placeholder={placeHolder}
                value={commentText || ''}
                onChange={onChangeCommentText}
            />
            <Button
                className={cls.button}
                onClick={onSendComment}
            >
                {t('send')}
            </Button>
        </div>
    );
});
