type TListResponse<T> = {
    count: number;
    next?: number;
    previous?: number;
    results: T[];
};

type TUser = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    ticker_name?: string;
    profile_picture?: string | null;
    cover?: string | null;
    bio?: string;
    phone_number?: string;
    website?: string;
    address?: string;
    gst_number?: string;
    social_media?: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        linkedin?: string;
    };
    is_hosting_enabled?: boolean;
    is_managed_profile?: boolean;
    prority: number;
    kyc_status: string;
    display_name: string;
    projects: TWAProject[];
    default_store?: TStore;
    addresses: TAddress[];
};

type TAddress = {
    id: number;
    name: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    country: string;
    state: string;
    pincode: string;
    landmark: string;
    phone: string;
    instructions: string;
};

type TStore = {
    id: number;
    name: string;
    owner: TUser;
    logo: string;
    cover: string;
    description: string;
    address: string;
    gst_number: string;
    kyc_status: TKycStatus;
    subscription_end_date: string;
    tiqr_fee: number;
    fee_paid_by_buyer: boolean;
    wa_project?: TWAProject;
    currency: string;
    country: string;
    timezone: string;
    delivery_radius?: number | null;
    metadata: TStoreMetaData;
}

type TStoreMetaData = {
    "form": TFormSection[];
    website: string;
}

type TFormSection = {
    section: string;
    questions: TFormQuestion[];
}

type TFormQuestion = {
    id: string;
    type: string;
    title: string;
    options: any[];
    validations: string[];
    description?: string;
    readOnly: boolean;
    value?: string;
    hidden: boolean;
}

type TWAProject = {
    id: number;
    name: string;
    phone_number: string;
}

type TProductPayload = {
    id: number;
    name: string;
    description: string;
    long_description: string;
    is_active: boolean;
    options: TProductOption[];
    addons: number[];
    duration: number;
    tags?: string[];
};

type TProduct = {
    id: number;
    name: string;
    description: string;
    is_active: boolean;
    options: TProductOption[];
    long_description: string;
    store: TStore;
    duration: number;
    min_price: number;
    tags?: string[];
};

type TProductDetails = TProduct & {
    addons?: TAddon[];
};

type TProductOption = {
    id?: number;
    name: string;
    price: number;
    product: TProduct;
    is_active?: boolean;
    sequence?: number;
    is_deleted?: boolean;
    tags?: string[];
    description?: string;
    duration?: number;
};

type TOrderLog = {
    new_status: string;
    created_at: string;
};

type TBuyerMetaData = {
    notes: string;
    phone: string;
    shipping_address?: TAddress;
    billing_address?: TAddress;
    start_time: string;
    end_time: string;
    slot: string;
    formatted_address?: string;
    [key: string]: any;
};

type TShopMetaData = {
    courier_name: string;
    tracking_number: string;
    delivery_date: string;
};


type TOrderDetails = TOrder & {
    total_duration: number;
};

type TOrderItem = {
    id: number;
    product_option_snapshot: TProductOptionSnapshot;
    quantity: number;
    amount: number;
    created_at: string;
};

type TProductOptionSnapshot = TProductOption & {
    product: TProductDetails;
};

type TOrderStatusDetails = {
    description: string;
    label: string;
    className: string;
    status: string;
}



type TCart = {
    amount: number,
    store: number;
    cart_items: TCartItem[]
}

type TCartItem = {
    id: number,
    quantity: number,
    amount: number,
    product_option: TProductOption,
}

//Store Front End
type TStoreHomeData = {
    error: boolean;
    store?: TStore;
    products?: TListResponse<TProduct>;
};

type TProductDetailsPageProps = {
    productData: TProductDetails;
    store: TStore;
    storeProducts?: TListResponse<TProduct>;
};

type TCheckoutPageProps = {
    optionsData: TProductOption[];
    checkoutFrom: 'cart' | 'product';
    cartData?: TCart;
};


type TTileSelectOption = {
    id: string;
    label: string;
    description?: string;
    value: any;
};

type TTimeSlot = {
    id?: number;
    start_time: string;
    end_time: string;
}

// Order & Payment

type TOrderDetailsDrawer = {
    id: number;
    order_type: 'appointment' | 'product';
}

type TOrder = TOrderDetailsDrawer & {
    uuid: string;
    display_uid: string;
    ordered_by: TUser;
    ordered_for: TUser;
    status: string;
    amount: number;
    buyer_meta_data: TBuyerMetaData;
    items: TOrderItem[];
    created_at: string;
    logs: TOrderLog[];
    store: TStore;
    address: TAddress;
    total_amount: number;
    payment: TPayment;
    addons: TBookedAddon[];
    time_slot: TTimeSlotResponse;
    total_duration: number;
};



type TTimeSlotResponse = {
    id: number;
    template: number;
    start_time: string;
    end_time: string;
    is_available: boolean;
    limit: number;
    confirmed_bookings: number;
}

type TPayment = {
    id: number;
    status: string;
    payment_gateway: string;
    amount: number;
    platform_fee: number;
    meta_data: TPaymentMetaData;
    callback_url: string;
};

type TPaymentMetaData = {
    payment_id: string;
    payment_gateway: string;
    url_to_redirect: string;
};


type TOrderDaysFilterOptions = "today" | "last_week" | "last_month" | "last_year" | "all_time";
type TOrderSummaryFilter = {
    startDate: string;
    endDate: string;
}

type TChatFile = {
    id: number;
    file_upload: string;
    type: string;
};

type TKycStatus = "not_submitted" | "processing" | "approved" | "rejected" | "provisional";

type TCurrency = {
    id: string;
    value: string;
    label: string;
    symbol: string;
}

type TCountry = {
    id: string;
    value: string;
    label: string;
    locale: string;
    currency: TCurrency[];
    phoneInputCountryCode: string;
    timezone: string;
}

type TAddon = {
    id?: number;
    name: string;
    description?: string;
    price: number;
    duration?: number;
    is_active?: boolean;
    min_quantity?: number;
    max_quantity?: number;
}

type TBookedAddon = {
    id: number;
    quantity: number;
    amount: number;
    addon: TAddon;
    created_at: string;
}


// Appointments
type TDayOfWeek = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

type TDailyAvailability = {
    id?: number;
    template?: number;
    day_of_week: TDayOfWeek;
    time_intervals: TTimeSlot;
    max_bookings: number;
}



type TSchedule = {
    id: number;
    store: number;
    name: string;
    slot_duration: number;
    buffer_time: number;
    booking_limit: number;
    daily_availabilities: TDailyAvailability[];
}
