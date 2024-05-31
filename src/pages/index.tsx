import {
  Current,
  Intro,
  Social,
} from "@site/src/components/Homepage";

import Form from "@site/src/components/NewsletterSignUp";
import Layout from "@theme/Layout";
import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

function HomepageHeader() {
  return (
    <header className={clsx("hero hero--primary")}>
      <img src="/img/daa_2025_banner.png" alt="Dragon Age 2025" />
    </header>
  );
}

export default function Home(): JSX.Element {
  const {} = useDocusaurusContext();
  return (
    <Layout description="An Unofficial Fan-Made Charity Dragon Age Calendar.">
      <HomepageHeader />
      <main>
        <Current />
        <Intro />
        <Social />
        <Form />
      </main>
    </Layout>
  );
}
