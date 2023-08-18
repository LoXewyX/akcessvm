import React, { useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebar";
import { useTranslation } from "react-i18next";
import { Form, Modal, Button } from "react-bootstrap";

interface MyVerticallyCenteredModalProps {
  show: boolean;
  onHide: () => void;
  countdown: number;
  agree: string;
  delacc: string;
  warndelacc: string;
}

function MyVerticallyCenteredModal(props: MyVerticallyCenteredModalProps) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby={`contained-modal-title-vcenter`}
      centered
    >
    </Modal>
  );
}

const Settings = () => {
  // i18n
  const [t, i18n] = useTranslation("global");

  const [lang, setLang] = useState<string | null>(localStorage?.getItem("lang"));
  const chlang = (opt: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = opt.target.value;
    setLang(selectedLang);
    localStorage?.setItem("lang", selectedLang);
    i18n.changeLanguage(selectedLang);
  };

  // Delete account
  const [warn, setWarn] = useState(false);

  // HTML
  useEffect(() => {
    document.title = t("settings.title");
  });

  // Countdown
  const [countdown, setCountdown] = useState(5);
  const ref = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    ref.current = setInterval(() => {
      setCountdown((time) => {
        if (time > 0) return time - 1;
        return time;
      });
    }, 1000);

    return () => {
      if (ref.current) {
        clearInterval(ref.current);
      }
    };
  }, [setCountdown]);

  return (
    <div>
      <Sidebar />
      <section>
        <h1 className="mb-4">{t("settings.head")}</h1>
        <h3 className="mb-4">{t("settings.data")}</h3>
        <input className="form-control form-control-lg" />
        <p>{t("settings.username")}</p>
        <Form.Select
          aria-label="Language"
          onChange={chlang}
          value={lang as string}
          className="form-control-lg"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="ca">Català</option>
        </Form.Select>
        <p>{t("settings.language")}</p>
        <Button variant="danger" onClick={() => setWarn(true)}>
          {t("settings.delacc")}
        </Button>
        <MyVerticallyCenteredModal
          show={warn}
          onHide={() => {
            setWarn(false);
            setCountdown(5);
          }}
          countdown={countdown}
          agree={t("conditions.agree")}
          delacc={t("settings.delacc")}
          warndelacc={t("settings.warndelacc")}
        />
      </section>
    </div>
  );
};

export default Settings;
