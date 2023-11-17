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
    MDBBtnGroup    
} from 'mdb-react-ui-kit';

const LocationList = () => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState("");
    const [sortValue, setSortValue] = useState("");

    const sortOptions = ["name", "street"];
    
    useEffect(() => {
        loadLocationData();
    }, []);

    const loadLocationData = async () => {
        return await axios.get("https://donors-list.onrender.com/LocationData")
                    .then((response) => setData(response.data))
                    .catch((err) => console.log(err))
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        return await axios
            .get(`https://donors-list.onrender.com/LocationData?q=${value}`)
            .then((resposnse) => {
                setData(resposnse.data);
                setValue("");
            })
            .catch((err) => console.log(err));
    }

    const handleReset = () => {
        loadLocationData();
    };

    const handleSort = async (e) => {
        let value = e.target.value;
        setSortValue(value);
        return await axios
            .get(`https://donors-list.onrender.com/LocationData?_sort=${value}&_order=asc`)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => console.log(err));
    }

  return (
    <MDBContainer>
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
            placeholder="Search Blood Group..."
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
        <MDBCol size="4">Filter By Status"</MDBCol>
    </MDBRow>
    </MDBContainer>
   
  )
}

export default LocationList;