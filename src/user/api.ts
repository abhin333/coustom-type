import { CONFIG } from "./config";
import { GetServerSidePropsContext } from "../index";

const LOGOUT_BYPASSED_URLS = ["service/owner/store/", "customer/user", "service/buyer/cart/"];


export const getAuthKey = (context?: GetServerSidePropsContext) => {
    let accessToken;
    if (context) {
      // @ts-ignore
      accessToken = context.req.session.user?.accessToken;
      if (!accessToken) {
        // @ts-ignore
        context.res.writeHead(302, { Location: "/auth/logout" });
        // @ts-ignore
        context.res.end();
      }
    } else {
      accessToken = localStorage.getItem("accessToken");
    }
    return accessToken;
  };



const _fetch = async (
    url: any,
    options: any,
    isAuthenticated: boolean = true,
    context?: GetServerSidePropsContext
  ) => {
    const dontWait = options.dontWait ?? false;
    delete options.dontWait;
  
    const finalUrl = `${CONFIG.SELF_URL}/api/be/${url}`;
    const allOptions = {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": options.contentType ?? "application/json",
      },
      next: options.cache
        ? undefined
        : {
          revalidate: 10,
        },
    };
  
    if (options.contentType === "multipart/form-data") {
      delete allOptions.headers["Content-Type"];
    }
  
    if (
      options.method !== "GET" &&
      options.contentType !== "multipart/form-data"
    ) {
      allOptions.body = JSON.stringify(options.body);
    }
    if (isAuthenticated) {
      const authKey = getAuthKey(context);
      allOptions.headers.Authorization = `Bearer ${authKey}`;
    }
    const response = await fetch(finalUrl, allOptions);
    if (!response.ok) {
      if (
        isAuthenticated &&
        response.status === 401 &&
        !LOGOUT_BYPASSED_URLS.includes(url)
      ) {
        console.log('LOGOUT URL ' + url);
        if (context) {
          // @ts-ignore
          context.res.writeHead(302, { Location: "/auth/logout" });
          // @ts-ignore
          context.res.end();
        } else {
          window.location.href = `/auth/logout?redirect=${window.location.href}`;
        }
      }
    }
  
    if (dontWait) {
      return {
        ok: response.ok,
        status: response.status,
        json: response.ok ? await response.json() : null,
      };
    } else {
      return {
        ok: response.ok,
        status: response.status,
        json: response.status != 204 ? response.json() : {},
      };
    }
  };
  



export const noAuthFetch = async (url: string, options: any = {}) => {
    return _fetch(url, options, false);
  };

  

