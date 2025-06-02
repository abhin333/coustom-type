import { GetServerSidePropsContext } from "../index";
export declare const getAuthKey: (context?: GetServerSidePropsContext) => any;
export declare const noAuthFetch: (url: string, options?: any) => Promise<{
    ok: boolean;
    status: number;
    json: any;
}>;
