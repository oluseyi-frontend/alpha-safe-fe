import { Container, Typography } from "@mui/material";
import React from "react";
import BodyText from "../../component/bodyText/BodyText";
import Heading from "../../component/Heading/Heading";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className={styles.home}>
      <Container>
        <div className={styles.home_content}>
          <div className={styles.home_content_text}>
            <Heading variant={"h4"} content={"Welcome to Alpha safe"} />
            <BodyText
              content={
                "Alpha Safe is the most trusted platform to manage digital assets. Here is how to get started"
              }
            />
          </div>
          <div className={styles.home_content_lg_card}>
            <div className={styles.home_content_card}>
              <div className={styles.home_content_card_heading}>
                <Heading variant={"h6"} content={"Create Safe"} />
              </div>
              <div className={styles.home_content_card_text}>
                <BodyText
                  content={
                    "Create a new Safe that is controlled by one or multiple owners."
                  }
                />
                <BodyText
                  content={
                    "You will be required to pay a network fee for creating your new Safe."
                  }
                />
              </div>
              <div className={styles.home_content_card_action}>
                  <Link to='/create'>
                  <button>+ Create new Safe</button>
                  </Link>
                
              </div>
            </div>
            <div className={styles.home_content_card}>
              <div className={styles.home_content_card_heading}>
                <Heading variant={"h6"} content={"Load Existing Safe"} />
              </div>
              <div className={styles.home_content_card_text}>
                <BodyText
                  content={
                    "Already have a Safe or want to access it from a different device? Easily load your Safe using your Safe address."
                  }
                />
              </div>
              <div
                className={`${styles.home_content_card_action} ${styles.load_existing_btn}`}
              >
                  <Link to='/load'>
                  <button>+ Add existing Safe</button>
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
