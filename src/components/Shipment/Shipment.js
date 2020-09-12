import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = data => {
      console.log(data)
    };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      {/* <input name="example" defaultValue="test" ref={register} /> */}
      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your name is required" />
      {errors.name && <span className="error">Name is required</span>}

      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your email is required" />
      {errors.email && <span className="error">Email is required</span>}

      <input name="address" defaultValue={loggedInUser.address} ref={register({ required: true })} placeholder="Your address is required" />
      {errors.address && <span className="error">Address is required</span>}

      <input name="phone" defaultValue={loggedInUser.phone} ref={register({ required: true })} placeholder="Your phone is required"/>
      {errors.phone && <span className="error">phone Number is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;