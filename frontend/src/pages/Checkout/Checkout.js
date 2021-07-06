import React, {useState} from 'react';
import Stepper from "../../components/Stepper/Stepper";

const stepper = [
    {title: 'Addresses'},
    {title: 'Pay'},
];

const Checkout = () => {
    const [selectedStep, setSelectedStep] = useState(0);
  return (
    <div>
        <Stepper selected={selectedStep} steps={stepper}/>
    </div>
  );
};

export default Checkout;
