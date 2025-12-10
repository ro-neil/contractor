import serviceUnitMap from "@/data/service-unit-map.json";
import { titleCase } from "@/utils/string.js";
import contractorServicesData from "@/data/contractor-services.json";


const serviceUnits = Object.keys(serviceUnitMap).sort() || [];
const serviceCategories = [...new Set(contractorServicesData.map(service => service.category))].sort((a, b) => a.localeCompare(b));

/**
 * @param {object} props
 * @param {object} props.form - Current form values (description, rate, unit, etc.)
 * @param {object} props.errors - Current validation errors
 * @param {function} props.handleChange - Handler for all input changes
 * @param {function} props.handleSubmit - Handler for form submission
 * @param {string} props.submitButtonText - Text for the submit button (e.g., 'Create' or 'Update')
 */
const ServiceForm = ({ form, errors, handleChange, handleSubmit, submitButtonText, legend = 'Service Form' }) => {

    return (
        <form className="new-service-form" onSubmit={handleSubmit} noValidate>
            <fieldset>
                <legend className="visually-hidden">{legend}</legend>

                {/* Description Field... (Structure remains the same) */}
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
                        aria-describedby={errors.description ? "desc-error" : undefined} />
                    {errors.description &&
                        (<span id="desc-error" className="error-message" role="alert">{errors.description}</span>)}
                </div>

                {/* Rate Field... */}
                <div className="form-group">
                    <label htmlFor="service-rate"><span className="required">Rate</span></label>
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
                        aria-describedby={errors.rate ? "rate-error" : "rate-help"} />
                    {errors.rate ?
                        (<span id="rate-error" className="error-message" role="alert">{errors.rate}</span>) :
                        (<small id="rate-help" className="help-text">Enter price per unit, or total price for fixed-cost jobs.</small>)}
                </div>

                {/* Unit Field... */}
                <div className="form-group">
                    <label htmlFor="service-unit"><span className="required">Unit</span></label>
                    <input
                        id="service-unit"
                        name="unit"
                        list="service-units"
                        value={form.unit}
                        onChange={handleChange}
                        required
                        className={errors.unit ? "is-invalid" : ""}
                        aria-invalid={!!errors.unit}
                        aria-describedby={errors.unit ? "unit-error" : "unit-help"} />
                    <datalist id="service-units">
                        {serviceUnits.map((unit) => (<option key={unit} value={titleCase(unit)} />))}
                    </datalist>
                    {errors.unit ?
                        (<span id="unit-error" className="error-message" role="alert">{errors.unit}</span>) :
                        (<small id="unit-help" className="help-text">Type or select a unit (e.g. "Hour" for hourly work, or "Flat Fee" for fixed price.)</small>)}
                </div>

                {/* Category Field... */}
                <div className="form-group">
                    <label htmlFor="service-category">Category <span className="optional">(optional)</span></label>
                    <input
                        id="service-category"
                        list="service-categories"
                        name="category"
                        value={form.category || ''}
                        onChange={handleChange}
                        className={errors.category ? "is-invalid" : ""}
                        aria-invalid={!!errors.category}
                        aria-describedby={errors.category ? "category-error" : undefined} />
                    <datalist id="service-categories">
                        {serviceCategories.map((category) => (<option key={category} value={category} />))}
                    </datalist>
                    {errors.category &&
                        (<span id="category-error" className="error-message" role="alert">{errors.category}</span>)}
                </div>

                {/* Submit */}
                <div className="form-actions">
                    <button type="submit" className="btn-primary">
                        {submitButtonText}
                    </button>
                </div>
            </fieldset>
        </form>
    );
}

export default ServiceForm;