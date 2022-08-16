import { FC, useState, useEffect } from "react";
import { Button, List, Modal, Row } from "antd";
import { DeleteTwoTone, UserOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../hooks";
import { UsersActionCreators } from "../store/asyncActions/UsersActionCreators";
import UsersForm, { ModalType } from "./Forms/UsersForm";
import { IUser } from "../interfaces/IUser";
import ErrorAlert from "./ErrorAlert";
import Search from "./Search";
import { usersSlice } from "../store/slices/usersSlice";
import Loader from "./Loader";

const UsersList: FC = () => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [usersList, setUsersList] = useState<IUser[]>([]);
  const [modal, setShownModal] = useState<{ [key: string]: boolean }>({
    add: false,
    update: false,
    delete: false,
  });
  const { isLoading, error, users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(UsersActionCreators.fetchUsers()).then(
      (data: IUser[] | undefined) => {
        if (data) setUsersList(data);
      }
    );
  }, []);

  const openModal = (type: ModalType, user?: IUser) => {
    if (type === "update" || type === "delete") {
      user && setSelectedUser(user);
    }
    setShownModal({ ...modal, [type]: true });
  };

  const closeModal = (type: ModalType) => {
    dispatch(usersSlice.actions.selectUser(null));
    setShownModal({ ...modal, [type]: false });
  };

  useEffect(() => {
    setUsersList(users);
  }, [users]);

  const handleSearch = (value: string) => {
    setUsersList(
      users.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <>
      {error ? <ErrorAlert description={error} /> : null}

      <Row style={{ marginBottom: 10 }}>
        <Button
          type="primary"
          onClick={() => {
            openModal("add");
          }}
        >
          + Добавить контакт
        </Button>
      </Row>

      <Row>
        <Search placeholder="Начните вводить имя" handleSearch={handleSearch} />
      </Row>

      {isLoading ? (
        <Loader description="Загрузка контактов" />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={usersList}
          renderItem={(user) => (
            <List.Item
              key={user.id}
              actions={[
                <a
                  key="list-edit"
                  onClick={() => {
                    openModal("update", user);
                  }}
                >
                  Редактировать
                </a>,
                <a
                  key="list-delete"
                  onClick={() => {
                    openModal("delete", user);
                  }}
                >
                  <DeleteTwoTone />
                </a>,
              ]}
            >
              <List.Item.Meta
                avatar={<UserOutlined />}
                title={user.name}
                description={`E-mail: ${user.email}`}
              />
            </List.Item>
          )}
        />
      )}
      {modal.add && (
        <Modal
          title="Введите данные контакта"
          visible={modal.add}
          onCancel={() => {
            closeModal("add");
          }}
          footer={null}
        >
          <UsersForm type="add" closeModal={closeModal} />
        </Modal>
      )}
      {modal.update && (
        <Modal
          title="Изменить контакт"
          visible={modal.update}
          onCancel={() => {
            closeModal("update");
          }}
          footer={null}
        >
          <UsersForm
            type="update"
            user={selectedUser}
            closeModal={closeModal}
          />
        </Modal>
      )}
      {modal.delete && (
        <Modal
          title="Удаление контакта"
          visible={modal.delete}
          onCancel={() => {
            closeModal("delete");
          }}
          footer={[
            <Button
              key="no"
              onClick={() => {
                closeModal("delete");
              }}
            >
              Нет
            </Button>,
            <Button
              key="yes"
              type="primary"
              onClick={() => {
                if (selectedUser) {
                  dispatch(UsersActionCreators.deleteUser(selectedUser.id));
                  closeModal("delete");
                }
              }}
            >
              Да
            </Button>,
          ]}
        >
          <p>Вы действительно хотите удалить контакт {selectedUser?.name}?</p>
        </Modal>
      )}
    </>
  );
};

export default UsersList;
