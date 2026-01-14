import { useEffect, useState } from 'react';

const useApiService = (url) => {
    const [error, setError] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let finished = false;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!finished) {
                    setResult(data);
                    setLoading(false);
                }
            })
            .catch(e => {
                if (!finished) {
                    setError(e.message);
                    setLoading(false);
                }
            });
        return () => {
            finished = true;
        };
    }, [url]);


    return { result, isLoading, error };
};

export default useApiService;