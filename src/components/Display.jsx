import React, { useState } from "react";
import Estimate from "./Estimate.jsx";
import ServicesList from "./Services.jsx";

const Display = ({ onServicesPage, search }) => {
    return (
        <>
            { onServicesPage
                ? <ServicesList key="services" search={search} />
                : <Estimate key="estimate" />
            }
        </>
    );
}

export default Display;