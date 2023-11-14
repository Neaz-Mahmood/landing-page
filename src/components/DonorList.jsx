import { useContext } from "react";
import { DonorContext } from "../App";
import { Table, Button } from "react-bootstrap";

const DonorList = () => {
    const { value, onEdit } = useContext(DonorContext);

    
  return (
    <div className="container">
        <Table variant="dark" striped bordered hover >
            <thead >
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Blood Type</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="text" value={value.name} onChange={(e) => {value.updateValue(e, "name")}} /></td>
                    <td><input type="text" value={value.phone} onChange={(e) => {value.updateValue(e, "phone")}} /></td>
                    <td><input type="text" value={value.blood} onChange={(e) => {value.updateValue(e, "blood")}} /></td>
                    <td><Button size="sm" onClick={() => {value.onSave(value.id)}}>{value.id ? "Save" : "Add new row "}</Button></td>
                </tr>
            {value.Alldata.map(donor => {
                return (
                    <tr key={donor.id}>
                        <td>{donor.name}</td>
                        <td>{donor.phone}</td>
                        <td>{donor.blood}</td>
                        <td><Button size="sm" variant="primary" onClick={() => onEdit(donor.id)}>Edit</Button> | 
                        <Button size="sm" variant="danger" onClick={() => value.onDelete(donor.id)}>Delete</Button></td>
                    </tr>
                )
            })}
                
               
            </tbody>
        </Table>
    </div>
  )
}

export default DonorList;