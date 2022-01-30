import { useState, useRef } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() !== "";
const isNotElevenChars = (value) => value.trim().length === 11;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    houseNumber: true,
    address: true,
    phone: true,
  });

  const nameInputRef = useRef();
  const houseNumberInputRef = useRef();
  const addressInputRef = useRef();
  const phoneInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredHouseNumber = houseNumberInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;

    const enteredNameIsValid = isEmpty(enteredName);
    const enteredHouseNumberIsValid = isEmpty(enteredHouseNumber);
    const enteredAddressIsValid = isEmpty(enteredAddress);
    const enteredPhoneIsValid = isNotElevenChars(enteredPhone);

    setFormInputsValidity({
      name: enteredNameIsValid,
      houseNumber: enteredHouseNumberIsValid,
      address: enteredAddressIsValid,
      phone: enteredPhoneIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredHouseNumberIsValid &&
      enteredAddressIsValid &&
      enteredPhoneIsValid;

    if (!formIsValid) {
      return;
    }

    // * Submit Data
    props.onConfirm({
      name: enteredName,
      houseNumber: enteredHouseNumber,
      address: enteredAddress,
      phoneNumber: enteredPhone,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const houseNumberControlClasses = `${classes.control} ${
    formInputsValidity.houseNumber ? "" : classes.invalid
  }`;
  const addressControlClasses = `${classes.control} ${
    formInputsValidity.address ? "" : classes.invalid
  }`;
  const phoneControlClasses = `${classes.control} ${
    formInputsValidity.phone ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" placeholder="M Talal" />
        {!formInputsValidity.name && <p>Please Enter a valid name</p>}
      </div>
      <div className={houseNumberControlClasses}>
        <label htmlFor="houseNumber">House / Flat #</label>
        <input
          ref={houseNumberInputRef}
          type="text"
          id="houseNumber"
          placeholder="450"
        />
        {!formInputsValidity.houseNumber && (
          <p>Please Enter a valid House or Flat Number</p>
        )}
      </div>
      <div className={addressControlClasses}>
        <label htmlFor="address">Address</label>
        <input
          ref={addressInputRef}
          type="text"
          id="address"
          placeholder="House 596, St.12, Sector I-10/4, Islamabad, PK"
        />
        {!formInputsValidity.address && <p>Please Enter a valid Address</p>}
      </div>
      <div className={phoneControlClasses}>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          ref={phoneInputRef}
          type="tel"
          id="phoneNumber"
          placeholder="03000812222"
        />
        {!formInputsValidity.phone && (
          <p>Please Enter a valid Phone Number - 11 digits</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
