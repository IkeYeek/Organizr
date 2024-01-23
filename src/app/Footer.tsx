"use client";

import moment from "moment/moment";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./footer.module.scss";
import { clearInterval } from "timers";
let nowProxy = () => moment().format("dd. MMMM Do YYYY, h:mm a");
const Footer: React.FC = () => {
  const [now, setNow] = useState(() => nowProxy());
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>(
    undefined,
  );

  useEffect(() => {
    const currentDate = moment();
    const secondsBeforeNextMinute = 60 - currentDate.seconds();
    console.log(secondsBeforeNextMinute);
    setTimeout(() => {
      setNow(nowProxy());
      const interval = setInterval(() => setNow(nowProxy()), 60000);
    }, secondsBeforeNextMinute * 1000);
  }, [intervalId]);

  return <h3 className={styles.now}>{now}</h3>;
};

export default Footer;
