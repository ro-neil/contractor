import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./PDFView.css";
import Currency from "./Currency.jsx";
import unitMap from "../data/unit_map.json"
import app_icon from "/public/app_icon.svg";
 


const PDFView = () => {
    const jobs = useSelector(state => state.estimate.jobs);
    const [editMode, setEditMode] = useState(false);

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    const [estimateHeader, setEstimateHeader] = useState({
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
        projectName: ""
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
                    <span className="button-text">Lock</span> :
                    <span className="button-text">Unlock</span>
                    }
                </button>
                <button className="border-light" onClick={() => handlePrint()}>
                    Export as PDF
                </button>            
            </div>

            <div className="estimate-header">
                <div className="company-details">
                    <div className="company-info">
                        <h2 className="company-name">
                            {editMode ? (
                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    value={estimateHeader.companyName}
                                    onChange={(e) => handleInputChange(e, null, "companyName")}
                                />
                            ) : (
                                estimateHeader.companyName || ""
                            )}
                        </h2>
                        <address className="company-address">
                            {editMode ? (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Street"
                                        value={estimateHeader.companyAddress.street}
                                        onChange={(e) => handleInputChange(e, "companyAddress", "street")}
                                    /><br/>
                                    <input
                                        type="text"
                                        placeholder="City"
                                        value={estimateHeader.companyAddress.city}
                                        onChange={(e) => handleInputChange(e, "companyAddress", "city")}
                                    />,
                                    <input
                                        type="text"
                                        placeholder="State"
                                        value={estimateHeader.companyAddress.state}
                                        onChange={(e) => handleInputChange(e, "companyAddress", "state")}
                                    />
                                    <input
                                        type="text"
                                        placeholder="ZIP"
                                        value={estimateHeader.companyAddress.zip}
                                        onChange={(e) => handleInputChange(e, "companyAddress", "zip")}
                                    /><br/>
                                    <input
                                        type="text"
                                        placeholder="Phone"
                                        value={estimateHeader.companyPhone}
                                        onChange={(e) => handleInputChange(e, null, "companyPhone")}
                                    />
                                </>
                            ) : (
                                <>
                                    {estimateHeader.companyAddress.street}<br/>
                                    {estimateHeader.companyAddress.city}, {estimateHeader.companyAddress.state} {estimateHeader.companyAddress.zip}<br/>
                                    {estimateHeader.companyPhone}
                                </>
                            )}
                        </address>
                    </div>
                    <div className="company-logo">
                        <img src={estimateHeader.companyIcon} alt="Company Logo" height="90" />
                    </div>
                </div>

                <div className="estimate-title">
                    <h1>Project <br/> Estimate</h1>
                </div>

                <div className="estimate-details">
                    <div className="client-info">
                        {estimateHeader.clientName ? <strong>Bill To:</strong> : ""}
                        <p className="client-name">
                            {editMode ? (
                                <input
                                    type="text"
                                    placeholder="Client Name"
                                    value={estimateHeader.clientName}
                                    onChange={(e) => handleInputChange(e, null, "clientName")}
                                />
                            ) : (
                                estimateHeader.clientName
                            )}
                        </p>
                        <address className="client-address">
                            {editMode ? (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Street"
                                        value={estimateHeader.clientAddress.street}
                                        onChange={(e) => handleInputChange(e, "clientAddress", "street")}
                                    /><br/>
                                    <input
                                        type="text"
                                        placeholder="Town"
                                        value={estimateHeader.clientAddress.town}
                                        onChange={(e) => handleInputChange(e, "clientAddress", "town")}
                                    />,
                                    <input
                                        type="text"
                                        placeholder="City"
                                        value={estimateHeader.clientAddress.city}
                                        onChange={(e) => handleInputChange(e, "clientAddress", "city")}
                                    /><br/>
                                    <input
                                        type="text"
                                        placeholder="Client Phone"
                                        value={estimateHeader.clientPhone}
                                        onChange={(e) => handleInputChange(e, null, "clientPhone")}
                                    />
                                </>
                            ) : (
                                <>
                                    {estimateHeader.clientAddress.street}<br/>
                                    {estimateHeader.clientAddress.town}, {estimateHeader.clientAddress.city}<br/>
                                    {estimateHeader.clientPhone}
                                </>
                            )}
                        </address>
                    </div>

                    <div className="estimate-info">
                        <p><strong>Estimate Date:</strong>
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
                        <p><strong>Project:</strong>
                            {editMode ? (
                                <input
                                    type="text"
                                    placeholder="Project Name"
                                    value={estimateHeader.projectName}
                                    onChange={(e) => handleInputChange(e, null, "projectName")}
                                />
                            ) : (
                                estimateHeader.projectName
                            )}
                        </p>
                    </div>
                </div>
            </div>

            {jobs.length > 0 &&
                <table className="estimate-table">
                    <thead>
                        <tr className="table-header">
                            <th className="th-left">Description</th>
                            <th className="th-left">Qty</th>
                            <th className="th-left">Unit</th>
                            <th className="th-left">Unit Price</th>
                            <th className="th-left">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job, index) => (
                            <tr key={index} className="table-body-row">
                                <td className="td-left">{job.description}</td>
                                <td className="td-center">{job.quantity}</td>
                                <td className="td-left">{job.unit}</td>
                                <td className="td-left">
                                    <Currency figure={job.rate.toFixed(2)} />
                                </td>
                                <td className="td-left">
                                    <Currency figure={(job.quantity * job.rate).toFixed(2)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        {(() => {
                            const subtotal = jobs.reduce((sum, job) => sum + job.quantity * job.rate, 0);
                            const taxAmount = 0;
                            const discount = 0;
                            const grandTotal = subtotal + taxAmount - discount;

                            return (
                                <>
                                    <tr className="border-top subtotal-row">
                                        <td colSpan={4} className="td-right">Subtotal</td>
                                        <td className="td-left">
                                            <Currency figure={subtotal.toFixed(2)} />
                                        </td>
                                    </tr>
                                    <tr className="discount-row">
                                        <td colSpan={4} className="td-right">Discount</td>
                                        <td className="td-left">
                                            <Currency figure={discount.toFixed(2)} />
                                        </td>
                                    </tr>
                                    <tr className="total-row">
                                        <td colSpan={3}></td>
                                        <td className="td-right">Total (JMD)</td>
                                        <td className="td-left">
                                            <Currency figure={grandTotal.toFixed(2)} />
                                        </td>
                                    </tr>
                                </>
                            );
                        })()}
                    </tfoot>
                </table>
            }
        </div>
    );
};

export default PDFView;

