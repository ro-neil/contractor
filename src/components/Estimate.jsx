
import React, {useState, useEffect} from "react";
import Currency from "./Currency.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setStarted } from './GetStartedSlice';
import { removeJob, updateJobQuantity } from "./EstimateSlice";
import QuantityInput from "./QuantityInput.jsx";
import "./Estimate.css";
import unitMap from "../data/unit_map.json"


const Estimate = ({ table }) => {
    const jobs = useSelector(state => state.estimate.jobs);
    const dispatch = useDispatch();

    dispatch(setStarted(true)); // Ensure userStarted is true when this component mounts

    const handleUpdateQuantity = (description, quantity) => {
        dispatch(updateJobQuantity({ description, quantity }));
    }

    const handleRemoveJob = (description) => {
        dispatch(removeJob(description));
    }

    const handleNumberInputChange = (description, newValue) => {
        handleUpdateQuantity(description, newValue);
    };

    const generateEstimateTable = (jobs) => {
        return (
            <table className="estimate-table">
                <thead>
                    <tr className="table-header">
                        <th className="th-left">Description</th>
                        <th className="th-left">Qty</th>
                        <th className="th-left">Unit</th>
                        <th className="th-left">Unit Price</th>
                        <th className="th-left">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.filter((job) => job.quantity !== 0).map((job, index) => (
                        <tr key={index} className="table-body-row">
                            <td className="td-left">{job.description}</td>
                            <td className="td-center">{job.quantity}</td>
                            <td className="td-left">{job.unit}</td>
                            <td className="td-left">
                                <Currency figure={job.rate.toFixed(2)} />
                            </td>
                            <td className="td-left">
                                <Currency figure={(job.quantity * job.rate).toFixed(2)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {(() => {
                        const subtotal = jobs.reduce((sum, job) => sum + job.quantity * job.rate, 0);
                        const taxAmount = 0;
                        const discount = 0;
                        const grandTotal = subtotal + taxAmount - discount;

                        return (
                            <>
                                <tr className="border-top subtotal-row">
                                    <td colSpan={4} className="td-right">Subtotal</td>
                                    <td className="td-left">
                                        <Currency figure={subtotal.toFixed(2)} />
                                    </td>
                                </tr>
                                <tr className="discount-row">
                                    <td colSpan={4} className="td-right">Discount</td>
                                    <td className="td-left">
                                        <Currency figure={discount.toFixed(2)} />
                                    </td>
                                </tr>
                                <tr className="total-row">
                                    <td colSpan={3}></td>
                                    <td className="td-right">Total (JMD)</td>
                                    <td className="td-left">
                                        <Currency figure={grandTotal.toFixed(2)} />
                                    </td>
                                </tr>
                            </>
                        );
                    })()}
                </tfoot>
            </table>
        )
    }


    return (
        table === true ? generateEstimateTable(jobs) : 
        <div>
            <h2 className="estimate-heading">Estimate</h2>
            <section className="estimate-body">
                {jobs.length > 0 &&
                    <div className="grand-total-container">
                        <span className="grand-total-text colon-end">Grand Total</span>
                        <span className="grand-total-currency text-green">
                            <Currency figure={jobs.reduce((sum, job) => sum + job.quantity * job.rate, 0)} />
                        </span>
                    </div>
                }
                {jobs.length === 0 ? (
                    <h2 className="empty-estimate-text">No jobs added</h2>
                ) : (
                    
                    jobs.map((job, index) => (
                        <div key={index} className="job-item">                    
                            <div className="job-item-header">
                                <span className="job-description">{job.description}</span>
                                <button 
                                    className="job-remove-button"
                                    title="Remove from Estimate"
                                    onClick={() => handleRemoveJob(job.description)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red">
                                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                    </svg>
                                </button>     
                            </div>
                            <div className="job-item-body">
                                <div className="job-quantity-selector">
                                    <QuantityInput 
                                        id={`job_quantity_${index}`} 
                                        name={`job_quantity_${index}`} 
                                        value={job.quantity} 
                                        placeholder={"Qty"}
                                        onChange={(e) => handleUpdateQuantity(job.description, e)}
                                        onMinus={() => handleUpdateQuantity(job.description, Number.parseInt(job.quantity) - 1)}
                                        onPlus={() => handleUpdateQuantity(job.description, Number.parseInt(job.quantity) + 1)}
                                    />
                                </div>
                                
                                <div className="job-rate-container">
                                    <span className="at-symbol">&#64;</span>
                                    <div className="job-rate">
                                        <Currency figure={job.rate} />
                                        <span className="forward-slash">&#47;</span> 
                                        <span className="short-unit job-unit overflow-ellipsis">{unitMap[job.unit]}</span>
                                        <span className="long-unit job-unit overflow-ellipsis" style={{ display: "none" }}>{job.unit}</span>
                                    </div>
                                </div>
                            </div>                    
                            <div className="job-item-footer job-subtotal">
                                <span className="job-subtotal-text colon-end">Subtotal</span> 
                                <Currency figure={job.quantity * job.rate} />                            
                            </div>
                        </div>
                    ))
                )}
            </section>
        </div>
    );
};

export default Estimate;