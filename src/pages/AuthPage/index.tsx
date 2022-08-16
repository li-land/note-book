import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Row } from "antd";
import LoginForm from "../../components/Forms/LoginForm";
import { RouteNames } from "../../routes";
import styles from "./AuthPage.module.scss";

const AuthPage: FC = () => {
  const isAuth = false;
  const navigate = useNavigate();

  if (isAuth) {
    navigate(RouteNames.MAIN, { replace: true });
  }

  return (
    <Layout>
      <Row className={styles.wrapper}>
        <LoginForm />
      </Row>
    </Layout>
  );
};

export default AuthPage;
