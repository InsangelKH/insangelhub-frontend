import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    ChangeEvent, memo, useCallback, useState,
} from 'react';
import { TextArea } from 'shared/ui/TextArea/TextArea';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { BlockType } from 'entities/Article/model/types/article';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { createArticleActions } from '../../../../model/slice/createArticleSlice';
import cls from './CodeBlock.module.scss';

interface CodeBlockProps {
    className?: string;
    id: number;
}

export const CodeBlock = memo((props: CodeBlockProps) => {
    const {
        className,
        id,
    } = props;

    const { t } = useTranslation('create-article');

    const [code, setCode] = useState<string>('');
    const [emptyError, setEmptyError] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const onChangeCode = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setCode(event.target.value);
    }, []);

    const onSaveBlock = useCallback(() => {
        if (code !== '') {
            const codeBlock: BlockType = {
                type: 'CODE',
                code,
            };
            dispatch(createArticleActions.setArticleBlock(codeBlock));
            setCode('');
            setEmptyError(false);
            dispatch(createArticleActions.removeBlockToCreate(id));
        }

        if (code === '') {
            setEmptyError(true);
        }
    }, [code, dispatch, id]);

    return (
        <div className={classNames(cls.CodeBlock, {}, [className])}>
            <h3>{t('code block')}</h3>
            {emptyError && (
                <p className={cls.emptyError}>
                    {t('empty code block error')}
                </p>
            )}
            <TextArea
                value={code || ''}
                onChange={onChangeCode}
                className={cls.codeArea}
                rows={40}
                cols={100}
            />
            <Button
                theme={ButtonTheme.BACKGROUND_INVERTED}
                className={cls.saveBtn}
                onClick={onSaveBlock}
            >
                {t('save block')}
            </Button>
        </div>
    );
});
