import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import { useTranslation } from 'react-i18next';

const Schedule: React.FC = () => {
  const { t } = useTranslation('global');

  useEffect(() => {
    document.title = t('schedule.title');
  }, [t]);

  return (
    <div>
      <Sidebar />
      <section>
        <h1>{t('schedule.head')}</h1>
        <br />
        <p>{t('schedule.body')}</p>
      </section>
    </div>
  );
};

export default Schedule;