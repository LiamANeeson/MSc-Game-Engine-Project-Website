import styles from "./style.module.css";
import React from "react";
import Form from "react-bootstrap/Form";

const options = [
  
];

const Sort = ({ sort, setSort }) => {
  const onSelectChange = ({ currentTarget: input }) => {
    setSort({ sort: input.value, order: sort.order });
  };
  return (
    <>
      <div className={styles.container}>
        <Form.Select aria-label="Default select example">
          <option value="">Sort by name(A-Z)</option>
          <option value="">Sort by name(Z-A)</option>
          <option value="votes">Sort by most votes</option>
          <option value="views">Sort by most views</option>
        </Form.Select>
      </div>
    </>
  );
};

export default Sort;