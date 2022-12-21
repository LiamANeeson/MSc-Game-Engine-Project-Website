import styles from "./style.module.css";
import React from "react";
import Form from "react-bootstrap/Form";

const Sort = ({ sort, setSort, disabled = false }) => {
  const onSelectChange = (e) => {
    console.log(e.target.value);
    setSort({ sort: e.target.value, order: "desc" });

    if (e.target.value === "name-desc") {
      setSort({ sort: "name", order: "desc" });
    }
    if (e.target.value === "name") {
      setSort({ sort: e.target.value, order: "asc" });
    }
  };
  return (
    <>
      <div className={styles.container}>
        <Form.Select
          className={styles.sort}
          disabled={disabled}
          aria-label="Default select example"
          onChange={onSelectChange}
        >
          <option value="name">Sort by name(A-Z)</option>
          <option value="name-desc">Sort by name(Z-A)</option>
          <option value="voteCount">Sort by most votes</option>
          <option value="viewCount">Sort by most views</option>
        </Form.Select>
      </div>
    </>
  );
};

export default Sort;