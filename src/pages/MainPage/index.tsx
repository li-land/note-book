import { FC } from "react";
import { Col, Layout, Row } from "antd";
import UsersList from "../../components/UsersList";
import Header from "../../components/Layout/Header";
import Section from "../../components/Section";
import styles from "./MainPage.module.scss";

const MainPage: FC = () => {
  return (
    <Layout>
      <Row className={styles.wrapper}>
        <Col xs={22} sm={20} lg={12}>
          <Header />
          <Section title="Ваши контакты">
            <UsersList />
          </Section>
        </Col>
      </Row>
    </Layout>
  );
};

export default MainPage;
