import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import './style/custom.css';

import { RouterProvider } from 'react-router-dom';
import { MainRouter } from './routes/MainRouter';

const router = MainRouter();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
