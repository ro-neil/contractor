import React, { useState } from "react";
import "./PDFView.css";
import brand_logo_2 from "@/assets/brand-logo-2.svg";
import Estimate from "@/pages/estimate/Estimate.jsx";


/**
 * PDFView component for displaying and customizing a printable estimate PDF.
 * 
 * Features:
 * - Toggle between edit and preview modes.
 * - Edit company and client details, project title, estimate title, date, and discount.
 * - Format phone numbers and dates for display.
 * - Print or save the estimate using the browser's print dialog.
 * - Renders a customizable estimate header and details section.
 * 
 * State:
 * - editMode: Boolean indicating if the form is in edit mode.
 * - estimateCover: Object containing all editable fields for the estimate cover.
 * 
 * @component
 * @returns {JSX.Element} The PDFView UI for estimate customization and printing.
 */
const PDFView = () => {
    const [editMode, setEditMode] = useState(false);
    let today = new Date();
    today = today.toISOString().split('T')[0];  // Format for the <input type="date"> (YYYY-MM-DD)

    const [estimateCover, setEstimateCover] = useState({
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
        companyIcon: brand_logo_2,
        clientName: "",
        clientAddress: {
            street: "",
            town: "",
            city: ""
        },
        clientPhone: "",
        estimateDate: today,
        projectTitle: "",
        estimateDiscount: 0 
    });

    /**
     * Handles input changes for form fields, updating the estimate cover state.
     * If the field belongs to a nested section (e.g., "companyAddress" or "clientAddress"),
     * it updates the corresponding nested object. Otherwise, it updates the top-level field.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     * @param {string} section - The section name, e.g., "companyAddress" or "clientAddress".
     * @param {string} field - The field name within the section or top-level.
     */
    const handleInputChange = (e, section, field) => {
        let value = e.target.value;

        if (section === "companyAddress" || section === "clientAddress") {
            setEstimateCover(prev => ({
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
            } else if (field === "estimateDiscount") {
                value = value.replace(/\D/g, '');
            }
            setEstimateCover(prev => ({
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
     * Formats an ISO date string into a human-readable alphanumeric format like "Sep 26, 2025".
     * 
     * @param {string} isoDateString - The date string in ISO format (with or without time).
     * @param {string} [locale='en-US'] - Optional locale for formatting.
     * @param {Object} [options] - Optional Intl.DateTimeFormat options.
     * @returns {string} - Formatted date string.
     */
    const formatReadableDate = (isoDateString, locale = 'en-US', options = {
        year: "numeric",
        month: "short",
        day: "numeric"
    }) => {
        if (!isoDateString) return '';

        const normalizedDateString = isoDateString.includes('T')
            ? isoDateString
            : `${isoDateString}T00:00:00`;

        const date = new Date(normalizedDateString);
        return date.toLocaleDateString(locale, options);
    };


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
            <div className="controls flex justify-center align-center">
                {editMode && 
                    <button className="button preview-button" onClick={() => setEditMode(false)}>              
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                            <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
                        </svg>
                        <span className="button-text">Preview</span>
                    </button>
                 } 
                 {!editMode &&
                    <button className="button customize-button" onClick={() => setEditMode(true)}> 
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                            <path d="M480-240Zm-320 80v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q37 0 73 4.5t72 14.5l-67 68q-20-3-39-5t-39-2q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32h240v80H160Zm400 40v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-340L683-120H560Zm300-263-37-37 37 37ZM620-180h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19ZM480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Z"/>
                        </svg>
                        <span className="button-text">Customize</span>
                    </button>
                }
                
                <button className="button save-button" onClick={() => handlePrint()}>
                   <svg className="icon" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                    <path d="m720-120 160-160-56-56-64 64v-167h-80v167l-64-64-56 56 160 160ZM560 0v-80h320V0H560ZM240-160q-33 0-56.5-23.5T160-240v-560q0-33 23.5-56.5T240-880h280l240 240v121h-80v-81H480v-200H240v560h240v80H240Zm0-80v-560 560Z"/>
                   </svg>
                   <span className="button-text">Save</span>
                </button>
            </div>

            <section className={editMode ? "estimate edit-mode" : "estimate"}>
                <div className={editMode ? "estimate-header edit-mode" : "estimate-header"}>
                    {(estimateCover.companyName || editMode) && 
                    <div className="company-details">
                        <div className="company-info">
                            {editMode && <h3>Company</h3>}
                            {editMode ? 
                                <input
                                    id="companyNameInput"
                                    type="text"
                                    placeholder="Company Name"
                                    value={estimateCover.companyName}
                                    onChange={(e) => handleInputChange(e, null, "companyName")}
                                    required
                                /> :
                                <h2 className="company-name">{estimateCover.companyName || ""}</h2>
                            }
                            <address className="company-address">
                                {editMode ?
                                    <>
                                        <input
                                            id="company-street-address"
                                            type="text"
                                            placeholder="Street Address"
                                            value={estimateCover.companyAddress.street}
                                            onChange={(e) => handleInputChange(e, "companyAddress", "street")}
                                        />
                                        <input
                                            id="company-town-address"
                                            type="text"
                                            placeholder="Town Address"
                                            value={estimateCover.companyAddress.town}
                                            onChange={(e) => handleInputChange(e, "companyAddress", "town")}
                                        />
                                        <input
                                            id="company-city-address"
                                            type="text"
                                            placeholder="City Address"
                                            value={estimateCover.companyAddress.city}
                                            onChange={(e) => handleInputChange(e, "companyAddress", "city")}
                                        />
                                        <input
                                            id="company-phone"
                                            type="text"
                                            maxLength="14"
                                            placeholder="Phone Number"
                                            value={estimateCover.companyPhone}
                                            onChange={(e) => handleInputChange(e, null, "companyPhone")}
                                        />
                                    </>
                                    :
                                    <>
                                        {estimateCover.companyAddress.street && <span>{estimateCover.companyAddress.street}</span>}
                                        <div style={{display: "flex", gap: "0.25rem"}}>
                                            {estimateCover.companyAddress.town && <span>{estimateCover.companyAddress.town}</span>}
                                            {estimateCover.companyAddress.city && <span>{estimateCover.companyAddress.city}</span>}  
                                        </div>
                                                                           
                                    </>
                                }
                            </address>
                            {!editMode && estimateCover.companyPhone && <p className="phone-number">{estimateCover.companyPhone}</p>}
                        </div>
                        {!editMode && <div className="company-logo">
                            <img src={estimateCover.companyIcon} alt="Company Logo" />
                        </div>}
                    </div>}

                    {!editMode && estimateCover.estimateTitle && (
                        <div className="estimate-title">
                            <h1>
                                {(estimateCover.estimateTitle).split(" ").map((word, index) => (
                                    <span key={index}>
                                        {word}<br />
                                    </span>
                                ))}
                            </h1>                                           
                        </div>
                    )}

                    <div className="estimate-details" style={{
                        justifyContent: estimateCover.clientName || editMode ? 'space-between' : 'end',
                        flexDirection: editMode ? 'column' : 'row'
                        }}>

                        {(editMode || estimateCover.clientName) && (
                            <div className="client-info">
                                {editMode ? <h3>Client</h3> : <h2 style={{marginTop: 0}}>Bill To:</h2>}                           
                                {editMode ? 
                                    <input
                                        id="clientNameInput"
                                        type="text"
                                        placeholder="Client's Name"
                                        value={estimateCover.clientName}
                                        onChange={(e) => handleInputChange(e, null, "clientName")}
                                        required
                                    /> :
                                    <p className="client-name">{estimateCover.clientName}</p>
                                }
                                <address className="client-address">
                                    {editMode ? (
                                        <>
                                            <input
                                                id="client-street-address"
                                                type="text"
                                                placeholder="Street Address"
                                                value={estimateCover.clientAddress.street}
                                                onChange={(e) => handleInputChange(e, "clientAddress", "street")}
                                            />
                                            <input
                                                id="client-town-address"
                                                type="text"
                                                placeholder="Town Address"
                                                value={estimateCover.clientAddress.town}
                                                onChange={(e) => handleInputChange(e, "clientAddress", "town")}
                                            />
                                            <input
                                                id="client-city-address"
                                                type="text"
                                                placeholder="City Address"
                                                value={estimateCover.clientAddress.city}
                                                onChange={(e) => handleInputChange(e, "clientAddress", "city")}
                                            />
                                            <input
                                                id="client-phone"
                                                type="text"
                                                maxLength="14"
                                                placeholder="Phone Number"
                                                value={estimateCover.clientPhone}
                                                onChange={(e) => handleInputChange(e, null, "clientPhone")}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            {estimateCover.clientAddress.street && <span>{estimateCover.clientAddress.street}</span>}
                                            <div style={{display: "flex", gap: "0.25rem"}}>
                                                {estimateCover.clientAddress.town && <span>{estimateCover.clientAddress.town}</span>}
                                                {estimateCover.clientAddress.city && <span>{estimateCover.clientAddress.city}</span>}
                                            </div>
                                            
                                        </>
                                    )}
                                </address>
                                {!editMode && estimateCover.clientPhone && <p className="phone-number">{estimateCover.clientPhone}</p>}
                            </div>
                        )}

                        {editMode && (
                            <div className="estimate-titles edit-mode">
                                <h3>Titles</h3>
                                <input
                                    id="estimateTitleInput"
                                    type="text"
                                    placeholder="Estimate Title"
                                    value={estimateCover.estimateTitle}
                                    onChange={(e) => handleInputChange(e, null, "estimateTitle")}
                                    required
                                />
                                <input
                                    id="projectTitleInput"
                                    type="text"
                                    placeholder="Project Title"
                                    value={estimateCover.projectTitle}
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
                                    value={estimateCover.estimateDate}
                                    onChange={(e) => handleInputChange(e, null, "estimateDate")}
                                />
                            </div>
                        )}

                        <section>
                            {!editMode && estimateCover.projectTitle && (
                                <p className="estimate-project-title">
                                    <strong>Project:</strong>
                                    <span>{estimateCover.projectTitle}</span>
                                </p>
                            )}

                            {!editMode && estimateCover.estimateDate && (
                                <p className="estimate-date">
                                    <strong>Estimate Date:</strong>
                                    <span>{formatReadableDate(estimateCover.estimateDate)}</span>
                                </p>
                            )}
                        </section>
                        
                        {editMode && (
                            <div className="estimate-discount"> 
                                <h3>Discount</h3>
                                <input
                                    id="estimate-discount"
                                    type="tel"
                                    min={0}
                                    max={999999999}
                                    maxLength="9"
                                    pattern="\d*" 
                                    title="Estimate Discount"
                                    placeholder="Estimate Discount"
                                    value={estimateCover.estimateDiscount}
                                    onChange={(e) => handleInputChange(e, null, "estimateDiscount")}
                                    required
                                    style={{ alignSelf: 'start'}}
                                />
                            </div>
                        )}
                        
                    </div>
                </div>

                <Estimate table={true} discount={Number.parseInt(estimateCover.estimateDiscount) || 0 }/>
            </section>
        </div>
    );
};

export default PDFView;

