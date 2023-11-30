import {
    memo, useCallback, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Icon } from 'shared/ui/Icon/Icon';
import IconClose from '../../../../shared/assets/icons/icon-close.svg';
import IconEdit from '../../../../shared/assets/icons/icon-create-article.svg';
import IconDelete from '../../../../shared/assets/icons/icon-delete.svg';
import { getUpdateArticleBlocks, getUpdateArticleBlocksToCreate, getUpdateArticleEditedFlag } from '../../model/selectors/updateArticleSelectors';
import { updateArticleActions } from '../../model/slice/updateArticleSlice';
import cls from './UpdateArticleBlocks.module.scss';
import { CodeBlock } from './blocks/CodeBlock/CodeBlock';
import { ImageBlock } from './blocks/ImageBlock/ImageBlock';
import { TextBlock } from './blocks/TextBlock/TextBlock';

interface UpdateArticleBlocksProps {
    className?: string;
}

export const UpdateArticleBlocks = memo((props: UpdateArticleBlocksProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('create-article');
    const dispatch = useAppDispatch();

    const [blockValue, setBlockValue] = useState('');
    const [emptyBlockError, setEmptyBlockError] = useState<boolean>(false);
    const blocksData = useSelector(getUpdateArticleBlocks);
    const blocksToCreate = useSelector(getUpdateArticleBlocksToCreate);
    const editedFlag = useSelector(getUpdateArticleEditedFlag);

    const [blockToEdit, setBlockToEdit] = useState<JSX.Element | null>(null);
    useEffect(() => {
        if (editedFlag) {
            setBlockToEdit(null);
        }
    }, [editedFlag]);

    const onDropDownChange = useCallback((value: string) => {
        setBlockValue(value);
    }, []);

    const dropDownDefaultValue = t('Choose type');
    const dropDownOptions = [
        { key: 'TEXT', value: t('TEXT') },
        { key: 'IMAGE', value: t('IMAGE') },
        { key: 'CODE', value: t('CODE') },
    ];

    const onAddBlock = useCallback(() => {
        let newBlockId = 1;
        if (blockValue !== '' && blockValue === 'TEXT') {
            if (blocksToCreate?.length && blocksToCreate.length > 0) {
                const maxId = Math.max(...blocksToCreate.map((block) => block.id));
                newBlockId = maxId + 1;
            }
            dispatch(updateArticleActions.setBlockToCreate({ id: newBlockId, type: 'TEXT' }));
            setEmptyBlockError(false);
        } else if (blockValue !== '' && blockValue === 'IMAGE') {
            if (blocksToCreate?.length && blocksToCreate.length > 0) {
                const maxId = Math.max(...blocksToCreate.map((block) => block.id));
                newBlockId = maxId + 1;
            }
            dispatch(updateArticleActions.setBlockToCreate({ id: newBlockId, type: 'IMAGE' }));
            setEmptyBlockError(false);
        } else if (blockValue !== '' && blockValue === 'CODE') {
            if (blocksToCreate?.length && blocksToCreate.length > 0) {
                const maxId = Math.max(...blocksToCreate.map((block) => block.id));
                newBlockId = maxId + 1;
            }
            dispatch(updateArticleActions.setBlockToCreate({ id: newBlockId, type: 'CODE' }));
            setEmptyBlockError(false);
        }

        if (blockValue === '') {
            setEmptyBlockError(true);
        }
    }, [blockValue, blocksToCreate, dispatch]);

    const onEditBlock = useCallback((
        type: string,
        id: number,
        editTitle?: string,
        editParagraphs?: string[],
        editedCode?: string,
    ) => {
        if (type === 'TEXT') {
            setBlockToEdit(
                <TextBlock
                    id={id}
                    editTitle={editTitle}
                    editParagraphs={editParagraphs}
                    forEdit
                />,
            );
            dispatch(updateArticleActions.setEditedFlag(false));
        } else if (type === 'IMAGE') {
            setBlockToEdit(
                <ImageBlock
                    id={id}
                    editedTitle={editTitle}
                    forEdit
                />,
            );
            dispatch(updateArticleActions.setEditedFlag(false));
        } else if (type === 'CODE') {
            setBlockToEdit(
                <CodeBlock
                    id={id}
                    editedCode={editedCode}
                    forEdit
                />,
            );
            dispatch(updateArticleActions.setEditedFlag(false));
        }
    }, [dispatch]);

    const onCloseBlock = useCallback((blockId: number) => {
        dispatch(updateArticleActions.removeBlockToCreate(blockId));
    }, [dispatch]);

    const onCloseEditBlock = useCallback(() => {
        setBlockToEdit(null);
    }, []);

    const onRemoveBlockData = useCallback((blockId: number) => {
        dispatch(updateArticleActions.removeArticleBlock(blockId));
    }, [dispatch]);

    return (
        <div className={classNames(cls.UpdateArticleBlocks, {}, [className])}>
            <h2>{t('create block')}</h2>
            <div className={cls.blockData}>
                <p className={cls.blockDataTitle}>{t('blocks')}</p>
                {blocksData?.map((block, index) => (
                    <div
                        className={cls.blockDataWrapper}
                        key={index}
                    >
                        <div className={cls.blockDataType}>
                            <div className={cls.blockDataTypeValue}>
                                {block.blockData.type}
                            </div>
                            <Button
                                theme={ButtonTheme.CLEAR}
                                onClick={() => onEditBlock(
                                    block.blockData.type,
                                    block.id,
                                    'title' in block.blockData ? block.blockData.title : undefined,
                                    'paragraphs' in block.blockData ? block.blockData.paragraphs : undefined,
                                    'code' in block.blockData ? block.blockData.code : undefined,
                                )}
                            >
                                <Icon
                                    Svg={IconEdit}
                                    className={cls.iconDelete}
                                />
                            </Button>
                            <Button
                                theme={ButtonTheme.CLEAR}
                                onClick={() => onRemoveBlockData(block.id)}
                            >
                                <Icon
                                    Svg={IconDelete}
                                    className={cls.iconDelete}
                                />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={cls.dropDown}>
                <p className={cls.blockType}>{t('choose block type')}</p>
                <div className={cls.dropDownControll}>
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
                {emptyBlockError && (
                    <p className={cls.emptyBlockError}>
                        {t('empty block error')}
                    </p>
                )}
            </div>
            <div className={cls.blocks}>
                {blockToEdit && (
                    <>
                        <Button
                            onClick={() => onCloseEditBlock()}
                            className={cls.closeButton}
                            theme={ButtonTheme.CLEAR}
                        >
                            <Icon Svg={IconClose} className={cls.icon} />
                        </Button>
                        {blockToEdit}
                    </>
                )}
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
                        {block.type === 'CODE' && <CodeBlock id={block.id} />}
                    </div>
                ))}
            </div>
        </div>
    );
});
