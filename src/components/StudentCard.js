import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function StudentCard() {
  const [studentsData, setStudentData] = useState([])
  useEffect(() => {
    const getStudentsData = async () => {
      const reqData = await fetch('http://127.0.0.1:8000/api/students')
      const resData = await reqData.json()
      setStudentData(resData['students'])
    }
    getStudentsData()
  }, [])

  const DeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      fetch('http://127.0.0.1:8000/api/students/' + id + '/delete', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
      })
        .then(() => {
          window.location.reload()
        })
        .catch((err) => {
          alert(err.message)
        })
    }
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h5 className="mt-2">Student Data</h5>
            <div className="d-grid d-md-flex justify-content-md-end mb-3">
              <Link to="/addStudent" className="btn btn-warning">
                Add New User
              </Link>
            </div>
            <div className="container">
              <div className="row"></div>
              {studentsData.map((student, index) => (
                <div key={index} className="card">
                  <div className="card-body">
                    <h3>ID: {student.id}</h3>
                    <h5 className="card-title">{student.name}</h5>
                    <p className="card-text">{student.course}</p>
                    <p className="card-text">{student.email}</p>
                    <p className="card-text">{student.phone}</p>
                    <Link
                      to={'/editStudent/' + student.id}
                      className="btn btn-success mx-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        DeleteStudent(student.id)
                      }}
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default StudentCard
