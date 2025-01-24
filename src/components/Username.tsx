import React, { useState } from "react";
import { SubmitUsername } from "../api/user";
import { useNavigate } from "react-router-dom";

const UsernameForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
 const [error, setError] = useState<string>("");
 const [message, setMessage] = useState<string>("");
    const navigate=useNavigate();

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    const response = await SubmitUsername(username);
    if(response.status==200){
        navigate("/domain");
    }else if(response.status==201){
        setMessage(`${username} aldready taken. Try again`);
    }
    setUsername(""); 
  };

  return (
    <div className="h-screen flex justify-center items-center text-white flex-col">
      <h1>Submit Your Username</h1>
      {message && <h1>{message}</h1>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          className="text-black"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="submit"
          className=""
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UsernameForm;
