import { FaInstagram, FaItchIo, FaTumblr, FaTwitter } from "react-icons/fa";

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
						<img src="/img/CoverPreview.png" className={styles.cover} alt="The front cover for the Dragon Age Annual 2024: Compendium Pactorum; the title is placed in the right front foreground in light purple-grey text and the letters have a faded neon-like vibrant purple glow. In the background, a dragon facing the right side of the image looms above a large stone, its claw curling around it. The stone contains carvings of animals representing the countries of Thedas arranged around a veilfire torch bathing the stone in teal light. From upper left circling around to bottom right the animals are: griffin for Anderfels, snake for Tevinter, crow for Antiva, Mabari for Ferelden, and lion for Orlais. The rest of the image is cast in vibrant orange, pink, and yellow from a rising or setting sun which is positioned behind the dragon, the light is reflected in the background on cumulus clouds which add texture to the image. In the foreground discarded on the ground as if left from battle there is a Templar shield and a mage staff; the mage staff is casing very light yellow lightning in the shape of the Circle of Magi symbol. In the midground, to the right of the stone, under the dragon's head, and framing the title are two red banners - one with the Qun symbol and the other with the Chantry symbol. In the upper left and lower right corner there are two art deco style adornments in a metallic sheen used to frame the picture."/>
            <strong>Theme:</strong> Countries & Factions<br />
            <strong>Charity:</strong>{" "}
            <a href="https://www.warchild.org.uk/">War Child</a>
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
            href="https://www.instagram.com/dragonageannual/"
            aria-label="Instagram"
            title="Instagram"
          >
            <FaInstagram />
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
