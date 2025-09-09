import React, { use, useEffect, useState } from "react";
import Estimate from "./Estimate.jsx";
import Currency from "./Currency.jsx";
import { useSelector, useDispatch } from "react-redux";
import { addJob } from "./EstimateSlice";
import contractorServicesData from "../data/contractor_services.json";
import unitMap from "../data/unit_map.json"
import DataPipeline from "./DataPipeline.jsx";

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
                // .map(service => ({
                //     ...service,
                //     unit: convertLongUnit(service.unit)
                // }))
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
                // alignItems: "center",
                gap: "1rem",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#2d3748",
                    // borderRight: "1px solid #e2e8f0",
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
                    <span style={styles.unit}>{service.unit}</span>
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
                            {/* <button
                                className="center-box"
                                title="Add to Estimate"
                                onClick={() => handleAddToEstimate(service)}
                            >
                                Add to Estimate
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#38393aff">
                                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h360v80H200v560h560v-360h80v360q0 33-23.5 56.5T760-120H200Zm120-160v-80h320v80H320Zm0-120v-80h320v80H320Zm0-120v-80h320v80H320Zm360-80v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"/>
                                </svg>  
                            </button> */}
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
    

    const styles = {
        container: {
            // padding: "1rem",
            borderRadius: "1rem",
            maxWidth: "972px",
            margin: "auto",
            // minHeight: "90vh"
        },
        heading: {
            color: '#2d3e50',
            fontSize: '2rem',
            fontWeight: '700',
            textAlign: 'center',
        },
        list: {
            listStyle: "none",
            paddingLeft: "0.75rem",
            margin: 0,
            borderLeft: "1px solid #e2e8f0",
        },
        item: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "0.5rem",
            // alignItems: "start",
            background: "#fff",
            borderRadius: "0.75rem",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            padding: "0.5rem 1rem",
            marginBottom: "0.75rem",
            border: "1px solid #e5e7eb"
        },
        description: {
            fontWeight: "600",
            color: "#2d3748",
            textAlign: "start",
            // marginRight: "3ch"
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
        },
    };

    // if (loading) return <h2>Loading services...</h2>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div>
            <h2 style={styles.heading}>Contract Services</h2>

            <SearchResultsText count={filteredServices.length} search={search} />

            {loading && <p style={{ textAlign: "center", color: "#718096" }}>Loading services...</p>}
            

            <section style={{ ...styles.container }}>     
                { !search ? (
                    services.map(([category, items], idx) => (
                        <div key={idx} style={{ marginBottom: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", background: "#f9fafb", padding: "1rem" }}>
                            <h2 style={{ color: "#2d3748", fontSize: "1.3rem", marginBottom: "0.5rem", marginTop: "0", textAlign: "start" }}>{category}</h2>
                            <ul style={styles.list}>
                                {items.map((service, index) => (
                                    <li key={index} style={{ ...styles.item, backgroundColor: isAddedToEstimate(service) ? "#f7f9ff" : "" }}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                            <span style={styles.description}>{service.description}</span>
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
                            <li key={index} style={styles.item}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <span style={styles.description}>{service.description}</span>
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
