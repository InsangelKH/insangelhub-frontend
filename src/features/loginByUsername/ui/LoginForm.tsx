import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useSelector } from 'react-redux';
import { loginActions, loginReducer } from '../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import { getLoginEmail, getLoginIsLoading, getLoginPassword } from '../model/selectors/loginSelectors';
import { loginByUsername } from '../model/services/loginByUsername';

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

    const onChangeEmail = useCallback((value: string) => {
        dispatch(loginActions.setEmail(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
        value = '';
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ email, password }));
    }, [dispatch, email, password]);

    return (
        <DynamicModuleLoader reducers={initalReducers}>
            <div className={classNames(cls.LoginForm, {}, [className])}>
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
            </div>
        </DynamicModuleLoader>
    );
});
