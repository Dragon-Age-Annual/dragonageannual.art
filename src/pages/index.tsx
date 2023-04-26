import { Intro, Social } from "@site/src/components/Homepage";

import Layout from "@theme/Layout";
import React from "react";
import clsx from "clsx";
import styles from "./index.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

function HomepageHeader() {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <img src="/img/light-hero.png" alt="" className="light-mode" />
      <img src="/img/dark-hero.png" alt="" className="dark-mode" />
    </header>
  );
}

export default function Home(): JSX.Element {
  const {} = useDocusaurusContext();
  return (
    <Layout description="An Unofficial Fan-Made Charity Dragon Age Calendar.">
      <HomepageHeader />
      <main>
				<Intro />
        <Social />
				{/* <Newsletter /> */}
      </main>
    </Layout>
  );
}
