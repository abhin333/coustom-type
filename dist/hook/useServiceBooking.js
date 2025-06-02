import { useMemo, useState } from 'react';
import { getProductDetails } from '../utils/lib/product'; // adjust based on your package structure
import { paiseToRupeesWithoutFormatting } from '../utils/lib/currency';
import { logger } from '../../src/user/constant';
export function useServiceBooking(data) {
    const [selectedServiceDetails, setSelectedServiceDetails] = useState(undefined);
    const getServiceDetails = useMemo(() => async (serviceId) => {
        if (!serviceId)
            return;
        try {
            const response = await getProductDetails({ productId: serviceId });
            if (response?.ok) {
                const details = await response.json();
                for (const option of details.options) {
                    option.price = paiseToRupeesWithoutFormatting(option.price);
                }
                setSelectedServiceDetails(details);
            }
            else {
                setSelectedServiceDetails(undefined);
            }
        }
        catch (error) {
            logger({
                message: 'Failed to fetch product details',
                data: error,
                type: 'error',
            });
            setSelectedServiceDetails(undefined);
        }
    }, []);
    return { selectedServiceDetails, getServiceDetails };
}
