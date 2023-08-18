import React, { useEffect } from 'react';
import MainNavbar from './MainNavbar';
import { useTranslation } from 'react-i18next';

const Welcome: React.FC = () => {
  const { t } = useTranslation('global');

  useEffect(() => {
    document.title = t('main.title');
  }, [t]);

  return (
    <div>
      <MainNavbar />
      <div className="appear">
        <div className="bgmain"></div>
        <div className="bgmain bga1"></div>
        <div className="bgmain bga2"></div>
        <div className="content">
          <h1 className="mb-4">{t('main.head')}</h1>
          <p>{t('main.body')}</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;