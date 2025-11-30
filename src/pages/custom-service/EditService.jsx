import { useParams, useNavigate } from 'react-router-dom';
import { usePages } from '@/routing/router.jsx';
import ServiceForm from "@/pages/custom-service/ServiceForm.jsx";
import { useServiceFormLogic } from "@/hooks/useServiceFormLogic.jsx";
import { useFetchServiceById, useUpdateService } from "@/hooks/custom-services.jsx"; 

export default function EditService() {
    const { id } = useParams();
    const navigate = useNavigate();
    const pages = usePages();

    // 1. Fetch the existing data (e.g., using a query hook)
    const { data: existingService, isLoading } = useFetchServiceById(id);

    // 2. Define the action when validation passes
    const handleUpdate = async (serviceData) => {
        try {
            // Note: serviceData now includes the ID from the fetched data
            await useUpdateService(id, serviceData); 
            alert("Service updated successfully!");
            navigate(pages.services); 
        } catch (err) {
            console.error("API Update Error:", err);
        }
    };

    // 3. Import the logic, passing the fetched service as initial data
    const { form, errors, handleChange, handleSubmit } = useServiceFormLogic(existingService, handleUpdate);

    if (isLoading) {
        return <div>Loading service details...</div>;
    }

    if (!existingService) {
        navigate('*');
        
        // return <div>Service not found.</div>;
    }

    return (
        <div className="edit-service-container">
            <h1 className="page-heading">Update Service</h1>
            <ServiceForm 
                form={form} 
                errors={errors} 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                submitButtonText="Save Changes"
            />
        </div>
    );
}