import { useState } from "react";
import "./NewService.css";
import serviceUnitMap from "@/data/service-unit-map.json";
import contractorServicesData from "@/data/contractor-services.json";
import { useCreateService } from "@/hooks/custom-services.jsx";
import { usePages} from '@/routing/router.jsx';
import { useNavigate } from 'react-router-dom';
import ServiceForm from "./ServiceForm.jsx";


export default function NewService() {
   
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        description: "",
        rate: "",
        unit: "",
        category: "",
    });
    const pages = usePages();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleAddService = (e) => {
        e.preventDefault();
        setErrors({}); // Reset errors

        try {
            useCreateService(form);
            alert("Service added successfully!");
            navigate(pages.services);
        } catch (err) {
            const newErrors = {};

            // Map Error Names to Field Names
            switch (err.message) {
                case 'InvalidServiceDescription':
                    newErrors.description = 'Description is required.';
                    break;
                case 'InvalidServiceRate':
                    newErrors.rate = 'Please enter a valid positive rate.';
                    break;
                case 'InvalidServiceUnit':
                    newErrors.unit = 'Unit is required.';
                    break;
                case 'InvalidServiceCategory':
                    newErrors.category = 'Invalid category format.';
                    break;
                default:
                    console.error(err);
            }
            setErrors(newErrors);
        }
    };

    return (
        <div className="new-service-container">
            <h1 className="page-heading">New Service</h1>
                <ServiceForm 
                    form={form} 
                    errors={errors} 
                    handleChange={handleChange} 
                    handleSubmit={handleAddService} 
                    submitButtonText="Create Service"
                    legend="Create New Service"
                />
        </div>
    );
}