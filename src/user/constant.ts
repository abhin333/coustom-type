export const logger = ({ message, type, data = "info" }: { message: string, data?: any, type: "info" | "error" | "warn" }) => {
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "development") {
        switch (type) {
            case "info":
                console.log("TiQR Store:" + message, data);
                break;
            case "error":
                console.error("TiQR Store:" + message, data);
                break;
            case "warn":
                console.warn("TiQR Store:" + message, data);
                break;
        }
    }
}