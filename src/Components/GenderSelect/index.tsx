import React from "react";
import { Col, Form, Row } from "react-bootstrap";

type Props = {
  gender: string;
  setGender: React.FC<React.SetStateAction<string>>;
};

const GenderSelect= ({ gender, setGender }:any) => {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setGender(event.target.value);
  };

  return (
    <Form.Group style={{ width: "110px" }} controlId="formGridState">
      <Form.Label as="h5" id="gender-select-label">
        Gender
      </Form.Label>
      <Form.Select
        as="select"
        id="gender-select"
        value={gender}
        onChange={handleChange}
        aria-labelledby="gender-select-label"
      >
        <option value="All">All</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </Form.Select>
    </Form.Group>
  );
};

export default GenderSelect;
