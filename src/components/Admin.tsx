import React, { useEffect } from 'react';
import Users from './Users';
import Sidebar from './Sidebar';
import { useTranslation } from 'react-i18next';

const Admin: React.FC = () => {
  const { t } = useTranslation('global');

  useEffect(() => {
    document.title = t('admin.title');
  }, [t]);

  return (
    <div>
      <Sidebar />
      <section>
        <h1 className="mb-4">{t('admin.head')}</h1>
        <h3 className="m-4">{t('admin.users')}</h3>
        <Users />
      </section>
    </div>
  );
};

export default Admin;