import React, { useState, useEffect, useCallback } from 'react';

/**
 * DataPipeline component
 * Exposes APIs for connecting to a generic data source.
 * Props:
 *   - dataSource: async function or object with fetch method to get data
 *   - onData: callback(data) when new data is fetched
 *   - interval: polling interval in ms (optional)
 */
const DataPipeline = ({
    dataSource,
    onData,
    interval = null,
    children,
}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            let result;
            if (typeof dataSource === 'function') {
                result = await dataSource();
            } else if (dataSource && typeof dataSource.fetch === 'function') {
                result = await dataSource.fetch();
            } else {
                throw new Error('Invalid dataSource');
            }
            console.error("Result:", result)
            setData(result);
            setError(null);
            if (onData) onData(result);
        } catch (err) {
            setError(err);
            setData(null);
        }
    }, [dataSource, onData]);

    useEffect(() => {
        fetchData();
        if (interval) {
            const timer = setInterval(fetchData, interval);
            return () => clearInterval(timer);
        }
    }, [fetchData, interval]);

    // Expose API via render props or children
    if (typeof children === 'function') {
        return children({ data, error, refetch: fetchData });
    }

    return null;
};

export default DataPipeline;