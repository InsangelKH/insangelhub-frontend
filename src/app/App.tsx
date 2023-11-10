import { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Footer } from 'widgets/Footer';
import { useTheme } from './providers/ThemeProvider/lib/useTheme';
import { AppRouter } from './providers/routes';

export function App() {
    const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-wrapper">
                    <Sidebar />
                    <AppRouter />
                </div>
                <Footer />
            </Suspense>
        </div>
    );
}
