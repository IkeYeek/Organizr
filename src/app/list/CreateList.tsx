import { FilePlus } from "react-feather";
import styles from "./styles/createlist.module.scss";

type CreateListProps = {
  handleCreateList: () => void;
};
const CreateList = ({ handleCreateList }: CreateListProps) => {
  return (
    <div className={styles["create-list"]}>
      <button
        className={`button is-rounded has-background-info ${styles["create-list-button"]}`}
        onClick={handleCreateList}
      >
        <FilePlus />
      </button>
    </div>
  );
};

export default CreateList;
