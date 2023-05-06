import Layout from "@theme/Layout";
import Past from "@site/src/components/PastYears";
import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function About(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Past Years`} description="Learn more about past Dragon Age Annuals.">
      <Past />
    </Layout>
  );
}
