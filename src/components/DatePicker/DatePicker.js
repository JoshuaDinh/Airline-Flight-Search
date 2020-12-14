import React from "react";
import { TextField } from "@material-ui/core";

const DatePicker = ({ selectedDate, value }) => {
  return (
    <div className="date">
      <form className="datePicker__form" noValidate>
        <TextField
          value={value}
          onChange={(date) => selectedDate(date.target.value)}
          type="date"
        />
      </form>
    </div>
  );
};

export default DatePicker;
