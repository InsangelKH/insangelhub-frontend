import { App } from 'app/App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'app/styles/index.scss';
import 'shared/config/i18n/i18n';
import ThemeProvider from 'app/providers/ThemeProvider/ui/ThemeProvider';

const container = document.getElementById('root');

if (!container) {
    throw new Error(
        'Container root was not found. Could not mount react app',
    );
}

const root = createRoot(container);
root.render(
    <BrowserRouter>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </BrowserRouter>,
);
