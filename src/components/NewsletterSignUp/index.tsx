import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const SignUp = ({ onSuccess }: { onSuccess: () => void }) => (
  <section className={styles.social}>
    <div className="container"><a name="newsletter" />
      <div className={clsx(styles.row, "margin-bottom--md")}>
        <h2>Join Our Newsletter</h2>
      a</div>
      <div className={clsx(styles.row, "margin-bottom--md")}>
        <form
          name="newsletter-subscribe"
          action="https://gmail.us8.list-manage.com/subscribe/post"
          method="POST"
        >
          <input type="hidden" name="u" value="af081f3f7162c7300898c1a98" />
          <input type="hidden" name="id" value="f8f98934b6" />
          <input type="hidden" name="form-name" value="newsletter-subscribe" />
          <label htmlFor="email" className={styles.newsletter}>
            Email
          </label>
          <input
            type="email"
            name="MERGE0"
            id="MERGE0"
            className={styles.newsletter}
            defaultValue={"example@email.com"}
            required
          />
          <button type="submit" className={clsx(styles.newsletter)}>
            Subscribe
          </button>
        </form>
      </div>
    </div>
  </section>
);

const Form = () => {
  const [submitted, setSubmitted] = React.useState(false);
  return <SignUp onSuccess={() => setSubmitted(true)} />;
};

export default Form;
