import {
    memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Icon } from 'shared/ui/Icon/Icon';
import IconClose from '../../../../shared/assets/icons/icon-close.svg';
import IconDelete from '../../../../shared/assets/icons/icon-delete.svg';
import { getCreateArticleBlocks, getCreateArticleBlocksToCreate } from '../../model/selectors/createArticleSelectors';
import { createArticleActions } from '../../model/slice/createArticleSlice';
import cls from './CreateArticleBlocks.module.scss';
import { TextBlock } from './blocks/TextBlock/TextBlock';
import { ImageBlock } from './blocks/ImageBlock/ImageBlock';

interface CreateArticleBlocksProps {
    className?: string;
}

export const CreateArticleBlocks = memo((props: CreateArticleBlocksProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('create-article');
    const dispatch = useAppDispatch();

    const [blockValue, setBlockValue] = useState('');
    const blocksData = useSelector(getCreateArticleBlocks);
    const blocksToCreate = useSelector(getCreateArticleBlocksToCreate);

    const onDropDownChange = useCallback((value: string) => {
        setBlockValue(value);
    }, []);

    const onAddBlock = useCallback(() => {
        let newBlockId = 1;
        if (blockValue !== '' && blockValue === 'TEXT') {
            if (blocksToCreate?.length && blocksToCreate.length > 0) {
                const maxId = Math.max(...blocksToCreate.map((block) => block.id));
                newBlockId = maxId + 1;
            }
            dispatch(createArticleActions.setBlockToCreate({ id: newBlockId, type: 'TEXT' }));
        } else if (blockValue !== '' && blockValue === 'IMAGE') {
            if (blocksToCreate?.length && blocksToCreate.length > 0) {
                const maxId = Math.max(...blocksToCreate.map((block) => block.id));
                newBlockId = maxId + 1;
            }
            dispatch(createArticleActions.setBlockToCreate({ id: newBlockId, type: 'IMAGE' }));
        }
    }, [blockValue, blocksToCreate, dispatch]);

    const onCloseBlock = useCallback((blockId: number) => {
        dispatch(createArticleActions.removeBlockToCreate(blockId));
    }, [dispatch]);

    const onRemoveBlockData = useCallback((blockId: number) => {
        dispatch(createArticleActions.removeArticleBlock(blockId));
    }, [dispatch]);

    const dropDownDefaultValue = t('Choose type');
    const dropDownOptions = [
        { key: 'TEXT', value: t('TEXT') },
        { key: 'IMAGE', value: t('IMAGE') },
        { key: 'CODE', value: t('CODE') },
    ];

    return (
        <div className={classNames(cls.CreateArticleBlocks, {}, [className])}>
            <h2>{t('create block')}</h2>
            <div className={cls.blockData}>
                <p className={cls.blockDataTitle}>{t('blocks')}</p>
                {blocksData?.map((block, index) => (
                    <div
                        className={cls.blockDataWrapper}
                        key={index}
                        onClick={() => onRemoveBlockData(block.id)}
                    >
                        <div className={cls.blockDataType}>
                            {block.blockData.type}
                            <Icon Svg={IconDelete} className={cls.iconDelete} />
                        </div>
                    </div>
                ))}
            </div>
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
                {blocksToCreate?.map((block) => (
                    <div key={block.id} className={cls.blockContainer}>
                        <Button
                            onClick={() => onCloseBlock(block.id)}
                            className={cls.closeButton}
                            theme={ButtonTheme.CLEAR}
                        >
                            <Icon Svg={IconClose} className={cls.icon} />
                        </Button>
                        {block.type === 'TEXT' && <TextBlock id={block.id} />}
                        {block.type === 'IMAGE' && <ImageBlock id={block.id} />}
                    </div>
                ))}
            </div>
        </div>
    );
});
