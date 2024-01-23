"use client";

import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import styles from "./styles/footer.module.scss";
let nowProxy = () => moment().format("dd. MMMM Do YYYY, h:mm a");
const Footer: React.FC = () => {
  const [now, setNow] = useState(() => nowProxy());

  useEffect(() => {
    const currentDate = moment();
    const secondsBeforeNextMinute = 60 - currentDate.seconds();
    setTimeout(() => {
      setNow(nowProxy());
      const interval = setInterval(() => setNow(nowProxy()), 60000);
    }, secondsBeforeNextMinute * 1000);
  });

  return <h3 className={styles.now}>{now}</h3>;
};

export default Footer;
