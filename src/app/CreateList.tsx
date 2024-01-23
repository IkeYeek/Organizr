import { FilePlus } from "react-feather";

type CreateListProps = {
  handleCreateList: () => void;
};
const CreateList = ({ handleCreateList }: CreateListProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "200px",
        height: "200px",
      }}
    >
      <button
        className={"button is-rounded has-background-info"}
        onClick={handleCreateList}
        style={{
          width: "60%",
          height: "60%",
          border: "black",
        }}
      >
        <FilePlus />
      </button>
    </div>
  );
};

export default CreateList;
