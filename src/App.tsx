import React, { useState, ChangeEvent } from "react";
import "./App.css";
import {
  getWeekendsInRange,
  isWeekend,
  isWeekendDisabled,
} from "./utils/dateUtils";
import { predefinedRanges } from "./components/predefinedRanges";

const App: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [weekends, setWeekends] = useState<Date[]>([]);

  const handleDateChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "start" | "end"
  ): void => {
    const newDate = new Date(e.target.value);
    if (isWeekend(newDate)) {
      alert("Please select a weekday.");
      return;
    }

    if (type === "start") {
      setStartDate(newDate);
    } else if(startDate &&  startDate >= newDate) {
      alert("EndDate should be greater than startDate.");
    }else {
      setEndDate(newDate);
    }

    if (startDate && endDate && startDate <= endDate) {
      setWeekends(getWeekendsInRange(startDate, endDate));
    }
  };

  const handleReset = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    setStartDate(null);
    setEndDate(null);
    setWeekends([]);
  };

  const handlePredefinedRange = (range: [Date, Date]): void => {
    const [start, end] = range;
    setStartDate(start);
    setEndDate(end);
    setWeekends(getWeekendsInRange(start, end));
  };

  return (
    <div className="App">
      <h1>Date Range Picker</h1>
      <div>
        <label>
          Start Date:
          <input
            type="date"
            onChange={(e) => handleDateChange(e, "start")}
            value={startDate ? startDate.toISOString().split("T")[0] : ""}
            disabled={isWeekendDisabled(new Date(startDate?.toString() || ""))}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            onChange={(e) => handleDateChange(e, "end")}
            value={endDate ? endDate.toISOString().split("T")[0] : ""}
            disabled={isWeekendDisabled(new Date(endDate?.toString() || ""))}
          />
        </label>
        <button onClick={(e) => handleReset(e)}>Reset</button>
      </div>
      <div>
        <h2>Predefined Ranges</h2>
        {predefinedRanges.map(({ label, range }) => (
          <button key={label} onClick={() => handlePredefinedRange(range)}>
            {label}
          </button>
        ))}
      </div>
      {startDate && endDate && (
        <div>
          <h2>Selected Range</h2>
          <p>
            Start: {startDate.toISOString().split("T")[0]} <br />
            End: {endDate.toISOString().split("T")[0]}
          </p>
          <h3>Weekends in Range</h3>
          <ul>
            {weekends.map((date, index) => (
              <li key={index}>{date.toISOString().split("T")[0]}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
