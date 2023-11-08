import App from 'app/App';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');

if (!container) {
    throw new Error(
        'Container root was not found. Could not mount react app',
    );
}

const root = createRoot(container);
root.render(<App />);
