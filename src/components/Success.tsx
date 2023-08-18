import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Success: React.FC = () => {
  const { t } = useTranslation('global');

  const [countdown, setCountdown] = useState(5);
  const ref = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    ref.current = window.setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => {
      if (ref.current !== null) {
        clearInterval(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate('/login');
    }
  }, [countdown, navigate]);

  return (
    <section>
      <h1>{t('success.head')}</h1>
      <p>
        {t('success.closingIn')}: {countdown}
      </p>
      <Link to="/login">{t('success.link')}</Link>
    </section>
  );
};

export default Success;