import React, { useState } from "react";
import { useForm } from "react-hook-form";

var allData = [];
const Problem1 = () => {
  const [defaultData, setDefaultData] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  
  const onSubmit = (data) => {
    data.id = Date.now();
    const array = [...allData, data];
    allData = array;
    setDefaultData(allData);
    reset();
  };

  function customSort(a, b) {
    const statusOrder = { active: 1, completed: 2, pending: 3 };
    const statusA = a.status.toLowerCase();
    const statusB = b.status.toLowerCase();
    return statusOrder[statusA] - statusOrder[statusB];
  }
  const handleClick = (keyword) => {
    if (keyword === "all") {
      const sorted = allData.sort(customSort);
      setDefaultData(sorted);
    } else {
      setDefaultData(
        allData?.filter((item) => item.status.toLowerCase() === keyword)
      );
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                {...register("name")}
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                {...register("status")}
                type="text"
                name="status"
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul
            className="nav nav-pills m-3 d-flex justify-content-center align-items-center"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item">
              <button
                onClick={(e) => handleClick(e.target.innerText.toLowerCase())}
                className="btn btn-primary m-1"
                type="button"
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={(e) => handleClick(e.target.innerText.toLowerCase())}
                className="btn btn-primary m-1"
                type="button"
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={(e) => handleClick(e.target.innerText.toLowerCase())}
                className="btn btn-primary m-1"
                type="button"
              >
                Completed
              </button>
            </li>
          </ul>

          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {defaultData?.map((data) => (
                <tr key={data.id}>
                  <td>{data.name}</td>
                  <td>{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
