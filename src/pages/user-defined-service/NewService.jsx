import React, { useState, useEffect } from "react";
import "./NewService.css";
import serviceUnitMap from "@/data/service-unit-map.json";
import { titleCase } from "@/utils/string.js";
import contractorServicesData from "@/data/contractor-services.json";
import { useCreateService } from "@/hooks/user-defined-services.jsx";
import { usePages} from '@/hooks/router.jsx';
import { useNavigate } from 'react-router-dom';


export default function NewService() {
    
    const serviceUnits = Object.keys(serviceUnitMap) || [];
    const serviceCategories = [...new Set(contractorServicesData.map(service => service.category))].sort((a, b) => a.localeCompare(b));
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
            <h2>New Service</h2>
            <form className="new-service-form" onSubmit={handleAddService} noValidate>
                <fieldset>
                    <legend className="visually-hidden">Create New Service</legend>

                    {/* Description */}
                    <div className="form-group">
                        <label htmlFor="service-description">
                            <span className="required">Description</span>
                        </label>
                        <input
                            id="service-description"
                            type="text"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                            aria-required="true"
                            className={errors.description ? "is-invalid" : ""}
                            aria-invalid={!!errors.description}
                            aria-describedby={errors.description ? "desc-error" : "desc-help"}
                        />
                        {errors.description &&
                            (<span id="desc-error" className="error-message" role="alert">
                                {errors.description}
                            </span>)
                        }
                    </div>

                    {/* Rate */}
                    <div className="form-group">
                        <label htmlFor="service-rate">
                            <span className="required">Rate</span>
                        </label>
                        <input
                            id="service-rate"
                            type="number"
                            name="rate"
                            value={form.rate || ''}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            className={errors.rate ? "is-invalid" : ""}
                            aria-invalid={!!errors.rate}
                            aria-describedby={errors.rate ? "desc-error" : "rate-help"}
                        />
                        {errors.rate ? 
                            (<span id="desc-error" className="error-message" role="alert">
                                {errors.rate}
                            </span>) :
                            (<small id="rate-help" className="help-text">Enter amount per unit (e.g., 50, 1218.99)</small>)
                        }
                        
                    </div>

                    {/* Unit */}
                    <div className="form-group">
                        <label htmlFor="service-unit">
                            <span className="required">Unit</span>
                        </label>
                        <input
                            id="service-unit"
                            name="unit"
                            list="service-units"
                            value={form.unit}
                            onChange={handleChange}
                            required
                            className={errors.unit ? "is-invalid" : ""}
                            aria-invalid={!!errors.unit}
                            aria-describedby={errors.unit ? "desc-error" : "unit-help"}
                        />
                        <datalist id="service-units">
                            {serviceUnits.map((unit) => (
                                <option key={unit} value={titleCase(unit)} />
                            ))}
                        </datalist>
                        {errors.unit ? 
                            (<span id="desc-error" className="error-message" role="alert">
                                {errors.unit}
                            </span>) :
                            (<small id="unit-help" className="help-text">Type or select a unit (e.g., Day, Square Foot, Each)</small>)
                        }                     
                    </div>

                    {/* Category (optional) */}
                    <div className="form-group">
                        <label htmlFor="service-category">
                            Category <span className="optional">(optional)</span>
                        </label>
                        <input
                            id="service-category"
                            list="service-categories"
                            name="category"
                            value={form.category || ''}
                            onChange={handleChange}
                            className={errors.category ? "is-invalid" : ""}
                            aria-invalid={!!errors.category}
                            aria-describedby={errors.category ? "desc-error" : "category-help"}
                        />
                        <datalist id="service-categories">
                            {serviceCategories.map((category) => (
                                <option key={category} value={category} />
                            ))}
                        </datalist>
                        {errors.category ? 
                            (<span id="category-error" className="error-message" role="alert">
                                {errors.category}
                            </span>) :
                            (<small id="category-help" className="help-text">Type or select a category (e.g., Masonry, Carpentry)</small>)
                        }  
                        
                    </div>

                    {/* Submit */}
                    <div className="form-actions">
                        <button type="submit" className="button">
                            Create Service
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}