import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    memo, useCallback, useRef, useState,
} from 'react';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Button } from 'shared/ui/Button/Button';
import cls from './CreateArticleBlocks.module.scss';
import { TextBlock } from './blocks/TextBlock/TextBlock';

interface CreateArticleBlocksProps {
    className?: string;
}

export const CreateArticleBlocks = memo((props: CreateArticleBlocksProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('create-article');

    const [blockValue, setBlockValue] = useState('');
    const [blocks, setBlocks] = useState<JSX.Element[]>([]);

    const onDropDownChange = useCallback((value: string) => {
        setBlockValue(value);
    }, []);

    const onAddBlock = useCallback(() => {
        if (blockValue !== '' && blockValue === 'TEXT') {
            setBlocks((prevBlocks) => [
                ...prevBlocks,
                <TextBlock />,
            ]);
        }
    }, [blockValue]);

    const dropDownDefaultValue = t('Choose type');
    const dropDownOptions = [
        { key: 'TEXT', value: t('TEXT') },
        { key: 'IMAGE', value: t('IMAGE') },
        { key: 'CODE', value: t('CODE') },
    ];

    return (
        <div className={classNames(cls.CreateArticleBlocks, {}, [className])}>
            <h2>{t('create block')}</h2>
            <div className={cls.dropDown}>
                <p>{t('choose block type')}</p>
                <Dropdown
                    defaultValue={dropDownDefaultValue}
                    options={dropDownOptions}
                    onChange={onDropDownChange}
                />
                <Button
                    onClick={onAddBlock}
                >
                    {t('Create')}
                </Button>
            </div>
            <div className={cls.blocks}>
                {blocks.map((block, index) => (
                    <div key={index}>{block}</div>
                ))}
            </div>
        </div>
    );
});
