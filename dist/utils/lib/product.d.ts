export declare function fetchProductDetails({ productId }: {
    productId: number | string;
}): Promise<any>;
export declare function getProductDetails({ productId }: {
    productId?: number | string;
}): Promise<{
    ok: boolean;
    status: number;
    json: any;
} | undefined>;
