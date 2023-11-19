import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody, 
    MDBContainer, 
    MDBRow, 
    MDBCol,
    MDBBtn,
    MDBBtnGroup,
    MDBPagination,
    MDBPaginationItem,
    MDBPaginationLink    
} from 'mdb-react-ui-kit';

const LocationList = () => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState("");
    const [sortValue, setSortValue] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [pageLimit] = useState(4);
    const [operation, setOperation] = useState("");


    const sortOptions = ["name", "street"];
    
    useEffect(() => {
        loadLocationData(0, 4, 0);
    }, []);

    const loadLocationData = async (
        start, 
        end,  
        increase, 
        optType =   null, 
        sortValue
    ) => {
        switch (optType) {
            case "search":
                setOperation(optType);
                setSortValue("");
                return await axios
                    .get(`https://donors-list.onrender.com/LocationData?q=${value}&_start=${start}&_end=${end}`)
                    .then((response) => {
                        setData(response.data);
                        setCurrentPage(currentPage + increase);
                        setValue("");
                    })
                    .catch((err) => console.log(err));
            case "sort":
                setOperation(optType);
                setSortValue(sortValue);
                return await axios
                    .get(`https://donors-list.onrender.com/LocationData?_sort=${sortValue}&_order=asc&_start=${start}&_end=${end}`)
                    .then((response) => {
                        setData(response.data);
                        setCurrentPage(currentPage + increase);
                    })
                    .catch((err) => console.log(err));
            default:
                return await axios.get(`https://donors-list.onrender.com/LocationData?_start=${start}&_end=${end}`)
                    .then((response) => {
                        setData(response.data);
                        setCurrentPage(currentPage + increase)
                    })
                    .catch((err) => console.log(err))
        }
        
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        loadLocationData(0, 4, 0, "search", sortValue);
    }

    const handleReset = () => {
        setOperation("");
        setValue("");
        setSortValue("");
        loadLocationData(0, 4, 0, operation, sortValue);
    };


    const handleSort = async (e) => {
        let value = e.target.value;
        setSortValue(value);
        loadLocationData(0, 4, 0, "sort", value);
    }

    const renderPagination = () => {
        if (data.length < 4 && currentPage === 0) return null;
        if (currentPage === 0) {
            return (
                <MDBPagination className="mb-0">
                    <MDBPaginationItem>
                        <MDBPaginationLink>1</MDBPaginationLink>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadLocationData(4, 8, 1, operation, sortValue)}>
                            Next
                        </MDBBtn>
                    </MDBPaginationItem>
                </MDBPagination>
            )
        } else if (currentPage < pageLimit -1 && data.length === pageLimit) {
            return (
                <MDBPagination className="mb-0">
                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadLocationData((currentPage - 1) * 4, currentPage * 4, -1, operation, sortValue)}>
                            Prev
                        </MDBBtn>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadLocationData((currentPage + 1) * 4, (currentPage + 2) * 4, 1, operation, sortValue)}>
                            Next
                        </MDBBtn>
                    </MDBPaginationItem>
                </MDBPagination>
            )
        } else {
            return (
                <MDBPagination className="mb-0">
                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadLocationData((currentPage - 1) * 4, currentPage * 4, -1, operation, sortValue)}>
                            Prev
                        </MDBBtn>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
                    </MDBPaginationItem>
                </MDBPagination>
            )
        }
    }

  return (
    <MDBContainer id="location">
        <form style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",  
            alignContent: "center"
        }}
        className="d-flex input-group w-auto"
        onSubmit={handleSearch}
        >
            <input 
            type="text"
            className="form-control"
            placeholder="Search Location name..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            />
            <MDBBtnGroup>
                <MDBBtn type="submit" color="dark">Search</MDBBtn>
                <MDBBtn className="mx-2" color="info" onClick={() => handleReset()}>
                    Reset
                </MDBBtn>
            </MDBBtnGroup>
        </form>
        <div className="mt-[100px]">
        <MDBRow>
            <MDBCol size="12">
                <MDBTable >
                    <MDBTableHead dark>
                        <tr>
                            <th>Name</th>
                            <th>Street</th>
                            <th>Postalc Code</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody className="align-center mb-0">
                        {data.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center mb-0">No Data Found</td>
                                </tr>
                        ): (data.map(location => {
                            return (
                                <tr key={location.id}>
                                    <td>{location.name}</td>
                                    <td>{location.street}</td>
                                    <td>{location.postal_code}</td>
                                </tr>
                            )
                        }))}
                    </MDBTableBody>
                </MDBTable>
            </MDBCol>
        </MDBRow>
        <div
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "250px",  
                alignContent: "center"
            }}
        >
            {renderPagination()}
        </div>
    </div>
    <MDBRow>
        <MDBCol size="8">
            <h5>Sort By:</h5>
            <select
                style={{ width: "50%", borderRadius: "2px", height: "35px"  }}
                onChange={handleSort}
                value={sortValue}
            >
                <option>PLease Select  Value</option>
                {sortOptions.map((item,index) => (
                    <option value={item} key={index}>
                        {item}
                    </option>
                ))}
            </select>
        </MDBCol>
    </MDBRow>
    </MDBContainer>
   
  )
}

export default LocationList;