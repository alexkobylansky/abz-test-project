import React from 'react';
import styles from './Preloader.module.scss';
import {ReactComponent as Spinner} from "../../assets/images/svg/preloader.svg";

interface InterfaceProps {
  isLoading: boolean;
}

export const Preloader: React.FC<InterfaceProps> = ({isLoading}) => {
  return (
    <div className={`${styles.preloaderContainer} ${isLoading ? "" : styles.hidden}`}>
    <Spinner/>
    </div>
  );
}