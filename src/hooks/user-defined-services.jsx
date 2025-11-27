const STORAGE_KEY = 'userDefinedServices';

// Helper to get all services from localStorage
const getServices = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

const validateService = (service) => {
    if (!service.description || typeof service.description !== 'string') {
        throw new Error('InvalidServiceDescription');
    }
    if (!service.rate || isNaN(service.rate) || service.rate <= 0) {
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
export const useGetServices = () =>{
    return getServices();
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