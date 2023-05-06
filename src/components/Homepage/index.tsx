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
            Dragon Age Annual is an unofficial, not-for-profit project: a labour
            of love not associated with BioWare or EA. We're just a group of
            fans who want to give back to our community!
          </p>
          <p>
            The Annual is a celebration of all things Thedas created by a
            talented team of fans: artists, writers, and more. Each year, these
            fan creators work together to produce a full-colour calendar with 12
            months, 5 bonus works, cover plus extras, all for the benefit of a
            chosen charity.
          </p>
          <p>
            DAA first began production in 2021 for a 2022 calendar (confusing we
            know) and we are now in our 2024 calendar production period. If you
            did not opt-in to our newsletter during our 2024 Interest Check, you
            can sign-up below. Our newsletters will be sent to let you know when
            applications and pre-orders open. We may also send occasional
            production updates!
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

export function Current(): JSX.Element {
  return (
    <section className={styles.social}>
      <div className={clsx(styles.current, "container")}>
        <h2>Introducing DA Annual 2024</h2>
        <h4>
          <strong>Title:</strong> Compendium Pactorum
        </h4>
        <h4>
          <strong>Theme:</strong> Countries & Factions
        </h4>
        <h4>
          <strong>Charity:</strong>{" "}
          <a href="https://www.warchild.org.uk/">War Child</a>
        </h4>
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
            aria-label="Twitter"
            title="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://dragonageannual.tumblr.com/"
            aria-label="Tumblr"
            title="Tumblr"
          >
            <FaTumblr />
          </a>
          <a
            href="https://da-annual.itch.io/"
            aria-label="Itch.io"
            title="Itch.io"
          >
            <FaItchIo />
          </a>
        </div>
      </div>
    </section>
  );
}
