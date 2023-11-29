import {
    ChangeEvent, memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { Input } from 'shared/ui/Input/Input';
import { TextArea } from 'shared/ui/TextArea/TextArea';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { BlockType } from 'entities/Article/model/types/article';
import { createArticleActions } from '../../../../model/slice/createArticleSlice';
import cls from './TextBlock.module.scss';
import IconDelete from '../../../../../../shared/assets/icons/icon-delete.svg';

interface TextBlockProps {
    className?: string;
    id: number;
}

export const TextBlock = memo((props: TextBlockProps) => {
    const {
        className,
        id,
    } = props;

    const { t } = useTranslation('create-article');

    const dispatch = useAppDispatch();

    const [title, setTitle] = useState<string>('');
    const [paragraph, setParagraph] = useState<string>('');
    const [paragraphs, setParagraphs] = useState<string[]>([]);
    const [emptyError, setEmptyError] = useState<boolean>(false);

    const onChangeTitle = useCallback((value: string) => {
        setTitle(value);
    }, []);

    const onChangeParagraph = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setParagraph(event.target.value);
    }, []);

    const onAddParagraph = useCallback(() => {
        if (paragraph !== '') {
            setParagraphs((prevParagraphs) => [...prevParagraphs, paragraph]);
            setParagraph('');
        }
    }, [paragraph]);

    const onRemoveParagraph = useCallback((paragraphToRemove: string) => {
        const indexToRemove = paragraphs.indexOf(paragraphToRemove);
        if (indexToRemove !== -1) {
            setParagraphs((prevParagraphs) => {
                const newParagraphs = [...prevParagraphs];
                newParagraphs.splice(indexToRemove, 1);
                return newParagraphs;
            });
        }
    }, [paragraphs]);

    const onSaveBlock = useCallback(() => {
        if (title !== '' && paragraphs.length > 0) {
            const textBlock: BlockType = {
                type: 'TEXT',
                title,
                paragraphs,
            };
            dispatch(createArticleActions.setArticleBlock(textBlock));
            setTitle('');
            setParagraphs((prevParagraphs) => {
                const newParagraphs = [...prevParagraphs];
                newParagraphs.splice(0, newParagraphs.length);
                return newParagraphs;
            });
            setEmptyError(false);
            dispatch(createArticleActions.removeBlockToCreate(id));
        }

        if (title === '' || paragraphs.length === 0) {
            setEmptyError(true);
        }
    }, [dispatch, id, paragraphs, title]);

    return (
        <div className={classNames(cls.TextBlock, {}, [className])}>
            <h3>{t('text block')}</h3>
            {emptyError && (
                <p className={cls.emptyError}>
                    {t('empty blocks text error')}
                </p>
            )}
            <div className={cls.parWrapper}>
                <p className={cls.parTitle}>{t('paragraphs')}</p>
                <div className={cls.paragraphs}>
                    {paragraphs.map((paragraph, index) => (
                        <div
                            className={cls.paragraph}
                            onClick={() => onRemoveParagraph(paragraph)}
                            key={index}
                        >
                            {paragraph.length <= 10 ? paragraph : `${paragraph.substring(0, 10)}...`}
                            <Icon Svg={IconDelete} className={cls.icon} />
                        </div>
                    ))}
                </div>
            </div>
            <div className={cls.blockInput}>
                <p>{t('block title')}</p>
                <Input
                    value={title}
                    onChange={onChangeTitle}
                />
            </div>
            <div className={cls.blockTextArea}>
                <p className={cls.paragraphP}>{t('block paragrpah')}</p>
                <TextArea
                    value={paragraph}
                    onChange={onChangeParagraph}
                    className={cls.textArea}
                />
                <Button
                    onClick={onAddParagraph}
                    className={cls.paragraphBtn}
                >
                    {t('add par')}
                </Button>
            </div>
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
