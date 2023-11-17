import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    ChangeEvent, memo, useCallback, useRef,
} from 'react';
import { Button } from 'shared/ui/Button/Button';
import { profileActions } from 'entities/Profile/model/slice/profileSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import cls from './ProfileAvatar.module.scss';

interface ProfileAvatarProps {
    className?: string;
    imageFile?: File;
    avatar: string;
    imageSrc?: string;
    readonly?: boolean;
}

export const ProfileAvatar = memo((props: ProfileAvatarProps) => {
    const {
        className,
        imageFile,
        avatar,
        imageSrc,
        readonly,
    } = props;

    const { t } = useTranslation('profile');

    const inputRef = useRef<HTMLInputElement | null>(null);

    const dispatch = useAppDispatch();

    const onUploadButton = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }, []);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            dispatch(profileActions.setImageFile(file));
        }
    };

    return (
        <div className={classNames(cls.ProfileAvatar, {}, [className])}>
            {imageFile
                ? (
                    <img
                        className={classNames(cls.avatar, { [cls.avatarEdit]: !readonly }, [className])}
                        src={imageSrc}
                        alt="img"
                    />
                )
                : (
                    <img
                        className={classNames(cls.avatar, { [cls.avatarEdit]: !readonly }, [className])}
                        src={avatar}
                        alt="img"
                    />
                )}
            {!readonly
                    && (
                        <>
                            <input onChange={handleFileChange} type="file" style={{ display: 'none' }} ref={inputRef} />
                            <Button
                                className={cls.uploadBtn}
                                onClick={onUploadButton}
                            >
                                {t('change avatar')}
                            </Button>
                        </>
                    )}
        </div>
    );
});
