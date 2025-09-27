import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addJob, updateJobQuantity } from "@/data/EstimateSlice.js";
import Currency from "@/components/utils/Currency.jsx";
import QuantityInput from "@/components/utils/QuantityInput.jsx";
import SearchInput from "@/components/utils/SearchInput.jsx";
import contractorServicesData from "@/data/contractor-services.json";
import unitMap from "@/data/service-unit-map.json";
import "./Services.css";

const ServicesList = () => {
    const [services, setServices] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const estimateJobs = useSelector(state => state.estimate.jobs);
    const dispatch = useDispatch();

    // DataPipeline-ready dataSource (returns the local JSON)
    const dataSource = contractorServicesData;

    useEffect(() => {
        // Immediately prepare the sorted data (same behavior as before)
        const categories = [...new Set(dataSource.map(service => service.category))].sort((a, b) => a.localeCompare(b));
        const sortedData = categories.map(category => [
            category,
            dataSource
                .filter(service => service.category === category)
                .sort((a, b) => a.description.localeCompare(b.description))
        ]);
        setServices(sortedData);
        setLoading(false);
    }, [contractorServicesData]);


    const filteredServices = services
        .flatMap(([, items]) => items)
        .filter(service =>
            (service.description ?? "").toLowerCase().includes((search ?? "").toLowerCase())
        );

    const handleAddToEstimate = (service) => {
        const job = { ...service, quantity: 1 };
        dispatch(addJob(job));
    };

    const locateJobOnEstimate = (service) => {
        const job = estimateJobs.find((item) => item.description === service.description);
        return job;
    };


    const ServiceActions = ({ service, locateJobOnEstimate, handleAddToEstimate }) => {

        const [localQuantity, setLocalQuantity] = useState(locateJobOnEstimate(service)?.quantity || 1);
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

        // Handle blur (when user finishes typing)
        const handleBlur = () => {
            dispatch(updateJobQuantity({ description: service.description, quantity: localQuantity }));
        };

        // Increment/Decrement the quantity
        const handleQuantityUpdate = (change) => {
            setLocalQuantity((prevQuantity) => {
                const newQuantity = prevQuantity + change; // Calculate the updated quantity
                dispatch(updateJobQuantity({ description: service.description, quantity: newQuantity }));
                if (newQuantity <= 0) {
                    return 1;
                }
                return newQuantity; // Return the updated value to setState
            });
        };

        return (
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
                    <span className="service-rate"><Currency figure={service.rate} /></span>
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
                    {locateJobOnEstimate(service)
                        ? (
                            <div className="job-on-estimate">
                                <span className="job-added-text">Added to Estimate</span>
                                
                                <div className="service-quantity-selector">
                                    <QuantityInput
                                        id={`service_quantity_${service.description}`}
                                        name={`service_quantity_${service.description}`}
                                        value={localQuantity}
                                        placeholder="Qty"
                                        onChange={(e) => handleInputChange(e)}
                                        onBlur={handleBlur} // Update the Redux store when input loses focus
                                        onMinus={() => handleQuantityUpdate(-1)}
                                        onPlus={() => handleQuantityUpdate(1)}
                                    />
                                </div>
                            </div>
                        )
                        : (
                            <div style={{ display: "flex" }}>
                                <button
                                    className="button"
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
    }

    const SearchResultsText = ({ count, search }) => (
        search && <div className="search-results-text">
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
        <div className="services-component">
            <h2 className="services-heading">Services</h2>
            <div className="flex justify-center controls">
                <SearchInput id="servicesSearchInput" value={search} onChange={setSearch}/> 
            </div>

            <SearchResultsText count={filteredServices.length} search={search} />

            {loading && <p className="loading-text">Loading services...</p>}

            <section className="services-section">
                {!search ? (
                    services.map(([category, items], idx) => (
                        <div className="services-container" key={idx}>
                            <h2 className="services-category">{category}</h2>
                            <ul className="services-list">
                                {items.map((service, index) => (
                                    <li key={index} className="service-item" style={{ backgroundColor: locateJobOnEstimate(service) ? "#f7f9ff" : "" }}>
                                        <span className="service-description">{service.description}</span>
                                        <ServiceActions
                                            service={service}
                                            locateJobOnEstimate={locateJobOnEstimate}
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
                                <span className="service-description">{service.description}</span>
                                <ServiceActions
                                    service={service}
                                    locateJobOnEstimate={locateJobOnEstimate}
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
