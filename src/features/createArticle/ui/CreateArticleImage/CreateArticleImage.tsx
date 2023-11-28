import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    ChangeEvent, memo, useCallback, useRef,
} from 'react';
import { Button } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { useSelector } from 'react-redux';
import { getCreateArticleImageFile } from '../../model/selectors/createArticleSelectors';
import cls from './CreateArticleImage.module.scss';
import { createArticleActions } from '../../model/slice/createArticleSlice';

interface CreateArticleImageProps {
    className?: string;
}

export const CreateArticleImage = memo((props: CreateArticleImageProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('create-article');

    const inputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();
    const imageFile = useSelector(getCreateArticleImageFile);

    let imageSrc;

    if (imageFile) {
        imageSrc = URL.createObjectURL(imageFile);
    }

    const onUploadButton = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }, []);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            dispatch(createArticleActions.setImageFile(file));
            dispatch(createArticleActions.setArticleImage(file.name));
        }
    };

    const cancelImageFile = useCallback(() => {
        dispatch(createArticleActions.removeImageFile());
        dispatch(createArticleActions.removeArticleImage());
    }, [dispatch]);

    return (
        <div className={classNames(cls.CreateArticleImage, {}, [className])}>
            <div className={cls.titleCancel}>
                <h2>{t('choose image')}</h2>
                {imageFile && (
                    <Button onClick={cancelImageFile}>{t('cancel image')}</Button>
                )}
            </div>
            <div className={cls.imageField}>
                {imageFile && (
                    <img
                        className={classNames(cls.image, {}, [])}
                        src={imageSrc}
                        alt="img"
                    />
                )}
                <input onChange={handleFileChange} type="file" style={{ display: 'none' }} ref={inputRef} />
                {!imageFile && (
                    <Button
                        className={cls.uploadBtn}
                        onClick={onUploadButton}
                    >
                        {t('set image')}
                    </Button>
                )}
            </div>
        </div>
    );
});
