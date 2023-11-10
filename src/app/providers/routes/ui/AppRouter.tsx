import { Suspense, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';

const AppRouter = () => {
    return (
        <Routes>
            {Object.values(routeConfig).map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={(
                        <Suspense fallback={<PageLoader />}>
                            {route.element}
                        </Suspense>
                    )}
                />
            ))}
        </Routes>
    );
};

export default memo(AppRouter);
