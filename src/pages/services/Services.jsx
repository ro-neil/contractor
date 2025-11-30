import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { usePages } from '@/routing/router.jsx';
import { addJob, updateJobQuantity } from "@/data/EstimateSlice.js";
import Currency from "@/components/utils/Currency.jsx";
import IncrementDecrementInput from "@/components/utils/IncrementDecrementInput.jsx";
import SearchInput from "@/components/utils/SearchInput.jsx";
import { useFetchServices, useDeleteService } from "@/hooks/custom-services.jsx";
import useSystemServices from "@/hooks/system-services.jsx";
import "./Services.css";

const ServicesList = () => {
    const [services, setServices] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const pages = usePages();
    const userServices = useFetchServices();
    const systemServices = useSystemServices();
    const estimateJobs = useSelector(state => state.estimate.jobs);
    const dispatch = useDispatch();

    useEffect(() => {
        // Assign IDs to custom services if not present
        const dataSource = [...systemServices, ...userServices].map((service, idx) => ({
            ...service,
            id: service.id ?? `${service.category}_${service.description}_${idx+1}`.replaceAll(' ', '_')
        }));
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
    }, []);


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

    const handleRemoveService = (id) => {
        const serviceToRemove = userServices.find(s => s.id === id);
        if (!serviceToRemove) return;
        if (window.confirm(`Are you sure you want to remove the service: "${serviceToRemove.description}"? This action cannot be undone.`)) {
            try {
                useDeleteService(id);
                alert(`Service "${serviceToRemove.description}" removed successfully.`);
                // Refresh services list
                const updatedServices = useFetchServices();
                const systemServices = useSystemServices();
                const categories = [...new Set([...systemServices, ...updatedServices].map(service => service.category))].sort((a, b) => a.localeCompare(b));
                const sortedData = categories.map(category => [
                    category,
                    [...systemServices, ...updatedServices]
                        .filter(service => service.category === category)
                        .sort((a, b) => a.description.localeCompare(b.description))
                ]);
                setServices(sortedData);
            }
            catch (err) {
                alert(`Error removing service: ${err.message}`);
            }
        }
    }


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
                        color: "var(--color-dark)",
                        paddingRight: "0.5rem",
                    }}
                >
                    <span title="Unit Price" className="service-rate"><Currency figure={service.rate} /></span>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            color: "var(--color-dark)",
                        }}
                    >
                        <span className="forward-slash">/</span>
                        <span title="Service Unit" className="service-unit">{service.unit}</span>
                    </div>
                </div>
                <div className="service-item-controls">
                    {locateJobOnEstimate(service)
                        ? (
                            <div className="job-on-estimate">
                                <span className="job-added-text">Added to Estimate</span>
                                <IncrementDecrementInput
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
                        )
                        : (
                            <div style={{ display: "flex" }}>
                                <button
                                    className="button"
                                    title="Add Service to Estimate"
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

    // if (loading) return <h2>Loading services...</h2>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div className="services-component page">
            <h1 className="services-heading page-heading">Services</h1>
            <div className="flex justify-center controls">
                <SearchInput id="servicesSearchInput" value={search} onChange={setSearch} />
            </div>

            <SearchResultsText count={filteredServices.length} search={search} />

            {loading && <p className="loading-text">Loading services...</p>}

            <section className="services-section">
                {!search ? (
                    services.map(([category, items], idx) => (
                        <div className="services-category" key={idx}>
                            <h2 className="services-category-header" title="Service Category">{category}</h2>
                            <ul className="services-list">
                                {items.map((service, index) => (
                                    <li key={index} className={locateJobOnEstimate(service) ? "service-item selected" : "service-item"}>

                                        <div className="job-item-header">
                                            <span title="Service Description" className="service-description">{service.description}</span>
                                            {service.isCustom &&
                                                (<div className="flex">
                                                    <Link to={pages.editService.replace(':id', service.id)}>
                                                        <button
                                                            className="job-edit-button icon-button shake-transformation"
                                                            title="Update custom Service"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
                                                        </button>
                                                    </Link>
                                                    <button
                                                        className="job-remove-button icon-button text-red shake-transformation"
                                                        title="Remove custom Service"
                                                        onClick={() => handleRemoveService(service.id)}
                                                    >
                                                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                                        </svg>
                                                    </button>
                                                </div>)}

                                        </div>
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
                                <div className="job-item-header">
                                    <span title="Service Description" className="service-description">{service.description}</span>
                                    {service.isCustom &&
                                        (<div className="flex">
                                            <Link to={pages.editService.replace(':id', service.id)}>
                                                <button
                                                    className="job-edit-button icon-button shake-transformation"
                                                    title="Update custom Service"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
                                                </button>
                                            </Link>
                                            <button
                                                className="job-remove-button icon-button text-red shake-transformation"
                                                title="Remove custom Service"
                                                onClick={() => handleRemoveService(service.id)}
                                            >
                                                <svg className="icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                                </svg>
                                            </button>
                                            
                                        </div>)}

                                </div>
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
            <p className="footnote">
                Note: Rates are quoted in Jamaican Dollars &#40;JMD&#41;.
            </p>
        </div>
    );
};

export default ServicesList; 
