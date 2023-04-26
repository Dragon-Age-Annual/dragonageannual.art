import { FaLink, FaMastodon, FaTumblr, FaTwitter } from "react-icons/fa";

import Layout from "@theme/Layout";
import React from "react";
import clsx from "clsx";
import styles from "./index.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Mods(): JSX.Element {
  const {} = useDocusaurusContext();
  return (
    <Layout description="An Unofficial Fan-Made Charity Dragon Age Calendar.">
      <main className="container container--fluid margin-vert--lg">
        <div className="row">
          <div className="col col--10">
            <article>
              <h1>Meet the Mods</h1>
              <div className="avatar margin-top--xl">
                <img
                  className="avatar__photo avatar__photo--xl"
                  src="/img/mods/kemvee.png"
                />
                <div className="avatar__intro">
                  <div className="avatar__name">Kemvee</div>
                  <small className="avatar__subtitle">
                    <em>Title/Role/IDK</em>
                  </small>
                  <div className={clsx("avatar__subtitle", styles.social)}>
                    <a href="">
                      <FaTumblr />
                    </a>
                    <a href="">
                      <FaTwitter />
                    </a>
                  </div>
                </div>
              </div>
              <div className="avatar__subtitle margin-bottom--xl">
                A blurb goes here. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur.
              </div>
							<div className="avatar">
                <img
                  className="avatar__photo avatar__photo--xl"
                  src="/img/mods/fox.png"
                />
                <div className="avatar__intro">
                  <div className="avatar__name">FoxInBoots</div>
                  <small className="avatar__subtitle">
                    <em>Title/Role/IDK</em>
                  </small>
                  <div className={clsx("avatar__subtitle", styles.social)}>
                    <a href="">
                      <FaTumblr />
                    </a>
                    <a href="">
                      <FaTwitter />
                    </a>
										<a href="">
                      <FaMastodon />
                    </a>
                  </div>
                </div>
              </div>
              <div className="avatar__subtitle margin-bottom--xl">
                A blurb goes here. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur.
              </div>
							<div className="avatar">
                <img
                  className="avatar__photo avatar__photo--xl"
                  src="/img/mods/enigmalea.png"
                />
                <div className="avatar__intro">
                  <div className="avatar__name">Enigmalea</div>
                  <small className="avatar__subtitle">
                    <em>Title/Role/IDK</em>
                  </small>
                  <div className={clsx("avatar__subtitle", styles.social)}>
									<a href="">
                      <FaLink />
                    </a>
                    <a href="">
                      <FaTumblr />
                    </a>
										<a href="">
                      <FaMastodon />
                    </a>
                  </div>
                </div>
              </div>
              <div className="avatar__subtitle margin-bottom--xl">
                A blurb goes here. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur.
              </div>
            </article>
          </div>
        </div>
      </main>
    </Layout>
  );
}
