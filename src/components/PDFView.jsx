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
        projectTitle: "",
        estimateDiscount: 0 
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
                <div className={editMode ? "estimate-header edit-mode" : "estimate-header"}>
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
                                            id="company-street-address"
                                            type="text"
                                            placeholder="Street"
                                            value={estimateHeader.companyAddress.street}
                                            onChange={(e) => handleInputChange(e, "companyAddress", "street")}
                                        />
                                        <input
                                            id="company-town-address"
                                            type="text"
                                            placeholder="Town"
                                            value={estimateHeader.companyAddress.town}
                                            onChange={(e) => handleInputChange(e, "companyAddress", "town")}
                                        />
                                        <input
                                            id="company-city-address"
                                            type="text"
                                            placeholder="City"
                                            value={estimateHeader.companyAddress.city}
                                            onChange={(e) => handleInputChange(e, "companyAddress", "city")}
                                        />
                                        <input
                                            id="company-phone"
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
                        {!editMode && <div className="company-logo">
                            <img src={estimateHeader.companyIcon} alt="Company Logo" />
                        </div>}
                    </div>}

                    <div className={editMode ? "estimate-title edit-mode" : "estimate-title"}>
                    {editMode ? (
                        <div>
                            {/* <strong>Estimate Title:</strong> */}
                            <input
                                id="estimate-title"
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

                    <div className="estimate-details" style={{
                        justifyContent: estimateHeader.clientName || editMode ? 'space-between' : 'end',
                        flexDirection: editMode ? 'column' : 'row'
                        }}>
                        {(editMode || estimateHeader.clientName) && 
                        <div className="client-info">
                            {(!editMode || estimateHeader.clientName) ? <strong>Bill To:</strong> : ""}
                            <p className="client-name">
                                {editMode ? (
                                    <input
                                        id="client-name"
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
                                            id="client-street-address"
                                            type="text"
                                            placeholder="Street"
                                            value={estimateHeader.clientAddress.street}
                                            onChange={(e) => handleInputChange(e, "clientAddress", "street")}
                                        />
                                        <input
                                            id="client-town-address"
                                            type="text"
                                            placeholder="Town"
                                            value={estimateHeader.clientAddress.town}
                                            onChange={(e) => handleInputChange(e, "clientAddress", "town")}
                                        />
                                        <input
                                            id="client-city-address"
                                            type="text"
                                            placeholder="City"
                                            value={estimateHeader.clientAddress.city}
                                            onChange={(e) => handleInputChange(e, "clientAddress", "city")}
                                        />
                                        <input
                                            id="client-phone"
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
                            {(editMode || estimateHeader.projectTitle) && (
                                <p className="estimate-project"> {!editMode && <strong>Project Title:</strong>}
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
                            <p className="estimate-date">{!editMode && <strong>Estimate Date:</strong>}
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
                            {editMode && <span>Discount<br/></span>}
                            {editMode && <input
                                id="estimate-discount"
                                type="number"
                                placeholder="Estimate Discount"
                                value={estimateHeader.estimateDiscount}
                                onChange={(e) => handleInputChange(e, null, "estimateDiscount")}
                                required
                                style={{ alignSelf: 'start'}}
                            />}
                        </div>
                    </div>
                </div>

                <Estimate table={true} discount={Number.parseInt(estimateHeader.estimateDiscount) || 0 }/>
            </section>
        </div>
    );
};

export default PDFView;

