import contractorServicesData from "@/data/contractor-services.json";

const useSystemServices = () => {
    // DataPipeline-ready dataSource (returns the local JSON)
    const dataSource = contractorServicesData;
    return dataSource;
}

export default useSystemServices;