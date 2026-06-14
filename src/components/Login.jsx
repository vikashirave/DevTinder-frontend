import React, {useState} from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

function Login() {
  const [emailId, setEmailId] = useState("akshay@gmail.com");
  const [password, setPassword] = useState("Akshay@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async() => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password
      }, {withCredentials: true})
      console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch(err) {
      console.log(err.response?.data);
      setError(err.response?.data || "Login failed. Please try again.");
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card card-border bg-gray-300 w-96">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div>
            <label>
              <div className="label">
                <span className="label-text">Email Id</span>
              </div>
              <input value={emailId} type="text" className="input input-bordered w-full max-w-xs my-2" 
              onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label>
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input value={password} type="text" className="input input-bordered w-full max-w-xs my-2" 
              onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-error">{error}</p>
          <div className="card-actions justify-center">
            <button onClick={handleLogin} className="btn btn-primary">Log In</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login