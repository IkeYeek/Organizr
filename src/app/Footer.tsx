"use client";

import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import styles from "./footer.module.scss";
let nowProxy = () => moment().format("dd. MMMM Do YYYY, h:mm a");
const Footer: React.FC = () => {
  const [now, setNow] = useState(() => nowProxy());
  useEffect(() => {
    //TODO make this more efficient somehow
    const clock = setInterval(() => setNow(nowProxy()), 1000);
    return () => clearInterval(clock);
  }, []);

  return <h3 className={styles.now}>{now}</h3>;
};

export default Footer;
