import React, { useState } from "react";
import "./PDFView.css";
import app_icon from "/public/app_icon.svg";
import Estimate from "./Estimate.jsx";



const PDFView = () => {
    const [editMode, setEditMode] = useState(false);

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    const [estimateHeader, setEstimateHeader] = useState({
        estimateTitle: "Project Estimate",
        companyName: "",
        companyAddress: {
            street: "",
            town: "",
            city: "",
            state: "",
            zip: ""
        },
        companyPhone: "",
        companyIcon: app_icon,
        clientName: "",
        clientAddress: {
            street: "",
            town: "",
            city: ""
        },
        clientPhone: "",
        estimateDate: formattedDate,
        projectTitle: ""
    });

    const handleInputChange = (e, section, field) => {
        const value = e.target.value;

        if (section === "companyAddress" || section === "clientAddress") {
            setEstimateHeader(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: value
                }
            }));
        } else {
            setEstimateHeader(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const handlePrint = () => {
        setEditMode(false);
        setTimeout(() => {
            window.print();
        }, 100);
    }

    return (
        <div className="pdf-view">
            <div className="controls">
                <button className="border-light bg-dark" onClick={() => setEditMode(!editMode)}>
                    {editMode ?
                        <span className="button-text">View</span> :
                        <span className="button-text">Customize</span>
                    }
                </button>
                <button className="border-light" onClick={() => handlePrint()}>
                    Save
                </button>
            </div>

            <section className={editMode ? "estimate edit-mode" : "estimate"}>
                <div className="estimate-header">
                    {(estimateHeader.companyName || editMode) && <div className="company-details">
                        <div className="company-info">
                            <h2 className="company-name">
                                {editMode ? (
                                    <input
                                        type="text"
                                        placeholder="Company Name"
                                        value={estimateHeader.companyName}
                                        onChange={(e) => handleInputChange(e, null, "companyName")}
                                        required
                                    />
                                ) : (
                                    estimateHeader.companyName || ""
                                )}
                            </h2>
                            <address className="company-address">
                                {editMode ?
                                    <>
                                        <input
                                            name="street-address"
                                            type="text"
                                            placeholder="Street"
                                            value={estimateHeader.companyAddress.street}
                                            onChange={(e) => handleInputChange(e, "companyAddress", "street")}
                                        />
                                        <div style={{display: "flex", gap: "0.5rem"}}>
                                            <input
                                                name="town-address"
                                                type="text"
                                                placeholder="Town"
                                                value={estimateHeader.companyAddress.town}
                                                onChange={(e) => handleInputChange(e, "companyAddress", "town")}
                                            />
                                            <input
                                                name="city-address"
                                                type="text"
                                                placeholder="City"
                                                value={estimateHeader.companyAddress.city}
                                                onChange={(e) => handleInputChange(e, "companyAddress", "city")}
                                            />
                                        </div>
                                        <input
                                            name="company-phone"
                                            type="text"
                                            placeholder="Phone"
                                            value={estimateHeader.companyPhone}
                                            onChange={(e) => handleInputChange(e, null, "companyPhone")}
                                        />
                                    </>
                                    :
                                    <>
                                        {estimateHeader.companyAddress.street && <span>{estimateHeader.companyAddress.street}</span>}
                                        <div style={{display: "flex", gap: "0.25rem"}}>
                                            {estimateHeader.companyAddress.town && <span>{estimateHeader.companyAddress.town}</span>}
                                            {estimateHeader.companyAddress.city && <span>{estimateHeader.companyAddress.city}</span>}  
                                        </div>
                                                                           
                                    </>
                                }
                            </address>
                            {!editMode && estimateHeader.companyPhone && <p className="phone-number">{estimateHeader.companyPhone}</p>}
                        </div>
                        <div className="company-logo">
                            <img src={estimateHeader.companyIcon} alt="Company Logo" />
                        </div>
                    </div>}

                    <div className="estimate-title">
                    {editMode ? (
                        <div>
                            <strong>Estimate Title:</strong>
                            <input
                                name="estimate-title"
                                type="text"
                                placeholder="Estimate Title"
                                value={estimateHeader.estimateTitle}
                                onChange={(e) => handleInputChange(e, null, "estimateTitle")}
                                required
                            />
                        </div>
                        ) : (
                        <h1>
                            {(estimateHeader.estimateTitle || "Project Estimate").split(' ').map((word, index) => (
                            <span key={index}>
                                {word}<br />
                            </span>
                            ))}
                        </h1>
                        )                            
                    }                        
                    </div>

                    <div className="estimate-details" style={{justifyContent: estimateHeader.clientName || editMode ? 'space-between' : 'end'}}>
                        {(editMode || estimateHeader.clientName) && 
                        <div className="client-info">
                            {(editMode || estimateHeader.clientName) ? <strong>Bill To:</strong> : ""}
                            <p className="client-name">
                                {editMode ? (
                                    <input
                                        name="client-name"
                                        type="text"
                                        placeholder="Client Name"
                                        value={estimateHeader.clientName}
                                        onChange={(e) => handleInputChange(e, null, "clientName")}
                                        required
                                    />
                                ) : (
                                    estimateHeader.clientName
                                )}
                            </p>
                            <address className="client-address">
                                {editMode ? (
                                    <>
                                        <input
                                            name="street-address"
                                            type="text"
                                            placeholder="Street"
                                            value={estimateHeader.clientAddress.street}
                                            onChange={(e) => handleInputChange(e, "clientAddress", "street")}
                                        />
                                        <div style={{display: "flex", gap: "0.5rem"}}>
                                            <input
                                                name="town-address"
                                                type="text"
                                                placeholder="Town"
                                                value={estimateHeader.clientAddress.town}
                                                onChange={(e) => handleInputChange(e, "clientAddress", "town")}
                                            />
                                            <input
                                                name="city-address"
                                                type="text"
                                                placeholder="City"
                                                value={estimateHeader.clientAddress.city}
                                                onChange={(e) => handleInputChange(e, "clientAddress", "city")}
                                            />
                                        </div>
                                        <input
                                            name="client-phone"
                                            type="text"
                                            placeholder="Client Phone"
                                            value={estimateHeader.clientPhone}
                                            onChange={(e) => handleInputChange(e, null, "clientPhone")}
                                        />
                                    </>
                                ) : (
                                    <>
                                        {estimateHeader.clientAddress.street && <span>{estimateHeader.clientAddress.street}</span>}
                                        <div style={{display: "flex", gap: "0.25rem"}}>
                                            {estimateHeader.clientAddress.town && <span>{estimateHeader.clientAddress.town}</span>}
                                            {estimateHeader.clientAddress.city && <span>{estimateHeader.clientAddress.city}</span>}
                                        </div>
                                        
                                    </>
                                )}
                            </address>
                            {!editMode && estimateHeader.clientPhone && <p className="phone-number">{estimateHeader.clientPhone}</p>}
                        </div>}

                        <div className="estimate-info">
                            <p className="estimate-date"><strong>Estimate Date:</strong>
                                {editMode ? (
                                    <input
                                        type="text"
                                        value={estimateHeader.estimateDate}
                                        onChange={(e) => handleInputChange(e, null, "estimateDate")}
                                    />
                                ) : (
                                    estimateHeader.estimateDate
                                )}
                            </p>
                            {(editMode || estimateHeader.projectTitle) && (
                                <p className="estimate-project"><strong>Project Title:</strong>
                                    {editMode ?
                                        <input
                                            type="text"
                                            placeholder="Project Title"
                                            value={estimateHeader.projectTitle}
                                            onChange={(e) => handleInputChange(e, null, "projectTitle")}
                                            required
                                        />
                                        :
                                        estimateHeader.projectTitle
                                    }
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {editMode ? <Estimate table={true} /> : <Estimate table={true} />}
            </section>
        </div>
    );
};

export default PDFView;

