import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./PDFView.css";
import Currency from "./Currency.jsx";
import unitMap from "../data/unit_map.json"


const PDFView = () => {
    const jobs = useSelector(state => state.estimate.jobs);

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    return (
        <div className="pdf-view">
            <div className="controls">
                <button className="border-light" onClick={() => window.print()}>Export as PDF</button>
            </div>
            <div className="estimate-header">
                <div className="company-details">
                    <div className="company-info">
                        <h2 className="company-name">My Company</h2>
                        <address className="company-address">
                            456 Business Rd.<br/>
                            Business City, BC 12345<br/>
                            (123) 456-7890<br/>
                        </address>                     
                    </div>
                    <div className="company-logo">
                        <img src="/public/app_icon.svg" alt="Company Logo" height="100"/>
                    </div>
                </div>
                <div className="estimate-title">
                    <h1>Project Estimate</h1>
                </div>
                <div className="estimate-details">
                    <div className="client-info">
                        <strong>Bill to:</strong>
                        <p className="client-name">John Doe</p>
                        <address className="client-address">
                            123 Main St.<br/>
                            City, Country<br/>
                            (987) 654-3210<br/>
                        </address>
                    </div>
                    <div className="estimate-info">
                        <p><strong>Estimate #:</strong> 001</p>
                        <p><strong>Estimate date:</strong> {formattedDate}</p>
                        <p><strong>Project:</strong> Home Renovation</p>
                    </div>
                </div>

            </div>
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
                                <Currency figure={job.rate.toFixed(2)}/>
                            </td>
                            <td className="td-left">
                                <Currency figure={(job.quantity * job.rate).toFixed(2)}/>
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
                                        <Currency figure={subtotal.toFixed(2)}/>
                                    </td>
                                </tr>
                                <tr className="discount-row">
                                    <td colSpan={4} className="td-right">Discount</td>
                                    <td className="td-left">
                                        <Currency figure={discount.toFixed(2)}/>
                                    </td>
                                </tr>
                                <tr className="total-row">
                                    <td colSpan={3}></td>
                                    <td className="td-right">Total (JMD)</td>
                                    <td className="td-left">
                                        <Currency figure={grandTotal.toFixed(2)}/>
                                    </td>
                                </tr>
                            </>
                        );
                    })()}
                </tfoot>
            </table>
        </div>
    )
};

export default PDFView;
