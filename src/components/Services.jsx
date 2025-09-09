import React, { use, useEffect, useState } from "react";
import Currency from "./Currency.jsx";
import { useSelector, useDispatch } from "react-redux";
import { addJob } from "./EstimateSlice";
import contractorServicesData from "../data/contractor_services.json";
import unitMap from "../data/unit_map.json"
import "./Services.css";

const ServicesList = ({ search }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const estimateJobs = useSelector(state => state.estimate.jobs);
    const dispatch = useDispatch();

    // DataPipeline-ready dataSource (returns the local JSON)
    const dataSource = contractorServicesData;


    useEffect(() => {
        // Immediately prepare the sorted data (same behavior as before)
        const categories = [...new Set(dataSource.map(service => service.category))].sort((a, b) => a.localeCompare(b));
        console.log("Categories created:", categories)
        const sortedData = categories.map(category => [
            category,
            dataSource
                .filter(service => service.category === category)
                .sort((a, b) => a.description.localeCompare(b.description))
        ]);
        console.log("Data sorted:", sortedData)
        setServices(sortedData); 
        console.log("Services set:", services)  
        setLoading(false);
    }, [contractorServicesData]);


    const filteredServices = services.flatMap(([category, items]) => 
        items).filter(service =>
        service.description?.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddToEstimate = (service) => {
        const job = { ...service, quantity: 1 };
        dispatch(addJob(job));
    };

    const isAddedToEstimate = (service) => {
        return estimateJobs.some((item) => item.description === service.description);
    };

    const ServiceActions = ({ service, isAddedToEstimate, handleAddToEstimate }) => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#2d3748",
                    paddingRight: "0.5rem",
                }}
            >
                <Currency figure={service.rate} />
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#2d3748",
                    }}
                >
                    <span style={{ fontWeight: "500", color: "gray" }}>/</span>
                    <span className="service-unit">{service.unit}</span>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", borderTop: "1px solid #efefef", width: "100%", paddingTop: "1rem", paddingBottom: "0.5rem" }}>
                {isAddedToEstimate(service) 
                    ? (<button disabled style={{ color: "red", fontWeight: "bold" }} className="">Added to Estimate</button>)
                    : (
                        <div style={{ display: "flex"}}>
                            <button
                                className="button bg-dark border-light text-light"
                                title="Add to Estimate"
                                onClick={() => handleAddToEstimate(service)}
                            >
                                Add to Estimate
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    );

    const SearchResultsText = ({ count, search }) => (
        search && <div style={{ textAlign: "center", marginBottom: "1rem", color: "#373c43ff", fontStyle: "italic", fontWeight: '500' }}>
            {count > 0
                ? `Showing ${count} result${count > 1 ? "s" : ""} for "${search}"`
                : `No results found for "${search}"`}
        </div>
    );

    /**
     * Converts a long-form unit into its short-form equivalent.
     * 
     * @param {string} longUnit - The unit in long form (e.g., "square yard").
     * @returns {string} - The short form of the unit (e.g., "yd²").
     */
    const convertLongUnit = (longUnit) => {
        return unitMap[longUnit] || longUnit; // falls back to original if not found
    }
    

    // if (loading) return <h2>Loading services...</h2>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div>
            <h2 className="services-heading">Contract Services</h2>

            <SearchResultsText count={filteredServices.length} search={search} />

            {loading && <p style={{ textAlign: "center", color: "#718096" }}>Loading services...</p>}
            
            <section className="services-container">     
                { !search ? (
                    services.map(([category, items], idx) => (
                        <div key={idx} style={{ marginBottom: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", background: "#f9fafb", padding: "1rem" }}>
                            <h2 style={{ color: "#2d3748", fontSize: "1.3rem", marginBottom: "0.5rem", marginTop: "0", textAlign: "start" }}>{category}</h2>
                            <ul className="services-list">
                                {items.map((service, index) => (
                                    <li key={index} className="service-item" style={{ backgroundColor: isAddedToEstimate(service) ? "#f7f9ff" : "" }}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                            <span className="service-description">{service.description}</span>
                                        </div>
                                        <ServiceActions
                                            service={service}
                                            isAddedToEstimate={isAddedToEstimate}
                                            handleAddToEstimate={handleAddToEstimate}
                                        />                              
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <ul style={{ paddingLeft: "unset" }}>
                        {filteredServices.map((service, index) => (
                            <li key={index} className="service-item">
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <span className="service-description">{service.description}</span>
                                </div>
                                <ServiceActions
                                    service={service}
                                    isAddedToEstimate={isAddedToEstimate}
                                    handleAddToEstimate={handleAddToEstimate}
                                />                        
                            </li>
                        ))}
                    </ul>
                )}
            </section>
            <p style={{ color: "#718096", fontSize: "0.875rem", marginTop: "1rem" }}>
                Note: Rates are in JMD and may vary based on contract terms.
            </p>
        </div>
    );
};

export default ServicesList; 
