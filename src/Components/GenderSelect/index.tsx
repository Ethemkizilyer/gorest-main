import React from "react";
import {Form} from "react-bootstrap";

type Props = {
  gender: string;
  setGender: React.FC<React.SetStateAction<string>> | any;
};

const GenderSelect = ({ gender, setGender }: Props) => {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setGender(event.target.value);
  };

  return (
    <Form.Group className="mb-2" style={{ width: "110px" }} controlId="formGridState">
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
