import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import Employee from "./components/Employee";
import Duty from "./components/Duty";
import { NavBar, SideBar as ImportedSideMenu } from "./components";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/Signup";
import AttendanceHistory from "./components/AttendanceHistory";
import AttendanceChart from "./components/AttendanceChart";

function MainLayout() {
  return (
    <div className="w-screen h-screen overflow-x-hidden App">
      <div className="flex flex-1 justify-start items-start bg-[#f5faff]">
        <div className="fixed">
          <ImportedSideMenu />
        </div>
        <div className="flex-1 h-full overflow-x-hidden overflow-y-auto ml-[270px] w-[calc(100%-271px)]">
          <NavBar />
          <div className="content">
            <Routes>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/duty" element={<Duty />} />
              <Route path="/attendance" element={<AttendanceHistory />} />
              <Route path="/attendance-chart" element={<AttendanceChart />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;