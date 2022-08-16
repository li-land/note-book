import { EyeTwoTone } from "@ant-design/icons";
import { Row, Menu, Col } from "antd";
import { Header as AntDHeader } from "antd/lib/layout/layout";
import { FC, useId } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { AuthActionCreators } from "../../../store/asyncActions/AuthActionCreators";
import styles from "./Header.module.scss";

const Header: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const menuItems = [
    {
      id: useId(),
      onClick: () => {
        dispatch(AuthActionCreators.logout());
      },
      children: "Выйти",
    },
  ];

  return (
    <AntDHeader className={styles.header}>
      <Row className={styles.body}>
        <Col>
          <EyeTwoTone className={styles.logo} />
          <span className={styles.name}>{user.name}</span>
        </Col>
        <Col>
          <Menu
            className={styles.nav}
            theme="light"
            mode="horizontal"
            selectable={false}
          >
            {menuItems.map((item) => (
              <Menu.Item key={item.id} {...item} />
            ))}
          </Menu>
        </Col>
      </Row>
    </AntDHeader>
  );
};

export default Header;
