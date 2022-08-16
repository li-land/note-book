import { FC } from "react";
import { Col, Row, Spin } from "antd";
import styles from "./Loader.module.scss";

interface LoaderProps {
  description: string;
}

const Loader: FC<LoaderProps> = ({ description }) => {
  return (
    <Row className={styles.wrapper}>
      <Col>
        <Spin size="large" tip={description} />
      </Col>
    </Row>
  );
};

export default Loader;
