import React, { useState } from "react";
import Estimate from "./Estimate.jsx";
import ServicesList from "./Services.jsx";

const Display = ({ onServicesPage, search }) => {
    return (
        <>
            <section style={{ padding: "0 1rem", margin: "0 auto", minWidth: "40%" }}>
            { onServicesPage
                ? <ServicesList key="services" search={search} />
                : <Estimate key="estimate" /> 
            }
            </section>
        </>
    );
}

export default Display;