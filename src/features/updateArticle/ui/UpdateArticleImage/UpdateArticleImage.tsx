import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    ChangeEvent, memo, useCallback, useRef,
} from 'react';
import { Button } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { useSelector } from 'react-redux';
import { SERVER_URL } from 'shared/api/api';
import cls from './UpdateArticleImage.module.scss';
import { getUpdateArticleImage, getUpdateArticleImageFile } from '../../model/selectors/updateArticleSelectors';
import { updateArticleActions } from '../../model/slice/updateArticleSlice';

interface UpdateArticleImageProps {
    className?: string;
}

export const UpdateArticleImage = memo((props: UpdateArticleImageProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('create-article');

    const inputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();
    const imageFile = useSelector(getUpdateArticleImageFile);
    const image = useSelector(getUpdateArticleImage);
    const serverImageSrc = `${SERVER_URL}/images/${image}`;

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
            dispatch(updateArticleActions.setImageFile(file));
            dispatch(updateArticleActions.setArticleImage(file.name));
        }
    };

    const cancelImageFile = useCallback(() => {
        dispatch(updateArticleActions.removeImageFile());
        dispatch(updateArticleActions.removeArticleImage());
    }, [dispatch]);

    return (
        <div className={classNames(cls.UpdateArticleImage, {}, [className])}>
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
                {!imageFile && (
                    <img
                        className={classNames(cls.image, {}, [])}
                        src={serverImageSrc}
                        alt="default"
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
