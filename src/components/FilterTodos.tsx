import { useState } from "react";
import { isDatesEqual, isInRange } from "../utils/utils";

// 1-initially it gets the original tasks from the state
// 2-Filter them based on filter type
// 3-store the new filterd tasks in its own state in the app component
const FilterTodos = (props: any) => {
  const { todos, setFilteredTodos, filtered, setFiltered } = props;

  const [filterType, setFilterType] = useState("date");
  const [fromDate, setFromDate] = useState<any>(
    new Date().toISOString().slice(0, 10)
  );
  const [toDate, setToDate] = useState<any>(
    new Date().toISOString().slice(0, 10)
  );
  
  const currentTodos = [...todos];
  let filterdTodos = [];


  const filter = () => {

    setFiltered(true);
    // Each filter type has its own way to handle as following 
    if (filterType === "date") {
      filterdTodos = [...currentTodos].filter((todo) => {
        const handledDate = new Date(todo.dueDate).toISOString().slice(0, 10);
        return isDatesEqual(handledDate, fromDate);
      });

      setFilteredTodos(filterdTodos);
    }

    if (filterType === "range") {
      setFiltered(true);

      filterdTodos = [...currentTodos].filter((todo) => {
        const handledDate = new Date(todo.dueDate).toISOString().slice(0, 10);

        return isInRange(handledDate, fromDate, toDate);
      });

      setFilteredTodos(filterdTodos);
    }
  };

  const removeFilter = () => {
    setFiltered(false);
  };

  return (
    <article className="filter">
      <h2>Filter</h2>
      <span>Filter By :</span>
      <select
        id="filterType"
        value={filterType}
        onChange={(e) => {
          setFilterType(e.target.value);
        }}
      >
        <option value="range">Range</option>
        <option value="date">Date</option>
      </select>
      <label htmlFor="startDate">{filterType === "range" && "From"}</label>
      <input
        type="date"
        id="startDate"
        value={fromDate}
        onChange={(e) => {
          setFromDate(new Date(e.target.value).toISOString().slice(0, 10));
        }}
      />
      {filterType === "range" && (
        <>
          <label htmlFor="endDate">To</label>
          <input
            min={new Date(fromDate).toISOString().slice(0, 10)}
            type="date"
            id="endDate"
            value={toDate}
            onChange={(e) => {
              setToDate(new Date(e.target.value).toISOString().slice(0, 10));
            }}
          />
        </>
      )}

      <button
        onClick={() => {
          filter();
        }}
      >
        Filter
      </button>
      {filtered && (
        <button
          onClick={() => {
            removeFilter();
          }}
          className="negative"
        >
          Remove
        </button>
      )}
    </article>
  );
};

export default FilterTodos;
