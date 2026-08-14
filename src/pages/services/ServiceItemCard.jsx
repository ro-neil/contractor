import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { usePages } from '@/routing/router.jsx';
import IncrementDecrementInput from "@/components/utils/IncrementDecrementInput.jsx";
import Currency from "@/components/utils/Currency.jsx";
import { useDispatch } from "react-redux";
import { updateJobQuantity } from "@/data/EstimateSlice.js";

const ServiceItemCard = ({ 
        service,
        handleRemoveCustomService,
        handleIncrementQuantity,
        handleDecrementQuantity,
        handleAddToEstimate,
        handleGetEstimateJob,
    }) => {

    
    const [estimateJob, setEstimateJob] = useState(handleGetEstimateJob(service.description));
    const [localQuantity, setLocalQuantity] = useState(estimateJob?.quantity || 1); // Default to 1 if not present
    const pages = usePages();
    const dispatch = useDispatch();

    // Handle input change locally
    const handleInputChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        if (value >= 0) {
            setLocalQuantity(value); // Update local state
        } else {
            setLocalQuantity(1)
        }
    };

    const handleUpdateJobQuantity = (service, quantity) => {
        dispatch(updateJobQuantity({ description: service.description, quantity }));
    }

    return (
        <div className={estimateJob ? "service-item selected" : "service-item"}>
            <div className="job-item-header">
                <span title="Service Description" className="service-description">{service.description}</span>
                {service.isCustom &&
                    (<div className="flex">
                        <Link to={pages.editService.replace(':id', service.id)}>
                            <button
                                className="job-edit-button icon-button shake-transformation"
                                title="Update custom service"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
                            </button>
                        </Link>
                        <button
                            className="job-remove-button icon-button text-red shake-transformation"
                            title="Remove custom Service"
                            onClick={() => handleRemoveCustomService(service.id)}
                        >
                            <svg className="icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                            </svg>
                        </button>
                    </div>)}

            </div>
            <div className="" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-dark)", paddingRight: "0.5rem" }}>
                    <span title="Unit Price" className="service-rate">
                        <Currency figure={service.rate} />
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-dark)" }}>
                        <span className="forward-slash">/</span>
                        <span title="Service Unit" className="service-unit">{service.unit}</span>
                    </div>
                </div>
                <div className="service-item-controls">
                    
                    {estimateJob
                        ? (
                            <div className="job-on-estimate">
                                <span className="job-added-text">Added to Estimate</span>
                                <IncrementDecrementInput
                                    id={`service_quantity_${service.description}`}
                                    name={`service_quantity_${service.description}`}
                                    value={localQuantity}
                                    placeholder="Qty"
                                    onChange={(e) => handleInputChange(e)}
                                    onBlur={handleUpdateJobQuantity.bind(null, service, localQuantity)} // Update the Redux store when input loses focus
                                    onMinus={() => setLocalQuantity(handleDecrementQuantity(service))}
                                    onPlus={() => setLocalQuantity(handleIncrementQuantity(service)) }
                                    incrementTitle="Increase Quantity"
                                    decrementTitle="Decrease Quantity"
                                />
                            </div>
                        )
                        : (
                            <div style={{ display: "flex" }}>
                                <button
                                    className="button"
                                    title="Add Service to Estimate"
                                    onClick={() => setEstimateJob(handleAddToEstimate(service))}
                                >
                                    Add to Estimate
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
};

export default ServiceItemCard;