
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


  return (
    <DonorContext.Provider value={{ value, onEdit}} >
      <Navbar />
      <Hero />
      <DonorList />
    </ DonorContext.Provider>
  )
}

export default App;
