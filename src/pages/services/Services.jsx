import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateJobQuantity, addJob } from "@/data/EstimateSlice.js";
import ServiceItemCard from "@/pages/services/ServiceItemCard.jsx";
import SearchInput from "@/components/utils/SearchInput.jsx";
import SearchResultsSummary from "@/components/utils/SearchResultsSummary.jsx";
import { useFetchServices, useDeleteService } from "@/hooks/custom-services.jsx";
import useSystemServices from "@/hooks/system-services.jsx";

import "./Services.css";

const ServicesList = () => {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userServices = useFetchServices();
    const systemServices = useSystemServices();
    const dispatch = useDispatch();

    const estimateJobs = useSelector(state => state.estimate.jobs);
    const getEstimateJobByDescription = (description) => {
        return estimateJobs.find(job => job.description === description);
    }
    const createEstimateJob = (service) => {
        const job = { ...service, quantity: 1 };
        return job;
    }


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
            (service.description ?? "").toLowerCase().includes((searchTerm ?? "").toLowerCase())
        );
    

    const handleIncrementQuantity = (service) => {
        const estimateJob =  getEstimateJobByDescription(service.description);
        if (!estimateJob) {
            alert(`Service "${service.description}" is not on the estimate. Cannot decrement quantity.`);
            return;
        }

        const currentQuantity = estimateJob.quantity || 0;
        const newQuantity = currentQuantity + 1;
        dispatch(updateJobQuantity({ description: estimateJob.description, quantity: newQuantity }));
        return newQuantity; // Return the new quantity for local state update
    }

    const handleDecrementQuantity = (service) => {
        const estimateJob = getEstimateJobByDescription(service.description);
        if (!estimateJob) {
            alert(`Service "${service.description}" is not on the estimate. Cannot decrement quantity.`);
            return;
        }
        const currentQuantity = estimateJob.quantity || 1;
        const newQuantity = Math.max(1, currentQuantity - 1);
        dispatch(updateJobQuantity({ description: estimateJob.description, quantity: newQuantity }));
        return newQuantity;
    }

    const handleAddToEstimate = (service) => {
        const estimateJob = getEstimateJobByDescription(service.description);
        if (estimateJob) {
            alert(`Service "${service.description}" is already on the estimate.`);
            return;
        }
        // Create a new job with quantity 1 and add it to the estimate
        const job = createEstimateJob(service);
        dispatch(addJob(job));
        return job;
    };

    const handleRemoveCustomService = (id) => {
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

    const LoadingPlaceholder = ({ toggler }) => {
        { toggler && (
            <div className="loading-placeholder">
                <p className="loading-text">Loading services...</p>
            </div>
        )}
    };


    // if (loading) return <h2>Loading services...</h2>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div className="services-component page">
            <h1 className="services-heading page-heading">Services</h1>
            <div className="flex justify-center controls">
                <SearchInput id="servicesSearchInput" value={searchTerm} onChange={setSearchTerm} />
            </div>

            <SearchResultsSummary count={filteredServices.length} searchTerm={searchTerm} />
            <LoadingPlaceholder toggler={loading} />

            <section className="services-section">
                {!searchTerm ? (
                    services.map(([category, items], idx) => (
                        <div className="services-category" key={idx}>
                            <h2 className="services-category-header" title="Service Category">{category}</h2>
                            <ul className="services-list">
                                {items.map((service, index) => (
                                    <ServiceItemCard 
                                        key={index} 
                                        service={service} 
                                        handleRemoveCustomService={handleRemoveCustomService}
                                        handleIncrementQuantity={handleIncrementQuantity}
                                        handleDecrementQuantity={handleDecrementQuantity}
                                        handleAddToEstimate={handleAddToEstimate}                                     
                                        handleGetEstimateJob={getEstimateJobByDescription}
                                    />
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <ul className="services-list" style={{ paddingLeft: "unset" }}>
                        {filteredServices.map((service, index) => (
                            <li key={index} className="service-item">
                                <ServiceItemCard 
                                    key={index} 
                                    service={service}  
                                    handleRemoveCustomService={handleRemoveCustomService}
                                    handleIncrementQuantity={handleIncrementQuantity}
                                    handleDecrementQuantity={handleDecrementQuantity}
                                    handleAddToEstimate={handleAddToEstimate}                          
                                    handleGetEstimateJob={getEstimateJobByDescription}
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
}

export default ServicesList; 
