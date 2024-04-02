import { Current, Intro, Preorder, Social, Thanks } from "@site/src/components/Homepage";

import Form from "@site/src/components/NewsletterSignUp";
import Layout from "@theme/Layout";
import React from "react";
import clsx from "clsx";
import styles from "./index.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

function HomepageHeader() {
  return (
    <header className={clsx("hero hero--primary")}>
      <h1 className={styles.title}>Dragon Age Annual 2024</h1>
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
				{/* <Preorder /> */}
				<Thanks />
        <Intro />
        <Social />
        <Form />
      </main>
    </Layout>
  );
}
