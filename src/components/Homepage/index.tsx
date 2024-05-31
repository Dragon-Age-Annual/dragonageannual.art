import {
  FaBluesky,
  FaInstagram,
  FaItchIo,
  FaTumblr,
  FaTwitter,
} from "react-icons/fa6";

import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

export function Intro(): JSX.Element {
  return (
    <section className={styles.social}>
      <div className="container">
        <div className={styles.paragraphs}>
          <h2>Who We Are</h2>
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
            know) and we are now in our 2025 calendar production period. If you
            did not opt-in to our newsletter during our 2025 Interest Check, you
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
      <div className="container">
        <div className={styles.paragraphs}>
          <h2>2025 Production is underway!</h2>
          <p>
            The mods are pleased to announce this years' theme and charity have
            been decided with help from everyone who completed the interest
            check! Thank you for your continued support of DAA.
          </p>
          <div className={clsx(styles.current)}>
            <p>
              <strong>Theme:</strong> Thedas' Myths & Legends
              <br />
              <strong>Charity:</strong>{" "}
              <a href="https://www.warchild.org.uk/">War Child UK</a>
            </p>
          </div>
          <h3>We are currently accepting applications.</h3>
          Calling all artists, writers, and betas, we are looking for this
          year's talented team of contributors to help us produce DAA 2025.{" "}
          <strong>Applications close on June 14, 2024.</strong> For more info
          read our <a href="/application">Before You Apply</a>, and then head
          over to the applications:
          <ul style={{ listStyleType: "none" }} className={clsx(styles.current)}>
            <li>
              🎨 <a href="https://forms.gle/3CgRrGLbD3xfkddR8">Artists</a>
            </li>
            <li>
              🖋️ <a href="https://forms.gle/98HnjtUDaoMYvJYU6">Writers</a>
            </li>
            <li>
              🔍 <a href="https://forms.gle/NyuAUSJ1o1XvJakT6">Betas</a>
            </li>
          </ul>
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
            href="https://bsky.app/profile/dragonageannual.bsky.social"
            aria-label="Bluesky"
            title="Bluesky">
            <FaBluesky />
          </a>
          <a
            href="https://dragonageannual.tumblr.com/"
            aria-label="Tumblr"
            title="Tumblr">
            <FaTumblr />
          </a>
          <a
            href="https://www.instagram.com/dragonageannual/"
            aria-label="Instagram"
            title="Instagram">
            <FaInstagram />
          </a>
          <a
            href="https://da-annual.itch.io/"
            aria-label="Itch.io"
            title="Itch.io">
            <FaItchIo />
          </a>
          <a
            href="https://twitter.com/DragonAgeAnnual/"
            aria-label="Twitter"
            title="Twitter">
            <FaTwitter />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Preorder(): JSX.Element {
  return (
    <section>
      <div className="container">
        <div className={styles.paragraphs}>
          <h2>Pre-Order Info</h2>
          <p>
            Pre-orders for the 2024 Dragon Age Annual: Compendium Pactorum are
            open in our itch.io now!
          </p>
          <p>
            Our talented team of Artists and Writers have been working hard to
            produce our 2024 Calendar which features 40 full-color pages filled
            with exceptional illustrations and short stories and a highly usable
            Monday start grid-format monthly calendar.{" "}
          </p>
          <p>
            Our pre-order options include an affordable digital PDF, physical
            calendar, and a merch pack! Learn more about your options by visting{" "}
            <a href="https://da-annual.itch.io/dragon-age-annual-2024">
              our pre-order page
            </a>
            .
          </p>
          <p>
            Before you purchase, please be sure to read our{" "}
            <a href="/terms">Terms and Conditions</a>. If you have questions
            about ordering through itch.io, our{" "}
            <a href="/itchio">Itch.io FAQs</a> may be helpful.
          </p>
          <h2>Signed Edition</h2>
          <p>
            In connection with our chosen charity, War Child UK,{" "}
            <strong>Indira Varma</strong>, voice actor for{" "}
            <strong>Vivienne de Fer</strong> from Dragon Age: Inquisition has
            agreed to sign <strong>5 copies</strong> of the 2024 Dragon Age
            Annual!
          </p>
          <p>
            These limited copies were available through special auctions on{" "}
            <a href="https://tiltify.com/@da-annual/auctions/da-annual-signed-editions">
              tiltify
            </a>
            . Auctions for the signed copy plus Merch pack took place from
            October 14-October 21, 2023! If you missed out on the auctions, it's
            not too late to grab an unsigned copy!
          </p>
          <h2>Donations</h2>
          Just want to donate to the cause without receiving a copy of the
          calendar? We welcome donations and have two options. You can donate to
          us through Paypal below and we will include your funds with our
          donation to War Child UK after calendar sales are settled. You may
          also donate directly to War Child UK by visiting our{" "}
          <a href="https://tiltify.com/@da-annual/dragon-age-annual-2024">
            tiltify
          </a>
          .
          <p className={styles.current}>
            <em>Donate with Paypal</em>
            <br />
            <a
              href="https://www.paypal.com/donate/?hosted_button_id=GAG3M89ZSZC8C"
              target="_blank">
              <img
                alt="paypal donate button"
                src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
              />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export function Thanks(): JSX.Element {
  return (
    <section>
      <div className="container">
        <div className={styles.paragraphs}>
          <h2>Thank You!</h2>
          <p>
            Thank you for helping us to raise $4657.90 for{" "}
            <a href="https://www.warchild.org.uk/">WarChild UK</a> with our 2024
            annual! This would not be possible without all of your support!
          </p>
        </div>
      </div>
    </section>
  );
}
