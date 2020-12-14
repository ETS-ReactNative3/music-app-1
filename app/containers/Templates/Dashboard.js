import React from 'react';
import TopNavBar from '../../components/TopNavBar';
import LeftSideBar from '../../components/LeftSidebar';
import Footer from '../../components/Footer';

function Dashboard({children}) {
  return (
    <main className="content-wrapper" role="main">
      <TopNavBar/>
      <LeftSideBar/>
      <div className="pt-5">
        {children}
      </div>
      <Footer/>
    </main>
  );
}

export default Dashboard;
