import React from 'react';
import Sidebar from './Sidebar';
import useUserData from '../hooks/useUserData';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const user = useUserData();
  const { t } = useTranslation('global');

  const name = user?.name?.split(/\s+/)[0];

  return (
    <div>
      <Sidebar />
      <section>
        <h1>
          {t('home.head')} {name}!
        </h1>
        <p>{t('home.body')}!</p>
      </section>
    </div>
  );
};

export default Home;