import { useState, useEffect } from "react";

const STORAGE_KEY = 'userDefinedServices';

// Helper to get all services from localStorage
const getServices = () => {
    let data = localStorage.getItem(STORAGE_KEY);
    if (!data) { return []; }
    data = JSON.parse(data);
    data = data.map((service, idx) => {
        const newID = `usr-${service.category}-${service.description}${idx > 0 ? `-${idx}` : ''}`.replaceAll(' ', '-').toLowerCase();
        // Ensure rate is a number
        return {
            ...service,
            rate: Number(service.rate),
            isCustom: true,
            id: service.id || newID // Ensure id exists
        };
    });
    return data;
}

const validateService = (service) => {
    if (!service.description || typeof service.description !== 'string') {
        throw new Error('InvalidServiceDescription');
    }
    if (
        service.rate === undefined ||
        isNaN(Number(service.rate)) ||
        Number(service.rate) <= 0
    ) {
        throw new Error('InvalidServiceRate');
    }
    if (!service.unit || typeof service.unit !== 'string') {
        throw new Error('InvalidServiceUnit');
    }
    if (typeof service.category !== 'string') {
        throw new Error('InvalidServiceCategory');
    }
};

// Create a new service
export const useCreateService = (service) => {
    const services = getServices();
    const newService = { ...service };
    try {
        validateService(newService);
    } catch (error) {
        console.error(error.message);
        throw error;
    }
    services.push(newService);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    return newService;
}

// Read all services
export const useFetchServices = () => {
    return getServices();
}

export const useFetchServiceById = (serviceId) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!serviceId) return;

        const fetchService = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const services = getServices();
                const service = services.find(s => s.id === serviceId);
                setData(service);
            } catch (err) {
                setError(err);
                setData(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchService();
    }, [serviceId]);
    return { data, isLoading, error };
}

// Update a service by id
export const useUpdateService = (id, updatedFields) => {
    const services = getServices();
    const idx = services.findIndex(s => s.id === id);
    if (idx === -1) return null;
    services[idx] = { ...services[idx], ...updatedFields };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    return services[idx];
}

// Delete a service by id
export const useDeleteService = (id) => {
    const services = getServices();
    const filtered = services.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
}