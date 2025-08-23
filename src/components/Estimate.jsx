
import React, {useState, useEffect, use} from "react";
import Currency from "./Currency.jsx";
import { useSelector, useDispatch } from "react-redux";
import { removeJob, updateJobQuantity } from "./EstimateSlice";
import NumberInput from "./NumberInput.jsx";


const Estimate = () => {
    const jobs = useSelector(state => state.estimate.jobs);
    const dispatch = useDispatch();

    const handleUpdateQuantity = (description, quantity) => {
        dispatch(updateJobQuantity({ description, quantity }));
    }

    const handleRemoveJob = (description) => {
        dispatch(removeJob(description));
    }

    const handleNumberInputChange = (description, newValue) => {
        handleUpdateQuantity(description, newValue);
    };

    const styles = {
        container: {
            padding: "1rem 2rem",
            background: "#f9fafb",
            borderRadius: "1rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            maxWidth: "972px",
            margin: "auto",
            minHeight: "90vh"
        },
        heading: {
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            color: "#2d3748"
        },
        item: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#fff",
            borderRadius: "0.75rem",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            padding: "1rem",
            marginBottom: "0.75rem",
            border: "1px solid #e2e8f0"
        },
        description: {
            fontWeight: "600",
            color: "#2d3748",
            // minWidth: "40ch",
            textAlign: "start",
        },
        details: {
            color: "#718096"
        },
        unit: {
            border: "1px solid #eeeee5ff",
            borderRadius: "0.375rem",
            padding: "0.25rem 0.5rem",
            fontSize: "0.875rem",
            fontWeight: "bold",
            background: "#d9e4efff",
            color: "#3a3d2cff",
        }
    };

    return (
        <div>
            <h2 style={styles.heading}>Estimate</h2>
            <section style={styles.container}>
                {jobs.length > 0 &&
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "0.5rem" }}>
                        <span style={{ fontWeight: "bold", fontSize: "1.25rem", marginRight: "1rem", color: "#2d3748" }}>Grand Total:</span>
                        <span style={{ fontWeight: "bold", fontSize: "1.75rem", color: "#2563eb", minWidth: "12ch", textAlign: "end" }}>
                            <Currency fontSize="1.5rem" figure={jobs.reduce((sum, job) => sum + job.quantity * job.rate, 0)} />
                        </span>
                    </div>
                }
                {jobs.length === 0 ? (
                    <h2 style={{ color: "#718096", fontWeight: "bold" }}>No jobs added</h2>
                ) : (
                    jobs.map((job, index) => (
                        <div key={index} style={styles.item}>
                            <span style={styles.description}>{job.description}</span>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem"}}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "end", gap: "0.5rem", color: "#2d3748" }}>
                                    <Currency figure={job.rate} /> /
                                    <span style={styles.unit}>{job.unit}</span>
                                </div>
                                <NumberInput id={`job_quantity_${index}`} name={`job_quantity_${index}`} value={job.quantity} onChange={(e) => handleUpdateQuantity(job.description, e)}/>
                                <span style={{ fontWeight: "500" }}>Subtotal:</span> 
                                <span className="subtotal" style={{ minWidth: '16ch', textAlign: 'end', borderLeft: "1px solid #e2e8f0", borderRight: "1px solid #e2e8f0", paddingRight: "0.5rem" }} >
                                    <Currency figure={job.quantity * job.rate} />
                                </span>
                                <div>
                                    <button 
                                        className="center-box"
                                        title="Remove from Estimate"
                                        onClick={() => handleRemoveJob(job.description)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red">
                                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </section>
        </div>
    );
};

export default Estimate;