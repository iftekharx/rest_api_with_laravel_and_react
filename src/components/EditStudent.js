import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function EditStudent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [editStudent, setEditStudent] = useState({
    name: '',
    course: '',
    email: '',
    phone: '',
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    const getStudent = async () => {
      const reqData = await fetch(`http://127.0.0.1:8000/api/students/${id}/`)
      const resData = await reqData.json()
      setEditStudent(resData['student'])
    }
    getStudent()
  }, [id])

  const handleInput = (e) => {
    setEditStudent({ ...editStudent, [e.target.name]: e.target.value })
  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    const editInputvalue = {
      name: editStudent.name,
      course: editStudent.course,
      email: editStudent.email,
      phone: editStudent.phone,
    }

    let res = await fetch(
      'http://127.0.0.1:8000/api/students/' + id + '/update',
      {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(editInputvalue),
      }
    )

    let resjson = await res.json()
    if (res.status === 200) {
      setMessage(resjson.success)
      setTimeout(() => {
        navigate('/studentData')
      }, 2000)
    } else {
      setMessage('Some error Occured')
    }
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h5 className="mt-2">Edit Student {id}</h5>
            <p className="text-success"> {message} </p>
            <form onSubmit={handleUpdate}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-lable">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={editStudent.name}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-lable">Course</label>
                    <input
                      type="text"
                      name="course"
                      className="form-control"
                      value={editStudent.course}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-lable">Email: </label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      value={editStudent.email}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-lable">Phone: </label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      value={editStudent.phone}
                      onChange={handleInput}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-lable"></label>
                    <button name="submit" className="btn btn-success btn-lg">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default EditStudent
