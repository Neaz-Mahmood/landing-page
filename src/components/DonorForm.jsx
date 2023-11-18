import React from 'react';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <div className='container p-[40%]' id='donorForm'>
        <form>
        <MDBInput className='mb-4' type='text' id='form1Example1' label='Name' />
        <MDBInput className='mb-4' type='text' id='form1Example2' label='Phone' />
        <MDBInput className='mb-4' type='text' id='form1Example2' label='Blood Type' />
        <MDBBtn type='submit' block>
            Become a Donor
        </MDBBtn>
        </form>
    </div>
    
  );
}