import { serverError } from 'features/loginByUsername/rejections/rejections';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { isEmailValid, isUsernameValid } from 'shared/lib/regex/regex';
import {
    getRegisterEmail, getRegisterError, getRegisterIsLoading, getRegisterPassword, getRegisterUsername,
} from '../model/selectors/registerSelectors';
import { registerUser } from '../model/services/registerUser';
import { registerActions, registerReducer } from '../model/slice/registerSlice';
import { usernameTaken } from '../rejections/rejections';
import cls from './RegisterForm.module.scss';

interface RegisterFormProps {
    className?: string;
}

const initialReducers: ReducersList = {
    registerForm: registerReducer,
};

export const RegisterForm = memo((props: RegisterFormProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('register');

    const dispatch = useAppDispatch();

    const email = useSelector(getRegisterEmail);
    const username = useSelector(getRegisterUsername);
    const password = useSelector(getRegisterPassword);
    const isLoading = useSelector(getRegisterIsLoading);
    const error = useSelector(getRegisterError);

    const [emailEmpty, setEmailEmpty] = useState(false);
    const [usernameEmpty, setUsernameEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);

    const onChangeEmail = useCallback((value:string) => (
        dispatch(registerActions.setEmail(value))
    ), [dispatch]);

    const onChangeUsername = useCallback((value:string) => (
        dispatch(registerActions.setUsername(value))
    ), [dispatch]);

    const onChangePassword = useCallback((value:string) => (
        dispatch(registerActions.setPassword(value))
    ), [dispatch]);

    const onRegisterClick = useCallback(() => {
        if (isEmailValid(email) && password && isUsernameValid(username)) {
            dispatch(registerUser({ email, username, password }));
            setEmailEmpty(false);
            setUsernameEmpty(false);
            setPasswordEmpty(false);
        } else {
            setEmailEmpty(!isEmailValid(email));
            setUsernameEmpty(!isUsernameValid(username));
            setPasswordEmpty(password === '');
        }
    }, [dispatch, email, password, username]);

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <div className={classNames(cls.RegisterForm, {}, [className])}>
                {error === usernameTaken && <h3 className={cls.error}>{t('user taken')}</h3>}
                {error === serverError && <h3 className={cls.error}>{t('server error')}</h3>}
                <h3>{t('type email')}</h3>
                {emailEmpty && <h3 className={cls.error}>{t('email empty')}</h3>}
                <Input
                    value={email}
                    className={classNames(cls.input, { [cls.inputError]: emailEmpty }, [className])}
                    required
                    type="email"
                    onChange={onChangeEmail}
                />
                <h3>{t('type username')}</h3>
                {usernameEmpty && <h3 className={cls.error}>{t('username empty')}</h3>}
                <Input
                    value={username}
                    className={classNames(cls.input, { [cls.inputError]: usernameEmpty }, [className])}
                    required
                    type="email"
                    onChange={onChangeUsername}
                />
                <h3>{t('type password')}</h3>
                {passwordEmpty && <h3 className={cls.error}>{t('password empty')}</h3>}
                <Input
                    value={password}
                    className={classNames(cls.input, { [cls.inputError]: passwordEmpty }, [className])}
                    required
                    type="password"
                    onChange={onChangePassword}
                />
                <Button
                    className={cls.registerButton}
                    disabled={isLoading}
                    onClick={onRegisterClick}
                >
                    {t('register')}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});
