import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    ChangeEvent, memo, useCallback, useState,
} from 'react';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { TextArea } from 'shared/ui/TextArea/TextArea';
import { Icon } from 'shared/ui/Icon/Icon';
import IconDelete from '../../../../../../shared/assets/icons/icon-delete.svg';
import cls from './TextBlock.module.scss';

interface TextBlockProps {
    className?: string;
}

export const TextBlock = memo((props: TextBlockProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('create-article');

    const [title, setTitle] = useState<string>('');
    const [subtitle, setSubtitle] = useState<string>('');
    const [paragraph, setParagraph] = useState<string>('');
    const [paragraphs, setParagraphs] = useState<string[]>([]);

    const onChangeTitle = useCallback((value: string) => {
        setTitle(value);
    }, []);

    const onChangeSubtitle = useCallback((value: string) => {
        setSubtitle(value);
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

    return (
        <div className={classNames(cls.TextBlock, {}, [className])}>
            <h3>{t('text block')}</h3>
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
            <div className={cls.blockInput}>
                <p>{t('block subtitle')}</p>
                <Input
                    value={subtitle}
                    onChange={onChangeSubtitle}
                />
            </div>
            <div className={cls.blockInput}>
                <p>{t('block paragrpah')}</p>
                <TextArea
                    value={paragraph}
                    onChange={onChangeParagraph}
                    className={cls.textArea}
                />
                <Button
                    onClick={onAddParagraph}
                >
                    {t('add par')}
                </Button>
            </div>
        </div>
    );
});
