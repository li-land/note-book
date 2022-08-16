import { FC } from "react";
import { Button, Form, Input, Row } from "antd";
import { IUser } from "../../../interfaces/IUser";
import { useAppDispatch } from "../../../hooks";
import { UsersActionCreators } from "../../../store/asyncActions/UsersActionCreators";
import styles from "./UsersForm.module.scss";

export type ModalType = "add" | "update" | "delete";

interface UsersFormProps {
  user?: IUser | null;
  type: ModalType;
  closeModal: (type: ModalType) => void;
}

const UsersForm: FC<UsersFormProps> = ({ user, type, closeModal }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const submitForm = (values: IUser) => {
    if (type === "add") {
      dispatch(UsersActionCreators.addUser(values.email, values.name));
      closeModal("add");
    } else {
      dispatch(
        UsersActionCreators.updateUser({
          id: user!.id,
          email: values.email,
          name: values.name,
        })
      );
      closeModal("update");
    }
    form.resetFields();
  };

  return (
    <Form
      form={form}
      initialValues={
        type === "add"
          ? { name: "", email: "" }
          : { name: user!.name, email: user!.email }
      }
      onFinish={submitForm}
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Введите имя контакта" }]}
      >
        <Input placeholder="Имя контакта" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { type: "email", message: "Неверный формат почты" },
          { required: true, message: "Введите почту" },
        ]}
      >
        <Input placeholder="E-mail" />
      </Form.Item>
      <Form.Item>
        <Row className={styles.bottom}>
          <Button
            className={styles.button}
            onClick={() => {
              type === "add" ? closeModal("add") : closeModal("update");
            }}
          >
            Назад
          </Button>

          <Button
            className={styles.button}
            type="primary"
            htmlType="submit"
            loading={false}
          >
            {type === "add" ? "Добавить" : "Сохранить"}
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default UsersForm;
