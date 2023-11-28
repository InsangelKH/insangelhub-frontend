import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    ChangeEvent, memo, useCallback, useRef, useState,
} from 'react';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { ImageBlock as ImageBlockType } from 'entities/Article/model/types/article';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { createArticleActions } from '../../../../model/slice/createArticleSlice';
import IconDelete from '../../../../../../shared/assets/icons/icon-delete.svg';
import cls from './ImageBlock.module.scss';

interface ImageBlockProps {
    className?: string;
    id: number;
}

export const ImageBlock = memo((props: ImageBlockProps) => {
    const {
        className,
        id,
    } = props;

    const inputRef = useRef<HTMLInputElement | null>(null);
    const { t } = useTranslation('create-article');
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    const onChangeTitle = useCallback((value: string) => {
        setTitle(value);
    }, []);

    const onUploadButton = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }, []);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    const onRemovePicture = useCallback(() => {
        setImageFile(null);
    }, []);

    const onSaveBlock = useCallback(() => {
        if (title !== '' && imageFile !== null) {
            const imageBlock: ImageBlockType = {
                type: 'IMAGE',
                src: imageFile.name,
                title,
            };
            dispatch(createArticleActions.setArticleBlock(imageBlock));
            setTitle('');
            setImageFile(null);
            dispatch(createArticleActions.removeBlockToCreate(id));
            dispatch(createArticleActions.setFilesArray(imageFile));
        }
    }, [dispatch, id, imageFile, title]);

    return (
        <div className={classNames(cls.ImageBlock, {}, [className])}>
            <h3>{t('image block')}</h3>
            <div className={cls.blockInput}>
                <p>{t('block title')}</p>
                <Input
                    value={title}
                    onChange={onChangeTitle}
                />
            </div>
            <div className={cls.imageField}>
                <input onChange={handleFileChange} type="file" style={{ display: 'none' }} ref={inputRef} />
                <p>{t('image')}</p>
                {imageFile === null && (
                    <Button
                        className={cls.uploadBtn}
                        onClick={onUploadButton}
                    >
                        {t('set image block')}
                    </Button>
                )}
                {imageFile !== null && (
                    <div
                        className={cls.imageToSend}
                        onClick={onRemovePicture}
                    >
                        <p>{imageFile?.name}</p>
                        <Icon Svg={IconDelete} className={cls.icon} />
                    </div>
                )}
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
