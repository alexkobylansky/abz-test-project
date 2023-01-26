import React from 'react';
import styles from './BannerBlock.module.scss';
import {PrimaryButton} from "../../ui/PrimaryButton";

export const BannerBlock: React.FC = () => {
  return (
    <section className={styles.bannerBlock}>
      <div className={styles.wrapper}>
        <header>
          <h1>Test assignment for front-end developer</h1>
        </header>
        <p>
          What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web
          interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
        </p>
        <PrimaryButton type={"button"} href={"#formBlock"}>Sign up</PrimaryButton>
      </div>
    </section>
  );
}