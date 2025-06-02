import { useMemo, useState } from 'react';
import { getProductDetails } from '../utils/lib/product';
import { paiseToRupeesWithoutFormatting } from '../utils/lib/currency';
import { logger } from '../../src/user/constant';
import { CONFIG } from '../user/config';
const CategoryServices = {
    home_services: {
        name: "Home Services",
        services: CONFIG.HOME_SERVICES,
    },
    car_valeting: {
        name: "Car Valeting",
        services: CONFIG.CAR_VALET_SERVICES,
    },
    bundled_cleaning: {
        name: "Bundled Cleaning",
        services: CONFIG.BUNDLED_SERVICES,
    },
};
export function useServiceBooking(data) {
    var _a, _b, _c;
    const [selectedServiceDetails, setSelectedServiceDetails] = useState(undefined);
    const getServiceDetails = useMemo(() => async (serviceId) => {
        if (!serviceId)
            return undefined;
        if (serviceId) {
            try {
                const response = await getProductDetails({
                    productId: serviceId,
                });
                if (response === null || response === void 0 ? void 0 : response.ok) {
                    console.log("response", response);
                    const details = await response.json;
                    for (const option of details.options) {
                        option.price = paiseToRupeesWithoutFormatting(option.price);
                    }
                    setSelectedServiceDetails(details);
                    return;
                }
                setSelectedServiceDetails(undefined);
            }
            catch (error) {
                logger({
                    message: "Failed to fetch product details",
                    data: error,
                    type: "error",
                });
                setSelectedServiceDetails(undefined);
            }
        }
    }, []);
    const getServiceOptions = useMemo(() => (category) => {
        var _a, _b;
        const categoryServices = ((_a = CategoryServices[category]) === null || _a === void 0 ? void 0 : _a.services) || [];
        return ((((_b = data === null || data === void 0 ? void 0 : data.products) === null || _b === void 0 ? void 0 : _b.results) || []).sort((a, b) => {
            if (a.name.toLowerCase().includes('hourly'))
                return -1;
            if (b.name.toLowerCase().includes('hourly'))
                return 1;
            return 0;
        })
            .filter((product) => categoryServices.includes(product.id))
            .map((product) => ({
            id: product.id,
            label: product.name,
            value: product.id,
        })) || []);
    }, [(_a = data === null || data === void 0 ? void 0 : data.products) === null || _a === void 0 ? void 0 : _a.results]);
    const getSizeOptions = useMemo(() => (serviceId) => {
        var _a;
        const service = (_a = data === null || data === void 0 ? void 0 : data.products) === null || _a === void 0 ? void 0 : _a.results.find((product) => product.id == serviceId);
        return ((service === null || service === void 0 ? void 0 : service.options.map((option) => ({
            id: option.id,
            label: option.name,
            value: option.id,
        }))) || []);
    }, [(_b = data === null || data === void 0 ? void 0 : data.products) === null || _b === void 0 ? void 0 : _b.results]);
    const getServicePrice = useMemo(() => (serviceTypeId, sizeId) => {
        var _a, _b;
        const product = (_a = data === null || data === void 0 ? void 0 : data.products) === null || _a === void 0 ? void 0 : _a.results.find((product) => product.id == serviceTypeId);
        const priceInPaise = (_b = product === null || product === void 0 ? void 0 : product.options.find((option) => option.id == sizeId)) === null || _b === void 0 ? void 0 : _b.price;
        return priceInPaise || 0;
    }, [(_c = data === null || data === void 0 ? void 0 : data.products) === null || _c === void 0 ? void 0 : _c.results]);
    return {
        getServiceOptions,
        getSizeOptions,
        getServicePrice,
        getServiceDetails,
        selectedServiceDetails,
    };
}
