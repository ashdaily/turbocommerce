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
                <form >
                    <div id="test-l-1" className="content">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter email"
                            />
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => this.stepper.next()}>
                            Next
                        </button>
                    </div>
                    <div id="test-l-2" className="content">
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                            />
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => this.stepper.next()}>
                            Next
                        </button>
                    </div>
                    <div id="test-l-3" className="content text-center">
                        <button type="submit" className="btn btn-primary mt-5">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Stepper;
