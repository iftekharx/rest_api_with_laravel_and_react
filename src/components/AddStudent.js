import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddStudent() {
  const [formValue, setFormValue] = useState({
    name: '',
    course: '',
    email: '',
    phone: '',
  })
  const [message, setMessage] = useState()
  const navigate = useNavigate()
  const handleInput = (e) => {
    const { name, value } = e.target
    setFormValue({ ...formValue, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const allInputvalue = {
      name: formValue.name,
      course: formValue.course,
      email: formValue.email,
      phone: formValue.phone,
    }

    let res = await fetch('http://127.0.0.1:8000/api/students', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(allInputvalue),
    })
    let resjson = await res.json()
    if (res.status === 200) {
      setMessage(resjson.success)
      setTimeout(() => {
        navigate('/studentData')
      }, 2000)
    } else {
      setMessage('Some Error Occured')
    }

    //console.log(allInputvalue);
  }
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h5 className="mt-2">Add New Student</h5>
            <p className="text-success"> {message} </p>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-lable">Name: </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formValue.name}
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
                      value={formValue.course}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-lable">Email</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      value={formValue.email}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-lable">Phone No</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      value={formValue.phone}
                      onChange={handleInput}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-lable"></label>
                    <button type="submit" className="btn btn-success btn-lg">
                      Add
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

export default AddStudent
