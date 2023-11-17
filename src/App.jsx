import React from 'react'
import { Hero, LocationList, Header, Footer, Donor, DonorForm } from './components';
import './App.css';

function App () {
  return (
    <div>
      <Header />
      <Hero />
      <LocationList />
      <Donor />
      <DonorForm />
      <Footer />
    </div>
  )
}


export default App;