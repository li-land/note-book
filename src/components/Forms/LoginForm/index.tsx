import { FC } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../../hooks";
import { AuthActionCreators } from "../../../store/asyncActions/AuthActionCreators";
import styles from "./LoginForm.module.scss";

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();

  const submitForm = (values: { email: string; password: string }) => {
    dispatch(AuthActionCreators.login(values.email, values.password));
  };

  return (
    <Form onFinish={submitForm}>
      <h2 className={`${styles.title} title`}>Для входа введите свои данные</h2>
      <Form.Item
        name="email"
        rules={[
          { type: "email", message: "Неверный формат почты" },
          { required: true, message: "Введите почту" },
        ]}
      >
        <Input
          className={styles.input}
          prefix={<UserOutlined className={styles.icon} />}
          placeholder="E-mail"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Введите пароль" }]}
      >
        <Input
          className={styles.input}
          prefix={<LockOutlined className={styles.icon} />}
          type="password"
          placeholder="Пароль"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.button}
          loading={false}
        >
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
