import { useContext, useState } from "react";
import { DonorContext } from "./Donor";
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

const DonorList = () => {
    const { value, onEdit, onSave, updateValue, onDelete } = useContext(DonorContext);

    
  return (
    <MDBContainer id="donorList" className="my-[100px]">
        <div className="mt-[100px] flex justify-center">
        <h3 className="text-center">Donor List</h3>
        <MDBRow>
            <MDBCol size="12">
                <MDBTable >
                    <MDBTableHead dark>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Blood Type</th>
                            <th>Action</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody className="align-center mb-0">
                        <tr>
                            <td><input type="text" value={value.name} onChange={(e) => {updateValue(e, "name")}} /></td>
                            <td><input type="text" value={value.phone} onChange={(e) => {updateValue(e, "phone")}} /></td>
                            <td><input type="text" value={value.blood} onChange={(e) => {updateValue(e, "blood")}} /></td>
                            <td><Button size="sm" onClick={() => {onSave(value.id)}}>{value.id ? "Save" : "Add new row "}</Button></td>
                        </tr>
                        {value.Alldata.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center mb-0">No Data Found</td>
                                </tr>
                        ): (value.Alldata.map(donor => {
                            return (
                                <tr key={donor.id}>
                                    <td>{donor.name}</td>
                                    <td>{donor.phone}</td>
                                    <td>{donor.blood}</td>
                                    <td><Button size="sm" variant="primary" onClick={() => onEdit(donor.id)}>Edit</Button> | 
                                    <Button size="sm" variant="danger" onClick={() => onDelete(donor.id)}>Delete</Button></td>
                                </tr>
                            )
                        }))}
                    </MDBTableBody>
                </MDBTable>
            </MDBCol>
        </MDBRow>
        
    </div>
    </MDBContainer>
   
  )
}

export default DonorList;