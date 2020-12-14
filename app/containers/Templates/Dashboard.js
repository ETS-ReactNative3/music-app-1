import React from 'react';
import TopNavBar from '../../components/TopNavBar';
import LeftSideBar from '../../components/LeftSidebar';
import Footer from '../../components/Footer';

function Dashboard({ children }) {
  return (
    <div>
      <TopNavBar />
      <LeftSideBar />
      {children}
      <Footer />
    </div>
  );
}

export default Dashboard;
