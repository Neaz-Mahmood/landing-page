
import { DonorList, Hero, Navbar } from './components';
import './App.css';
import { useState, createContext } from 'react';
import { rowData } from './donorsData';

export const DonorContext = createContext([]);

function App() {
  const [value, setValue] = useState({
    Alldata: rowData,
    id: '',
    name: '',
    phone: '',
    blood: '',
    updateEdit: []
  });

  const getRecord = (id) => {
    const donor = value.Alldata.find(d => d.id === id);
    return donor;
  }

  const onEdit = (id) => {
    const tempData = value.Alldata;
    const index = tempData.indexOf(getRecord(id));
    const selectedDonor = tempData[index];
    setValue({
      ...value,
      id: selectedDonor['id'],
      name: selectedDonor['name'],
      phone: selectedDonor['phone'],
      blood: selectedDonor['blood']
    })
  }

  const updateValue = (e, test) => {
    if (test === "name") {
      value.name = e.target.value;
    }
    if (test === "phone") {
      value.phone = e.target.value;
    }
    if (test === "blood") {
      value.blood = e.target.value;
    }
    const tempArr = [value.id, value.name, value.phone, value.blood];
    setValue({
      ...value,
      updateEdit: tempArr
    })
  }

  const onSave = (id) => {
    if(id!=='')  {
      const SavedDonor = value.Alldata;
      const index = SavedDonor.indexOf(getRecord(id));
      const donor = SavedDonor[index]; 
      donor['name'] = value.updateEdit[1];
      donor['phone'] = value.updateEdit[2];
      donor['blood'] = value.updateEdit[3];
      setValue({
        Alldata: [...value.Alldata, donor],
        id: '',
      name: '',
      phone: '',
      blood: '',
      updateEdit: []
      })
    } else {
      const MaxId = Math.max(value.Alldata.map(donor => donor.id));
      const id = MaxId + 1;
      const newDonor = { id: id } ;
      newDonor['name'] = value.updateEdit[1];
      newDonor['phone'] = value.updateEdit[2];
      newDonor['blood'] = value.updateEdit[3];
      setValue({
        Alldata: [...value.Alldata, newDonor],
        id: '',
      name: '',
      phone: '',
      blood: '',
      updateEdit: []
      });
    }
  }

  const onDelete = (id) => {
    const tempDonor = value.Alldata.filter(donor => donor.id !== id);
    setValue({
      ...value,
      Alldata: tempDonor
    })
  }


  return (
    <DonorContext.Provider value={{ value, onEdit, onSave, updateValue, onDelete}} >
      <Navbar />
      <Hero />
      <DonorList />
    </ DonorContext.Provider>
  )
}

export default App;
