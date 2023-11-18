import React, { lazy, Suspense } from 'react';
import { Hero, LocationList, Header, Footer, DonorForm, Loading } from './components';
import './App.css';
const LazyDonor = lazy(() => import('./components/Donor'));

function App () {
  return (
    <div>
      <Header />
      <Hero />
      <LocationList />
      <Suspense fallback={<Loading />}>
        <LazyDonor />
      </Suspense>
      <DonorForm />
      <Footer />
    </div>
  )
}


export default App;