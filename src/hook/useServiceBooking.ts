import { useMemo, useState } from 'react';
import { getProductDetails } from '../utils/lib/product'; 
import { paiseToRupeesWithoutFormatting } from '../utils/lib/currency';
import { logger } from '../../src/user/constant'
import type { TProductDetails, TStoreHomeData } from '../index'; 
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

export function useServiceBooking(data: TStoreHomeData) {
    const [selectedServiceDetails, setSelectedServiceDetails] = useState<TProductDetails | undefined>(undefined);
    const getServiceDetails = useMemo(
      () => async (serviceId?: number | string): Promise<void> => {
        if (!serviceId) return undefined;
  
        if (serviceId) {
          try {
            const response = await getProductDetails({
              productId: serviceId,
            });
  
            if (response?.ok) {
              console.log("response", response);
              const details = await response.json;
              for (const option of details.options) {
                option.price = paiseToRupeesWithoutFormatting(option.price);
              }
              setSelectedServiceDetails(details);
              return;
            }
            setSelectedServiceDetails(undefined);
          } catch (error) {
            logger({
              message: "Failed to fetch product details",
              data: error,
              type: "error",
            });
            setSelectedServiceDetails(undefined);
          }
        }
      },
      []
    );
  
    const getServiceOptions = useMemo(
      () => (category: string) => {
        const categoryServices =
          CategoryServices[category as keyof typeof CategoryServices]?.services || [];
        return (
          (data?.products?.results || []).sort((a, b) => {
            if (a.name.toLowerCase().includes('hourly')) return -1;
            if (b.name.toLowerCase().includes('hourly')) return 1;
            return 0;
          })
            .filter((product) => categoryServices.includes(product.id))
            .map((product) => ({
              id: product.id,
              label: product.name,
              value: product.id,
            })) || []
        );
      },
      [data?.products?.results]
    );
  
    const getSizeOptions = useMemo(
      () => (serviceId: number) => {
        const service = data?.products?.results.find(
          (product) => product.id == serviceId
        );
        return (
          service?.options.map((option) => ({
            id: option.id,
            label: option.name,
            value: option.id,
          })) || []
        );
      },
      [data?.products?.results]
    );
  
    const getServicePrice = useMemo(
      () => (serviceTypeId: number | string, sizeId: number | string): number => {
        const product = data?.products?.results.find(
          (product) => product.id == serviceTypeId
        );
        const priceInPaise = product?.options.find(
          (option) => option.id == sizeId
        )?.price;
        return priceInPaise || 0;
      },
      [data?.products?.results]
    );
  
    return {
      getServiceOptions,
      getSizeOptions,
      getServicePrice,
      getServiceDetails,
      selectedServiceDetails,
    };
  } 