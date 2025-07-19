import EmployeeCom from "./components/EmployeeCom";
import HeaderComp from "./components/HeaderComp"
import ListEmployeeComp from "./components/ListEmployeeComp"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewComp from "./components/ViewComp";
import AuthForm from "./components/AuthForm";

function App() {

  return (
    <>
           <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthForm></AuthForm>} />
        <Route path="/home" element={<ListEmployeeComp />} />
        <Route path="/employees" element={<ListEmployeeComp />} />
        <Route path="/add-employee" element={<EmployeeCom/>} />
        <Route path="/update-employee/:id" element={<EmployeeCom/>} />
        <Route path="/view-employee/:id" element={<ViewComp/>} />
            {/* <HeaderComp/> */}
    </Routes>
    </BrowserRouter>
      {/* <ListEmployeeComp /> */}
    </>
  )
}

export default App
