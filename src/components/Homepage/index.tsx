import { FaItchIo, FaTumblr, FaTwitter } from "react-icons/fa";

import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

export function Intro(): JSX.Element {
  return (
    <section className={styles.social}>
      <div className="container">
        <div className={clsx("row", styles.paragraphs)}>
          <p>
            Dragon Age Annual is a not-for-profit project which produces a
            calendar featuring work from 18 fan artists and 9 fan writers with
            the support of a production team (beta, graphic designers, etc) in
            the Dragon Age fandom. Each year, these fan creators work together
            to produce a full-colour calendar with 12 months, 5 bonus works,
            cover and more, all for the benefit of a chosen charity.
          </p>
          <p>
            DAA is a labour of love and is in no way associated with Bioware or
            EA. We're just a group of fans who want to give back to our
            community!
          </p>
          <p>
            DAA first began production in 2021 for a 2022 calendar (confusing we
            know) and are now in process of ramping up for our 2024 calendar
            production period. If you did not opt-in to our newsletter during
            our 2024 Interest Check, you can sign-up below. Our newsletters will
            be sent to let you know when applications and pre-orders open. We
            may also send occasional production updates!
          </p>
          <p>
            For even more updates, we encourage you to follow us on tumblr or
            twitter.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Social(): JSX.Element {
  return (
    <section className={styles.social}>
      <div className="container">
        <div className={clsx(styles.row, "margin-bottom--md")}>
          <h2>Follow us</h2>
        </div>
        <div className={clsx(styles.row, styles.icons)}>
          <a
            href="https://twitter.com/DragonAgeAnnual/"
            aria-label="Twitter Link"
            title="Twitter Link"
          >
            <FaTwitter />
          </a>
          <a
            href="https://dragonageannual.tumblr.com/"
            aria-label="Tumblr Link"
            title="Tumblr Link"
          >
            <FaTumblr />
          </a>
          <a
            href="https://da-annual.itch.io/"
            aria-label="Itch.io Link"
            title="Itch.io Link"
          >
            <FaItchIo />
          </a>
        </div>
      </div>
    </section>
  );
}

// export function Newsletter(): JSX.Element{
// 	return (

// 	);
// }