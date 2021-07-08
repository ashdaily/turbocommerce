import React from 'react';
import './Style.scss';

const Stepper = ({steps, selected}) => {
    return (
        <div id="stepper1" className="bs-stepper">
            <div className="bs-stepper-header">
                {steps.map((val,index) => {
                  const temp = [(
                      <div className={'step' + (index === selected ? ' active' : '')} data-target="#test-l-1">
                          <button className="step-trigger">
                              <span className="bs-stepper-circle">{index + 1}</span>
                              <span className="bs-stepper-label">{val.title}</span>
                          </button>
                      </div>
                  )];
                  if (steps.length > index+1) {
                      temp.push((<div className="line" />));
                  }
                  return temp;
                })}
            </div>
            <div className="bs-stepper-content">

            </div>
        </div>
    )
};

export default Stepper;
