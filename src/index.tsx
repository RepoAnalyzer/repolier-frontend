import React from 'react';
import { createRoot } from 'react-dom/client';

import './i18n';

import { App } from './App';

import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
