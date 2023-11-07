import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

var allCountry = [];
var allUsCountry = [];
const Problem2 = () => {
  const [countryList, setCountryList] = useState([]);
  const [usCountrys, setUsCountrys] = useState([]);
  const [eventStatus, setEvenStatus] = useState(false);
  const [eventStatusUs, setEvenStatusUs] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryUs, setSearchQueryUs] = useState("");
  const [singleCountry, setSingleCountry] = useState(null);
  // const [currentModal,setCurrentModal]=useState(null);

  const navigate = useNavigate();

  // console.log(currentModal);
  useEffect(() => {
    axios.get("https://contact.mediusware.com/api/contacts/").then((res) => {
      setCountryList(res.data.results);
      allCountry = res.data.results;

      //------ filter all us country start----
      const searchedUsCountry = allCountry.filter(
        (item) => item.country.name.toLowerCase() === "united states"
      );
      setUsCountrys(searchedUsCountry);
      allUsCountry = searchedUsCountry;
      //------ filter all us country end----
    });
  }, []);

  //---search functionality start-------
  const handleSearch = () => {
    const searchedCountry = allCountry.filter(
      (item) => item.country.name.toLowerCase() === searchQuery.toLowerCase()
    );
    setCountryList(searchedCountry.length > 0 ? searchedCountry : allCountry);
    setSearchQuery("");
  };

  const handleSearchUs = () => {
    const searchedCountry = allUsCountry.filter(
      (item) => item.phone === searchQueryUs
    );
    setUsCountrys(searchedCountry.length > 0 ? searchedCountry : allUsCountry);
    setSearchQueryUs("");
  };
  //---search functionality end-------

  //---event status set using checkbox start-------
  const handleEnvenCountryList = () => {
    setEvenStatus(!eventStatus);
  };
  const handleEnvenCountryUsList = () => {
    setEvenStatusUs(!eventStatusUs);
  };
  //---event status set using checkbox end-------

  //---filter data using event status start-----
  const filteredCountryList = eventStatus
    ? countryList.filter((country) => country.id % 2 === 0)
    : countryList;

  const filteredCountryUsList = eventStatusUs
    ? usCountrys.filter((country) => country.id % 2 === 0)
    : usCountrys;
  //---filter data using event status end-----

  //----find single country info for modal 3 start----------
  const handleSingleCountry = (id) => {
    setSingleCountry(allCountry?.find((item) => +item.id === +id));
  };
  //----find single country info for modal 3 end----------

  // const handleModal=(modalNo)=>{
  //   setCurrentModal(modalNo)
  // }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center align-items-center gap-3">
          <a
            className="btn btn-lg btn-outline-primary"
            data-bs-toggle="modal"
            href="#exampleModalToggle"
            role="button"
            id="allContractModal1"
            // onClick={()=>handleModal(1)}
          >
            All Contacts
          </a>
          <a
            className="btn btn-lg btn-outline-warning"
            data-bs-toggle="modal"
            href="#exampleModalToggle2"
            role="button"
            // onClick={()=>handleModal(2)}
          >
            US Contacts
          </a>
        </div>
      </div>

      {/* //-------------modal-1---------------------*/}
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Modal A
              </h5>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-center align-items-center">
                <button
                  className="btn btn-primary m-1"
                  data-bs-target="#exampleModalToggle"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                  // onClick={()=>handleModal(1)}
                >
                  All Contact
                </button>
                <button
                  className="btn btn-warning m-1"
                  data-bs-target="#exampleModalToggle2"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                  // onClick={()=>handleModal(2)}
                >
                  US Contact
                </button>
              </div>
              <div>
                <div className="my-2">
                  <div className="input-group mb-3">
                    <input
                      id="myInput"
                      type="text"
                      className="form-control"
                      placeholder="Enter a country name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={handleSearch}
                      className="input-group-text"
                      id="basic-addon2"
                    >
                      Search
                    </button>
                  </div>
                </div>
                <table className="table table-striped" id="myTable">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCountryList?.map((country) => {
                      return (
                        <tr
                          onClick={() => handleSingleCountry(country.id)}
                          key={country.id}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          style={{ cursor: "pointer" }}
                        >
                          <td>{country.id}</td>
                          <td>{country.phone}</td>
                          <td>{country.country.name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer justify-content-between align-items-center">
              <div className="form-check">
                <input
                  onChange={handleEnvenCountryList}
                  className="form-check-input"
                  type="checkbox"
                  checked={eventStatus}
                  id="flexCheckIndeterminate"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexCheckIndeterminate"
                >
                  Only Even
                </label>
              </div>
              <button
                className="btn btn-danger"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* //--------------modal-2---------------- */}
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel2">
                Modal B
              </h5>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-center align-items-center">
                <button
                  className="btn btn-primary m-1"
                  data-bs-target="#exampleModalToggle"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                  // onClick={()=>handleModal(1)}
                >
                  All Contact
                </button>
                <button
                  className="btn btn-warning m-1"
                  data-bs-target="#exampleModalToggle2"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                  // onClick={()=>handleModal(2)}
                >
                  US Contact
                </button>
              </div>
              <div>
                <div className="my-2">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search By Contact Number"
                      value={searchQueryUs}
                      onChange={(e) => setSearchQueryUs(e.target.value)}
                    />
                    <button
                      onClick={handleSearchUs}
                      className="input-group-text"
                      id="basic-addon2"
                    >
                      Search
                    </button>
                  </div>
                </div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCountryUsList?.map((country) => {
                      return (
                        <tr
                          onClick={() => handleSingleCountry(country.id)}
                          key={country.id}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          style={{ cursor: "pointer" }}
                        >
                          <td>{country.id}</td>
                          <td>{country.phone}</td>
                          <td>{country.country.name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer justify-content-between align-items-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckIndeterminate"
                  onChange={handleEnvenCountryUsList}
                  checked={eventStatusUs}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexCheckIndeterminate"
                >
                  Only Even
                </label>
              </div>
              <button
                className="btn btn-danger"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* //--------------modal-3------------------- */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal C
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <h6>Id : {singleCountry?.id}</h6>
                <h6>Name : {singleCountry?.country?.name}</h6>
                <h6>Contact : {singleCountry?.phone}</h6>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem2;
