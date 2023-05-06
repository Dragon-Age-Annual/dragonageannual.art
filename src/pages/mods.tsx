import { FaLink, FaMastodon, FaRedditAlien, FaTwitter } from "react-icons/fa";

import { BsInstagram } from "react-icons/bs";
import { ImTumblr } from "react-icons/im";
import Layout from "@theme/Layout";
import React from "react";
import clsx from "clsx";
import styles from "./index.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Mods(): JSX.Element {
  const {} = useDocusaurusContext();
  return (
    <Layout description="Meet the Mods of the Dragon Age Annual.">
      <main className="container container--fluid margin-vert--lg">
        <div className="row">
          <div className="col col--10">
            <article>
              <h1>Meet the Mods</h1>
              <p>One Day in 2021 some friends were having a conversation:</p>
              <p>
                <em>
                  "Imagine if there was a pin-up calendar of Thedas' hottest
                  villains!"
                  <br />
                  "Ha ha, yeah who would be crazy enough to do that right…?"
                </em>
              </p>
              <p>
                And thus the Dragon Age Annual was born. While we never quite
                got to the villain pin-up calendar 3 years on, we are proud of
                what the Annual has and continues to achieve.
              </p>
              <p>
                As you can see, our mod team is small for such a large project,
                so it can be challenging for us to identify everything we do
                with easy titles. It's best to assume we all do a little of
                everything to make sure we get the Annual out to each of you in
                the highest quality we can!
              </p>
              <div className="avatar margin-top--xl">
                <img
                  className="avatar__photo avatar__photo--xl"
                  src="/img/mods/kemvee.png"
                />
                <div className="avatar__intro">
                  <div className="avatar__name">Kemvee</div>
                  <small className="avatar__subtitle">
                    <em>
                      Project Manager, Shipping & Production, Social Media
                    </em>
                  </small>
                  <div className={clsx("avatar__subtitle", styles.social)}>
                    <a
                      target="_blank"
                      href="https://www.reddit.com/user/Kemvee"
                      aria-label="Reddit"
                      title="Reddit"
                    >
                      <FaRedditAlien />
                    </a>
                    <a
                      target="_blank"
                      href="https://kemvee.tumblr.com/"
                      aria-label="Tumblr"
                      title="Tumblr"
                    >
                      <ImTumblr />
                    </a>
                    <a
                      target="_blank"
                      href="https://twitter.com/kemvee_art"
                      aria-label="Twitter"
                      title="Twitter"
                    >
                      <FaTwitter />
                    </a>
                  </div>
                </div>
              </div>
              <div className="avatar__subtitle margin-bottom--xl">
                <p>
                  I joined the DA fandom in earnest in 2018 when, in a fit of
                  unbridled obsession, I read just about every single
                  Cullen/Trevelyan fic on AO3. Since then I've dabbled in
                  writing myself, doodled occasionally and thoroughly immersed
                  myself in Thedas.
                </p>
                <p>
                  I'm a bit of a serial fundraiser within fandom and have modded
                  multiple Dragon Age and Hades Zines. However, I thoroughly
                  look forward to the Annual taking over my kitchen table every
                  year!
                </p>
              </div>
              <div className="avatar">
                <img
                  className="avatar__photo avatar__photo--xl"
                  src="/img/mods/fox.png"
                />
                <div className="avatar__intro">
                  <div className="avatar__name">FoxInBoots</div>
                  <small className="avatar__subtitle">
                    <em>Artist, Graphics, Fox</em>
                  </small>
                  <div className={clsx("avatar__subtitle", styles.social)}>
                    <a
                      target="_blank"
                      href="https://thefoxinboots.tumblr.com"
                      aria-label="Tumblr"
                      title="Tumblr"
                    >
                      <ImTumblr />
                    </a>
                    <a target="_blank" href="https://twitter.com/thefoxinboots">
                      <FaTwitter />
                    </a>
                    <a
                      target="_blank"
                      href="https://www.instagram.com/foxinboots/"
                      aria-label="Instagram"
                      title="Instagram"
                    >
                      <BsInstagram />
                    </a>
                  </div>
                </div>
              </div>
              <div className="avatar__subtitle margin-bottom--xl">
                <p>
                  I have loved Dragon Age since Origins was released when I
                  played my first Surana, but I didn't become an active
                  participant in fandom until 2019 while desperate for more
                  Solavellan content. From that point on, DA has been my one
                  true obsession.
                </p>
                <p>
                  I'm mainly an artist who also runs a couple of Dragon Age
                  exchanges and servers. The Annual is probably the largest
                  project I've taken a leading part in, and I'm thrilled that we
                  can continue its production. It's always a joy to witness the
                  amazing creations our contributors put together each year.
                </p>
              </div>
              <div className="avatar">
                <img
                  className="avatar__photo avatar__photo--xl"
                  src="/img/mods/enigmalea.png"
                />
                <div className="avatar__intro">
                  <div className="avatar__name">Enigmalea</div>
                  <small className="avatar__subtitle">
                    <em>Writer, Graphics, Shipping</em>
                  </small>
                  <div className={clsx("avatar__subtitle", styles.social)}>
                    <a
                      target="_blank"
                      href="https://www.enigmalea.quest/"
                      aria-label="enigmalea.quest website"
                      title="enigmalea.quest website"
                    >
                      <FaLink />
                    </a>
                    <a
                      target="_blank"
                      href="https://enigmalea.tumblr.com/"
                      aria-label="Tumblr"
                      title="Tumblr"
                    >
                      <ImTumblr />
                    </a>
                    <a
                      target="_blank"
                      href="https://indiepocalypse.social/@enigmalea/"
                      aria-label="Mastodon"
                      title="Mastodon"
                    >
                      <FaMastodon />
                    </a>
                  </div>
                </div>
              </div>
              <div className="avatar__subtitle margin-bottom--xl">
                <p>
                  I'm a fandom old who's been involved in internet fandom in
                  some shape or form since right around the time the internet
                  became available for home use in the ancient days. I took a
                  long break from fandom, but when I finally came back in
                  earnest around 2019, I threw myself wholeheartedly into the DA
                  fandom.
                </p>
                <p>
                  I'm primarily a writer, but I also love to run projects,
                  events, and communities. I dabble in coding and graphic
                  design. At any given time I have a chaotic mass of projects
                  and deadlines happening all at once, but the Annual is always
                  my favourite. I'm immensely proud of the work we manage to
                  accomplish each year!
                </p>
              </div>
            </article>
          </div>
        </div>
      </main>
    </Layout>
  );
}
