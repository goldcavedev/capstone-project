import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import '../style/register.css';
import { Toast } from "../utilities/notification/toast";
import { Toaster } from 'react-hot-toast';

const RegisterForm = () => {
  const formDataInitialValue = {
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  };

  const [formData, setFormData] = useState(formDataInitialValue);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let myToast;
    setIsLoading(true);

    // Verifica se la password è più lunga di 8 caratteri
    if (formData.password.length < 8) {
      myToast = new Toast('Your password must be at least 8 characters long');
      myToast.notifyError();
      setIsLoading(false);
      return;
    }    

    // Verifica se le password corrispondono
    if (formData.password !== formData.confirmPassword) {
      myToast = new Toast('Your passwords don\'t match, try again!');
      myToast.notifyError();
      setIsLoading(false);
      return;
    }

    try {
      const data = await fetch('http://localhost:5020/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const response = await data.json();
      if (data.status === 201) {
        setIsLoading(false);
        myToast = new Toast("Operation successfully completed");
        myToast.notifyMessage();
        setFormData(formDataInitialValue);
      } else {
        const errorMessage = `statusCode: ${data.status}, message: ${response.message}`;
        myToast = new Toast(errorMessage);
        myToast.notifyError();
      }
      setIsLoading(false);
    } catch (error) {
      myToast = new Toast(error.toString());
      myToast.notifyError();
    }
  }

  return (
    <div className="signin-form-container">
      <Toaster position="top-center" reverseOrder={false} />
      <form className="signin-form">
        <h2>Sign-Up!</h2>
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        /><br />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        /><br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        /><br />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        /><br />
        <Button onClick={handleSubmit}>Sign up</Button>
        <br />
        <a href="/login">Are you already signed-up?</a>
      </form>
    </div>
  );

}

export default RegisterForm;
