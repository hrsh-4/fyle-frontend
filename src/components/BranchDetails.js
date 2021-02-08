import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,

} from "reactstrap";

import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import { DebounceInput } from "react-debounce-input";

const searchAPICall =
  "https://hk-fyle-backend.herokuapp.com/api/branches?q=";
const cityAPICall =
  "https://hk-fyle-backend.herokuapp.com/api/branches/autocomplete?q=";



const BranchDetails = () => {
  const cache = setupCache({
    maxAge: 15 * 60 * 1000,
  });
  const api = axios.create({
    adapter: cache.adapter,
  });
  

    const url = "";
  const [currentCity, setCity] = useState("Mumbai");
  const [searchQuery, setSearchQuery] = useState(null);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [tableData, setTableData] = useState(null);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [lastTableData, setLastTableData] = useState();

  useEffect(() => {
    if (checkboxValue) {
      setLastTableData(tableData);
      setTableData(JSON.parse(localStorage.getItem("favourites")));
    } else setTableData(lastTableData);
  }, [checkboxValue]);
  useEffect(() => {
    api({
      url:
        url +
        cityAPICall +
        currentCity +
        "&limit=" +
        limit +
        "&offset=" +
        offset,
      method: "get",
    })
      .then((result) => {
        setTableData(result.data);
      })
      .catch((error) => console.log(error));
  }, [currentCity]);
  useEffect(async () => {
    if (searchQuery && searchQuery !== "") {
      api({
        url:
          url +
          searchAPICall +
          searchQuery +
          "&limit=" +
          limit +
          "&offset=" +
          offset,
        method: "get",
      })
        .then((result) => {
          setTableData(result.data);
        })
        .catch((error) => console.log(error));
    } else {
      api({
        url:
          url +
          cityAPICall +
          currentCity +
          "&limit=" +
          limit +
          "&offset=" +
          offset,
        method: "get",
      })
        .then((result) => {
          setTableData(result.data);
        })
        .catch((error) => console.log(error));
    }
  }, [limit]);
  useEffect(() => {
    if (searchQuery && searchQuery !== "") {
      api({
        url:
          url +
          searchAPICall +
          searchQuery +
          "&limit=" +
          limit +
          "&offset=" +
          offset,
        method: "get",
      })
        .then((result) => {
          setTableData(result.data);
        })
        .catch((error) => console.log(error));
    } else {
      api({
        url:
          url +
          cityAPICall +
          currentCity +
          "&limit=" +
          limit +
          "&offset=" +
          offset,
        method: "get",
      })
        .then((result) => {
          setTableData(result.data);
        })
        .catch((error) => console.log(error));
    }
  }, [offset]);
  useEffect(() => {
    if (searchQuery && searchQuery !== "") {
      api({
        url:
          url +
          searchAPICall +
          searchQuery +
          "&limit=" +
          limit +
          "&offset=" +
          offset,
        method: "get",
      })
        .then((result) => {
          setTableData(result.data);
        })
        .catch((error) => console.log(error));
    } else {
      api({
        url:
          url +
          cityAPICall +
          currentCity +
          "&limit=" +
          limit +
          "&offset=" +
          offset,
        method: "get",
      })
        .then((result) => {
          setTableData(result.data);
        })
        .catch((error) => console.log(error));
    }
  }, [searchQuery]);
  return (
    <div align="center" className="container">
      
      <div>
        <div>
          <Form>
            <FormGroup style={{ display: "flex" }}>
              <Label for="citySelection">City :</Label> {"   "}
              <Input
                style={{ width: "20%" ,border :"2px solid grey",borderRadius : '20px'  }}
                type="select"
                name="citySelection"
                id="citySelection"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              >
                <option>Bangalore</option>
                <option>Indore</option>
                <option>Hyderabad</option>
                <option>Mumbai</option>
                <option>Pune</option>
              </Input>
              <Label className="ml-auto" for="searchForBranch">
                Search:
              </Label>
              <DebounceInput
                style={{ width: "40%" ,border :"2px solid grey",borderRadius : '20px'  }}
                placeholder="Search by ifsc, branch , address, city, state etc......"
                minLength={3}
                debounceTimeout={100}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </FormGroup>
          </Form>
        </div>
      </div>

      <div>
        <div >
          {tableData ? (
            <Table >
              <thead>
                <tr>
                  <th>IFSC</th>
                  <th>BANKID</th>
                  <th>BRANCH</th>
                  <th>ADDRESS</th>
                  <th>CITY</th>
                  <th>DISTRICT</th>
                  <th>STATE</th>
                  <th>FAVOURITE</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((branch, index) => {
                  return (
                    <tr>
                      <td>{branch.ifsc}</td>
                      <td>{branch.bank_id}</td>
                      <td>{branch.branch}</td>
                      <td>{branch.address}</td>
                      <td>{branch.city}</td>
                      <td>{branch.district}</td>
                      <td>{branch.state}</td>
                      <td>
                        <Button
                           style={{width : "100px",background : "black", border: "2px solid grey", borderRadius  : "30px" }}
                          onClick={() => {
                            var fav = JSON.parse(
                              localStorage.getItem("favourites")
                            );

                            if (fav) {
                              if (fav.some((item) => item.ifsc === branch.ifsc))
                                alert("Already a favourite");
                              else {
                                fav.push(branch);
                                localStorage.setItem(
                                  "favourites",
                                  JSON.stringify(fav)
                                );
                                alert( `${branch.ifsc} was added to favourites`);
                              }
                            } else {
                              var L = [];
                              L.push(branch);
                              localStorage.setItem(
                                "favourites",
                                JSON.stringify(L)
                              );
                              alert(`${branch.ifsc} was added to favourites`);
                            }
                          }}
                        >
                          Add
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : checkboxValue ? (
            <div style={{ justifyContent: "center" }}>No favourite exists</div>
          ) : (
            <h2 align="center">Loading....</h2>
          )}
        </div>
      </div>
      <div salign="center" >
        <div >
          <Pagination size="md" >
            <PaginationItem  >
              <PaginationLink onClick={() => setOffset(0)} first />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink 
                onClick={() => {
                  if (offset > 0) setOffset(offset - limit);
                }}
                previous
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => setOffset(0)}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => setOffset(limit)}>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => setOffset(limit * 2)}>
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  if (tableData) setOffset(offset + limit);
                }}
                next
              />
            </PaginationItem>
          </Pagination>
          <Form>
            <FormGroup style={{ display: "flex", alignItems: "center" }}>
              <Label for="limitChange">Rows : </Label>
              <Input
                style={{color : "white",width : "100px",background : "black", border: "2px solid grey", borderRadius  : "30px" }} 
                type="select"
                name="limitChange"
                id="limitChange"
                onChange={(e) => {
                  setLimit(e.target.value);
                }}
              >
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
                <option>50</option>
              </Input>
              <Label
                style={{
                  marginLeft: "auto",
                  justifyContent: "center",
                  marginRight: "200px",
                }}
                check
              >
                <Input
                  style={{color : "white",background: "black",  border: "2px solid grey", borderRadius  : "30px" }}
                  onClick={() => setCheckboxValue(!checkboxValue)}
                  type="button"
                  value={checkboxValue ? "Hide Favourite ":" Show Favourite"}
                />{" "}
                
              </Label>
            </FormGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default BranchDetails;