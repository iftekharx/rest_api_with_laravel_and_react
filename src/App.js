import './App.css'
import { Routes, Route } from 'react-router-dom'
import StudentCard from './components/StudentCard'
import EditStudent from './components/EditStudent'
import AddStudent from './components/AddStudent'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/studentData" element={<StudentCard />} />
        <Route path="/addStudent" element={<AddStudent />} />
        <Route path="/editStudent/:id" element={<EditStudent />} />
      </Routes>
    </div>
  )
}

export default App
