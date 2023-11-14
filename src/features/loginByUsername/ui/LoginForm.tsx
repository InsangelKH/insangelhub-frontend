import {
    memo, useCallback, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useSelector } from 'react-redux';
import { register } from 'module';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { loginActions, loginReducer } from '../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import {
    getLoginEmail, getLoginError, getLoginIsLoading, getLoginPassword,
} from '../model/selectors/loginSelectors';
import { loginByUsername } from '../model/services/loginByUsername';
import { emptyData, invalidData, serverError } from '../rejections/rejections';

interface LoginFormProps {
    className?: string;
}

const initalReducers: ReducersList = {
    loginForm: loginReducer,
};

export const LoginForm = memo((props: LoginFormProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('login');

    const dispatch = useAppDispatch();

    const isLoading = useSelector(getLoginIsLoading);
    const email = useSelector(getLoginEmail);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);

    const [typeMessage, setTypeMessage] = useState(false);

    const onChangeEmail = useCallback((value: string) => {
        dispatch(loginActions.setEmail(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        if (email && password !== '') {
            dispatch(loginByUsername({ email, password }));
            setTypeMessage(false);
        } else {
            setTypeMessage(true);
        }
    }, [dispatch, email, password]);

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            onLoginClick();
        }
    }, [onLoginClick]);

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown]);

    return (
        <DynamicModuleLoader reducers={initalReducers}>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                {error === emptyData && <h3 className={cls.error}>{t('empty data')}</h3>}
                {error === invalidData && <h3 className={cls.error}>{t('invalid data')}</h3>}
                {error === serverError && <h3 className={cls.error}>{t('server error')}</h3>}
                {typeMessage && <h3 className={cls.error}>{t('type data')}</h3>}
                <h3>{t('type login')}</h3>
                <Input
                    value={email}
                    className={cls.input}
                    required
                    type="email"
                    onChange={onChangeEmail}
                />
                <h3>{t('type password')}</h3>
                <Input
                    value={password}
                    className={cls.input}
                    required
                    type="password"
                    onChange={onChangePassword}
                />
                <Button
                    className={cls.loginButton}
                    disabled={isLoading}
                    onClick={onLoginClick}
                >
                    {t('login')}
                </Button>
                <div className={cls.registerWrapper}>
                    <p>{t('No account')}</p>
                    <AppLink to={RoutePath.register}>{t('Create account')}</AppLink>
                </div>
            </div>
        </DynamicModuleLoader>
    );
});
