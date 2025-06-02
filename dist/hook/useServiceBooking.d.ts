import type { TProductDetails, TStoreHomeData } from '../index';
export declare function useServiceBooking(data: TStoreHomeData): {
    selectedServiceDetails: TProductDetails | undefined;
    getServiceDetails: (serviceId?: number | string) => Promise<void>;
};
