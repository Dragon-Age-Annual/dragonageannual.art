import { FaItchIo, FaTumblr, FaTwitter } from "react-icons/fa";

import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

export function Social(): JSX.Element {
  return (
    <section className={styles.social}>
      <div className="container">
        <div className={styles.row}>
          <h1>Coming Soon!</h1>
        </div>
				<div className={styles.row}>
          <h2>Follow us</h2>
        </div>
        <div className={clsx(styles.row, styles.icons)}>
          <a href="https://twitter.com/DragonAgeAnnual/" aria-label="Twitter Link" title="Twitter Link"><FaTwitter /></a>
          <a href="https://dragonageannual.tumblr.com/" aria-label="Tumblr Link" title="Tumblr Link"><FaTumblr /></a>
          <a href="https://da-annual.itch.io/" aria-label="Itch.io Link" title="Itch.io Link"><FaItchIo /></a>
        </div>
      </div>
    </section>
  );
}
