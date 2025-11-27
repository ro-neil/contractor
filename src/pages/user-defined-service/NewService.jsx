import React, { useState, useEffect } from "react";
import "./NewService.css";
import serviceUnitMap from "@/data/service-unit-map.json";
import { titleCase } from "@/utils/string.js";
import contractorServicesData from "@/data/contractor-services.json";

const serviceUnits = Object.keys(serviceUnitMap) || [];
const serviceCategories = [...new Set(contractorServicesData.map(service => service.category))].sort((a, b) => a.localeCompare(b));

export default function NewService() {
    const [form, setForm] = useState({
        description: "",
        rate: "",
        unit: "",
        category: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit logic here
        console.log(form);
    };

    return (
        <div className="new-service-container">
            <h2>New Service</h2>
            <form className="new-service-form" onSubmit={handleSubmit} noValidate>
                <fieldset>
                    <legend className="visually-hidden">Create New Service</legend>

                    {/* Description */}
                    <div className="form-group">
                        <label htmlFor="service-description">
                            <span className="required">Name</span>
                        </label>
                        <input
                            id="service-description"
                            type="text"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                            aria-required="true"
                            // placeholder="Enter service description"
                        />
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
                            aria-describedby="rate-help"
                        />
                        <small id="rate-help" className="help-text">Enter amount per unit (e.g., per hour, per item)</small>
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
                            aria-describedby="unit-help"
                        />
                        <datalist id="service-units">
                            {serviceUnits.map((unit) => (
                                <option key={unit} value={titleCase(unit)} />
                            ))}
                        </datalist>
                        <small id="unit-help" className="help-text">Type or select a unit (e.g., Day, Square Foot, Each)</small>
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
                        />
                        <datalist id="service-categories">
                            {serviceCategories.map((category) => (
                                <option key={category} value={category} />
                            ))}
                        </datalist>
                        <small id="category-help" className="help-text">Type or select a category (e.g., Masonry, Carpentry)</small>
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