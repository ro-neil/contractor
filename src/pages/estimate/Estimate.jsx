
import Currency from "@/components/utils/Currency.jsx";
import { useSelector, useDispatch } from "react-redux";
import { removeJob, updateJobQuantity } from "@/data/EstimateSlice.js";
import IncrementDecrementInput from "@/components/utils/IncrementDecrementInput.jsx";
import "./Estimate.css";
import unitMap from "@/data/service-unit-map.json";
import { truncate } from "@/utils/string.js";
import { useNavigate } from "react-router-dom";
import { usePages } from '@/routing/router.jsx';


const Estimate = ({ table, tax }) => {
    const jobs = useSelector(state => state.estimate.jobs);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pages = usePages();

    const handleExportPDF = () => {
        const previewPage = pages.estimatePreview;
        navigate(previewPage);
    };

    const handleEmptyEstimateClick = () => {
        const servicesPage = pages.services;
        navigate(servicesPage);
    }

    const handleUpdateQuantity = (description, value) => {
        dispatch(updateJobQuantity({ description: description, quantity: value }));
    }

    const handleRemoveJob = (description) => {
        dispatch(removeJob(description));
    }

    const handleNumberInputChange = (description, e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        handleBlur(description, value);
    };

    // Handle blur (when user finishes typing)
    const handleBlur = (description, quantity) => {
        dispatch(updateJobQuantity({ description, quantity }));
    };

    const generateEstimateTable = () => {
        const subtotal = jobs.reduce((sum, job) => sum + job.quantity * job.rate, 0);
        const taxAmount = (subtotal * tax) / 100; 
        const grandTotal = subtotal + taxAmount;
        return (
            <table className="estimate-table print-no-repeat-header">
                <thead>
                    <tr className="table-header">
                        <th className="th-left">Description</th>
                        <th className="text-center">Qty</th>
                        <th className="th-left">Unit</th>
                        <th className="th-left">Unit Price</th>
                        <th className="th-left">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.filter((job) => job.quantity !== 0).map((job, index) => (
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

                    {/* Totals rows inside tbody, so they only appear once */}
                    <tr className="border-top subtotal-row">
                        <td colSpan={4} className="td-right">Subtotal</td>
                        <td className="td-left">
                            <Currency figure={subtotal.toFixed(2)} />
                        </td>
                    </tr>
                    <tr className="tax-row">
                        <td colSpan={4} className="td-right">Sales Tax ({tax}%)</td>
                        <td className="td-left">
                            <Currency figure={taxAmount.toFixed(2) == 0 ? "" : taxAmount.toFixed(2)} />
                        </td>
                    </tr>
                    <tr className="total-row">
                        <td colSpan={3}></td>
                        <td className="td-right">Total (JMD)</td>
                        <td className="td-left">
                            <Currency figure={grandTotal.toFixed(2)} />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    };

    const isEmpty = (arr) => arr.length <= 0;


    return (
        table === true ? <div className="estimate-component">{generateEstimateTable()}</div> :
            <div className="estimate-component">
                <h1 className="estimate-heading page-heading">Estimate</h1>
                {isEmpty(jobs) && (
                    <section className="estimate-body">
                        <div className="empty-estimate" title="Go to Services" onClick={handleEmptyEstimateClick}>
                            <h2 className="empty-estimate-text">No services added</h2>
                        </div>
                    </section>
                )}

                {!isEmpty(jobs) && (
                    <section className="estimate-body">
                        <div className="controls flex justify-end">
                            <button title="Preview PDF Estimate" type="button" className="button pdf-preview-button" onClick={handleExportPDF}>
                                <span className='button-text'>PDF Preview</span>
                            </button>
                        </div>

                        <div className="grand-total-container">
                            <span className="grand-total-text colon-end">Grand Total</span>
                            <span className="grand-total-currency">
                                <Currency figure={jobs.reduce((sum, job) => sum + job.quantity * job.rate, 0) || 0} />
                            </span>
                        </div>

                        <div className="job-items">
                            {jobs.map((job, index) => (
                                <div key={index} className="job-item">
                                    <div className="job-item-header">
                                        <span title="Job Description" className="job-description">{job.description}</span>
                                        <button
                                            className="job-remove-button icon-button text-red shake-transformation"
                                            title="Remove Job from Estimate"
                                            onClick={() => handleRemoveJob(job.description)}
                                        >
                                            <svg className="icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="job-item-body">
                                        <IncrementDecrementInput
                                            id={`job_quantity_${index}`}
                                            name={`job_quantity_${index}`}
                                            value={job.quantity || ''}
                                            placeholder="Qty"
                                            onChange={(e) => handleNumberInputChange(job.description, e)}
                                            onMinus={() => handleUpdateQuantity(job.description, Number.parseInt(job.quantity) - 1)}
                                            onPlus={() => handleUpdateQuantity(job.description, Number.parseInt(job.quantity) + 1)}
                                            onBlur={() => handleBlur(job.description, job.quantity)}
                                            incrementTitle="Increase Quantity"
                                            decrementTitle="Decrease Quantity"
                                        />

                                        <div className="job-rate-container">
                                            <span className="at-symbol">&#64;</span>
                                            <div className="job-rate">
                                                <Currency figure={job.rate} />
                                                <span className="forward-slash">&#47;</span>
                                                <span title="Job Unit" className="short-unit job-unit overflow-ellipsis">{unitMap[job.unit] || truncate(String(job.unit))}</span>
                                                <span title="Job Unit" className="long-unit job-unit overflow-ellipsis" style={{ display: "none" }}>{job.unit}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="job-item-footer job-subtotal">
                                        <span className="job-subtotal-text">Subtotal</span>
                                        <Currency figure={(job.quantity * job.rate) || 0} />
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    </section>
                )}
            </div>
    );
};

export default Estimate;