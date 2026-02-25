import { createBrowserRouter } from 'react-router';
import RootLayout from './components/RootLayout';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import ContactPage from './components/ContactPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: 'giris', Component: AuthPage },
      { path: 'iletisim', Component: ContactPage },
    ],
  },
]);