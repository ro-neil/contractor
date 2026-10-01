import React from "react";
import ServiceItemCard from "@/pages/services/ServiceItemCard.jsx";

const SearchResults = ({ 
    services, 
    handleRemoveCustomService,
    handleIncrementQuantity,
    handleDecrementQuantity,
    getEstimateJobByDescription, 
    handleAddToEstimate,
    allowCustomServiceUpdate,
    className = "",
}) => {

    return (
        <ul style={{ paddingLeft: "unset" }} className={className}>
            {services.map((service, index) => (
                <li key={index} style={{ listStyleType: "none", marginBottom: "1rem" }}>
                    <ServiceItemCard
                        key={index}
                        service={service}
                        allowCustomServiceUpdate={allowCustomServiceUpdate}
                        handleRemoveCustomService={handleRemoveCustomService}
                        handleIncrementQuantity={handleIncrementQuantity}
                        handleDecrementQuantity={handleDecrementQuantity}
                        handleAddToEstimate={handleAddToEstimate}
                        handleGetEstimateJob={getEstimateJobByDescription}
                    />
                </li>
            ))}
        </ul>
    );
};

export default SearchResults;