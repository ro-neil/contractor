import { useState, useEffect } from 'react';

// Centralized Validation Logic
const validateService = (service) => {
    const errors = {};
    if (!service.description || String(service.description).trim() === '') {
        errors.description = 'Description is required.';
    }
    const rate = parseFloat(service.rate);
    if (isNaN(rate) || rate < 0) {
        errors.rate = 'Please enter a valid positive rate.';
    }
    if (!service.unit || String(service.unit).trim() === '') {
        errors.unit = 'Unit is required.';
    }
    return errors;
};

const INITIAL_STATE = {
    description: "",
    rate: "",
    unit: "",
    category: "",
};

/**
 * Custom hook to manage form state and validation logic for Service creation/editing.
 * @param {object | null} initialData - Service object to pre-fill the form.
 * @param {function} onValidSubmit - Function to call when validation passes.
 * @returns {object} { form, errors, handleChange, handleSubmit }
 */
export const useServiceFormLogic = (initialData, onValidSubmit) => {
    // Determine the starting state (clearing out potential nulls/undefineds for uncontrolled inputs)
    const initialFormState = initialData 
        ? { ...INITIAL_STATE, ...initialData } 
        : INITIAL_STATE;
        
    const [form, setForm] = useState(initialFormState);
    const [errors, setErrors] = useState({});

    // Reset/Re-init form if initialData changes (e.g., loading a new service for editing)
    useEffect(() => {
        setForm(initialFormState);
        setErrors({});
    }, [JSON.stringify(initialData)]); // Stringify for deep equality check in dependency array

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({}); // Reset errors

        const validationErrors = validateService(form);
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // If validation passes, call the external submit function
        // Pass a cleaned version of the form data
        onValidSubmit({
            ...form,
            rate: parseFloat(form.rate), // Ensure rate is a number for API
        });
    };

    return { form, errors, handleChange, handleSubmit };
};