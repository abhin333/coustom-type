import type { TProductDetails, TStoreHomeData } from '../index';
export declare function useServiceBooking(data: TStoreHomeData): {
    getServiceOptions: (category: string) => {
        id: number;
        label: string;
        value: number;
    }[];
    getSizeOptions: (serviceId: number) => {
        id: number | undefined;
        label: string;
        value: number | undefined;
    }[];
    getServicePrice: (serviceTypeId: number | string, sizeId: number | string) => number;
    getServiceDetails: (serviceId?: number | string) => Promise<void>;
    selectedServiceDetails: TProductDetails | undefined;
};
