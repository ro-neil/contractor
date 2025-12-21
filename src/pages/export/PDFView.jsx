import React, { useState } from "react";
import "./PDFView.css";
import Estimate from "@/pages/estimate/Estimate.jsx";
import EstimateLogo from "@/components/utils/EstimateLogo.jsx";
import { formatReadableDate } from "@/utils/formatReadableDate";


/**
 * PDFView component for displaying and customizing a printable estimate PDF.
 * 
 * Features:
 * - Toggle between edit and preview modes.
 * - Edit company and client details, project title, estimate title, date, and sales tax.
 * - Format phone numbers and dates for display.
 * - Print or save the estimate using the browser's print dialog.
 * - Renders a customizable estimate header and details section.
 * 
 * State:
 * - editMode: Boolean indicating if the form is in edit mode.
 * - estimateHeader: Object containing all editable fields for the estimate cover.
 * 
 * @component
 * @returns {JSX.Element} The PDFView UI for estimate customization and printing.
 */
const PDFView = () => {
    const [editMode, setEditMode] = useState(false);
    const today = new Date();

    const [estimateHeader, setEstimateHeader] = useState({
        estimateTitle: "Construction Estimate",
        companyName: "",
        companyAddress: {
            street: "",
            town: "",
            city: "",
            state: "",
            zip: ""
        },
        companyPhone: "",
        companyLogo: "",
        clientName: "",
        clientAddress: {
            street: "",
            town: "",
            city: ""
        },
        clientPhone: "",
        estimateDate: today.toLocaleDateString('en-CA'), // YYYY-MM-DD format
        projectTitle: "",
        estimateTax: 0,
    });

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target.result;
                setEstimateHeader(prev => ({
                    ...prev,
                    companyLogo: dataUrl
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogoDelete = () => {
        setEstimateHeader(prev => ({
            ...prev,
            companyLogo: ""
        }));
    };

    /**
     * Handles input changes for form fields, updating the estimate cover state.
     * If the field belongs to a nested section (e.g., "companyAddress" or "clientAddress"),
     * it updates the corresponding nested object. Otherwise, it updates the top-level field.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     * @param {string} section - The section name, (e.g., "companyAddress" or "clientAddress").
     * @param {string} field - The field name within the section or top-level.
     */
    const handleInputChange = (e, section, field) => {
        let value = e.target.value;
        const nestedSections = ["companyAddress", "clientAddress"];

        if (nestedSections.includes(section)) {
            setEstimateHeader(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: value
                }
            }));
        } else {
            if (field === "companyPhone" || field === "clientPhone") {
                const cursorPosition = e.target.selectionStart;
                value = formatPhoneNumber(value);
                // Try to keep cursor near where user is typing
                e.target.setSelectionRange(cursorPosition, cursorPosition)
            }
            if (field === "estimateTax") {
                // Ensure tax is a number between 0 and 100
                value = Math.min(Math.max(parseFloat(value) || 0, 0), 100);

                // Limit to max 5 characters including decimal point
                if (value >= 10) {
                    value = value.toString().slice(0, 5);
                } else {
                    value = value.toString().slice(0, 4);
                }
            }
            setEstimateHeader(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    /**
     * Handles the print action for the PDF view.
     * Disables edit mode and triggers the browser's print dialog after a short delay.
     *
     * @function handlePrint
     * @returns {void}
     */
    const handlePrint = () => {
        setEditMode(false);
        setTimeout(() => {
            window.print();
        }, 100);
    }


    /**
     * Formats a phone number string into the format (XXX) XXX-XXXX.
     * Non-digit characters are removed before formatting.
     *
     * @param {string} value - The input phone number string.
     * @returns {string} The formatted phone number, or an empty string if input is invalid.
     */
    const formatPhoneNumber = (value) => {
        // Remove all non-digit characters
        const digits = value.replace(/\D/g, '');

        // Format based on length
        const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

        if (!match) return '';

        let formatted = '';
        if (match[1]) formatted += `(${match[1]}`;
        if (match[1].length === 3 && match[2]) formatted += `) ${match[2]}`;
        else if (match[2]) formatted += match[2];
        if (match[2].length === 3 && match[3]) formatted += `-${match[3]}`;
        else if (match[3]) formatted += match[3];

        return formatted;
    };

    return (
        <div className="pdf-view">
            <h1 className="page-heading">PDF Preview</h1>
            <div className="controls flex justify-center align-center">
                {editMode &&
                    <button title="Preview Estimate" className="button preview-button" onClick={() => setEditMode(false)}>
                        <span className="button-text">Preview</span>
                    </button>
                }
                {!editMode &&
                    <button title="Customize Estimate Header" className="button customize-button" onClick={() => setEditMode(true)}>
                        <span className="button-text">Customize</span>
                    </button>
                }

                <button title="Download/Print Estimate" className="button save-button" onClick={() => handlePrint()}>
                    <span className="button-text">Save</span>
                </button>
            </div>

            <section className={editMode ? "estimate edit-mode" : "estimate"}>
                <div className={editMode ? "estimate-header edit-mode" : "estimate-header"}>
                    {(estimateHeader.companyName || estimateHeader.companyLogo || editMode) &&
                        <div className="company-details">
                            <div className="company-info">
                                {editMode && <h3>Company</h3>}
                                {editMode &&
                                    <div className="company-logo-upload">
                                        {!estimateHeader.companyLogo &&
                                            <div className="file-input-wrapper" title="Upload Company Logo">
                                                <input id="companyLogoInput" className="file-input" type="file" accept="image/*" onChange={handleLogoUpload} />
                                                <label htmlFor="companyLogoInput" className="file-input-button" role="button" aria-label="Upload image">
                                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
                                                    </svg>
                                                    <span className="file-input-button-text">Company Logo</span>
                                                </label>
                                            </div>
                                        }

                                        {estimateHeader.companyLogo &&
                                            (<div className="logo-preview-container">
                                                <img
                                                    className="logo-preview"
                                                    src={estimateHeader.companyLogo}
                                                    alt="Company Logo Preview"
                                                    title="Company Logo Preview"
                                                />
                                                <button type="button" className="logo-remove-button icon-button text-red shake-transformation" title="Remove Company Logo" onClick={handleLogoDelete}>
                                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                                    </svg>
                                                </button>
                                            </div>)
                                        }
                                    </div>
                                }
                                {editMode ?
                                    <input
                                        id="companyNameInput"
                                        type="text"
                                        placeholder="Company Name"
                                        value={estimateHeader.companyName}
                                        onChange={(e) => handleInputChange(e, null, "companyName")}
                                        required
                                    /> :
                                    <h2 className="company-name">{estimateHeader.companyName || ""}</h2>
                                }
                                <address className="company-address">
                                    {editMode ?
                                        <>
                                            <input
                                                id="company-street-address"
                                                type="text"
                                                placeholder="Street Address"
                                                value={estimateHeader.companyAddress.street}
                                                onChange={(e) => handleInputChange(e, "companyAddress", "street")}
                                            />
                                            <input
                                                id="company-town-address"
                                                type="text"
                                                placeholder="Town Address"
                                                value={estimateHeader.companyAddress.town}
                                                onChange={(e) => handleInputChange(e, "companyAddress", "town")}
                                            />
                                            <input
                                                id="company-city-address"
                                                type="text"
                                                placeholder="City Address"
                                                value={estimateHeader.companyAddress.city}
                                                onChange={(e) => handleInputChange(e, "companyAddress", "city")}
                                            />
                                            <input
                                                id="company-phone"
                                                type="text"
                                                maxLength="14"
                                                placeholder="Phone Number"
                                                value={estimateHeader.companyPhone}
                                                onChange={(e) => handleInputChange(e, null, "companyPhone")}
                                            />
                                        </>
                                        :
                                        <>
                                            {estimateHeader.companyAddress.street && <span>{estimateHeader.companyAddress.street}</span>}
                                            <div style={{ display: "flex", gap: "0.25rem" }}>
                                                {estimateHeader.companyAddress.town && <span>{estimateHeader.companyAddress.town}</span>}
                                                {estimateHeader.companyAddress.city && <span>{estimateHeader.companyAddress.city}</span>}
                                            </div>

                                        </>
                                    }
                                </address>
                                {!editMode && estimateHeader.companyPhone && <p className="phone-number">{estimateHeader.companyPhone}</p>}

                            </div>

                            {!editMode &&
                                <div className="company-logo" title={estimateHeader.companyLogo ? "Company Logo" : "Estimate Logo"}>
                                    {estimateHeader.companyLogo ?
                                        <img src={estimateHeader.companyLogo} alt="Company Logo" /> :
                                        <EstimateLogo />
                                    }
                                </div>
                            }
                        </div>}

                    {!editMode && estimateHeader.estimateTitle && (
                        <div className="estimate-title">
                            <h1>
                                {(estimateHeader.estimateTitle).split(" ").map((word, index) => (
                                    <span key={index}>
                                        {word}<br />
                                    </span>
                                ))}
                            </h1>
                        </div>
                    )}

                    <div className="estimate-details" style={{
                        justifyContent: estimateHeader.clientName || editMode ? 'space-between' : 'end',
                        flexDirection: editMode ? 'column' : 'row'
                    }}>

                        {(editMode || estimateHeader.clientName) && (
                            <div className="client-info">
                                {editMode ? <h3>Client</h3> : <h2 style={{ marginTop: 0 }}>Bill To:</h2>}
                                {editMode ?
                                    <input
                                        id="clientNameInput"
                                        type="text"
                                        placeholder="Client's Name"
                                        value={estimateHeader.clientName}
                                        onChange={(e) => handleInputChange(e, null, "clientName")}
                                        required
                                    /> :
                                    <p className="client-name">{estimateHeader.clientName}</p>
                                }
                                <address className="client-address">
                                    {editMode ? (
                                        <>
                                            <input
                                                id="client-street-address"
                                                type="text"
                                                placeholder="Street Address"
                                                value={estimateHeader.clientAddress.street}
                                                onChange={(e) => handleInputChange(e, "clientAddress", "street")}
                                            />
                                            <input
                                                id="client-town-address"
                                                type="text"
                                                placeholder="Town Address"
                                                value={estimateHeader.clientAddress.town}
                                                onChange={(e) => handleInputChange(e, "clientAddress", "town")}
                                            />
                                            <input
                                                id="client-city-address"
                                                type="text"
                                                placeholder="City Address"
                                                value={estimateHeader.clientAddress.city}
                                                onChange={(e) => handleInputChange(e, "clientAddress", "city")}
                                            />
                                            <input
                                                id="client-phone"
                                                type="text"
                                                maxLength="14"
                                                placeholder="Phone Number"
                                                value={estimateHeader.clientPhone}
                                                onChange={(e) => handleInputChange(e, null, "clientPhone")}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            {estimateHeader.clientAddress.street && <span>{estimateHeader.clientAddress.street}</span>}
                                            <div style={{ display: "flex", gap: "0.25rem" }}>
                                                {estimateHeader.clientAddress.town && <span>{estimateHeader.clientAddress.town}</span>}
                                                {estimateHeader.clientAddress.city && <span>{estimateHeader.clientAddress.city}</span>}
                                            </div>

                                        </>
                                    )}
                                </address>
                                {!editMode && estimateHeader.clientPhone && <p className="phone-number">{estimateHeader.clientPhone}</p>}
                            </div>
                        )}

                        {editMode && (
                            <div className="estimate-titles edit-mode">
                                <h3>Titles</h3>
                                <input
                                    id="estimateTitleInput"
                                    type="text"
                                    placeholder="Estimate Title"
                                    value={estimateHeader.estimateTitle}
                                    onChange={(e) => handleInputChange(e, null, "estimateTitle")}
                                    required
                                />
                                <input
                                    id="projectTitleInput"
                                    type="text"
                                    placeholder="Project Title"
                                    value={estimateHeader.projectTitle}
                                    onChange={(e) => handleInputChange(e, null, "projectTitle")}
                                    required
                                />
                            </div>
                        )}

                        {editMode && (
                            <div className="estimate-date">
                                <h3>Date</h3>
                                <input
                                    id="estimateDate"
                                    type="date"
                                    value={estimateHeader.estimateDate}
                                    onChange={(e) => handleInputChange(e, null, "estimateDate")}
                                />
                            </div>
                        )}

                        <section>
                            {!editMode && estimateHeader.projectTitle && (
                                <p className="estimate-project-title">
                                    <strong>Project:</strong>
                                    <span>{estimateHeader.projectTitle}</span>
                                </p>
                            )}

                            {!editMode && estimateHeader.estimateDate && (
                                <p className="estimate-date">
                                    <strong>Estimate Date:</strong>
                                    <span>{formatReadableDate(estimateHeader.estimateDate)}</span>
                                </p>
                            )}
                        </section>

                        {editMode && (
                            <div className="estimate-tax">
                                <label htmlFor="estimate-tax"><h3>Tax Rate (%)</h3></label>
                                <input
                                    id="estimate-tax"
                                    className="tax-input"
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    title="Estimate Tax"
                                    value={estimateHeader.estimateTax}
                                    onChange={(e) => handleInputChange(e, null, "estimateTax")}
                                />
                            </div>
                        )}

                    </div>
                </div>

                <Estimate
                    table={true}
                    tax={Number.parseFloat(estimateHeader.estimateTax) || 0}
                />
            </section>
        </div>
    );
};

export default PDFView;

