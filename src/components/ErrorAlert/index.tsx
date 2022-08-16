import { FC } from "react";
import { Alert } from "antd";
import styles from "./ErrorAlert.module.scss";

interface ErrorAlertProps {
  description: string;
}

const ErrorAlert: FC<ErrorAlertProps> = ({ description }) => {
  return (
    <Alert
      className={styles.alert}
      type="error"
      description={description}
      showIcon
    />
  );
};

export default ErrorAlert;
