import { Suspense, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Footer } from 'widgets/Footer';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { getUserInited, userActions } from 'entities/User';
import { useSelector } from 'react-redux';
import { useTheme } from './providers/ThemeProvider/lib/useTheme';
import { AppRouter } from './providers/routes';

export function App() {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-wrapper">
                    <Sidebar />
                    {inited && <AppRouter />}
                </div>
                <Footer />
            </Suspense>
        </div>
    );
}
