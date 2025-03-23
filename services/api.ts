import { useRuntimeConfig } from "#app";
import type { NitroFetchOptions } from "nitropack";
import { FetchError } from "ofetch";

export type ApiErrorType =
    | "ValidationError"
    | "NotFoundError"
    | "OperationError"
    | "AuthenticationError"
    | "AuthorizationError"
    | "ConcurrencyError"
    | "InternalServerError"
    | "UndefinedError";

export type ApiError = {
    type: "NotFoundError"
        | "AuthenticationError"
        | "AuthorizationError"
        | "ConcurrencyError"
        | "InternalServerError"
        | "UndefinedError";
    errors: null;
} | {
    type: "ValidationError" | "OperationError";
    errors: Record<string, string[]>;
}

export function isApiError(error: any): error is ApiError {
    if ("type" !in error && "errors" !in error) {
        return false;
    }

    const validTypes = [
        "NotFoundError",
        "AuthenticationError",
        "AuthorizationError",
        "ConcurrencyError",
        "InternalServerError",
        "UndefinedError"
    ];

    return validTypes.includes(error.type) && typeof error.errors === "object";
}

export async function sendRequestAsync<
            TResponseDto,
            TMethod extends "get" | "post" | "put" | "delete" = "get">(
        endpoint: string,
        options?: NitroFetchOptions<"json", TMethod>): Promise<TResponseDto> {
    // Determining the API's endpoint url.
    const isServer = typeof window === "undefined";
    const runtimeConfig = useRuntimeConfig();
    let endpointUrl;
    if (isServer) {
        endpointUrl = runtimeConfig.backendApiUrl + endpoint;
    } else {
        endpointUrl = "/api" + endpoint;
    }

    const requestOptions: NitroFetchOptions<"json", TMethod> = {
        credentials: "include" as RequestCredentials,
        ...options
    };

    try {
        return await $fetch<TResponseDto>(endpointUrl, requestOptions);
    } catch (err) {
        const error = err as FetchError;
        switch (error.statusCode) {
            case 400:
                throw { type: "ValidationError", errors: error.data };
            case 401:
                throw { type: "AuthenticationError", errors: null };
            case 403:
                throw { type: "AuthorizationError", errors: null };
            case 404:
                throw { type: "NotFoundError", errors: null };
            case 409:
                throw { type: "ConcurrencyError", errors: null };
            case 422:
                throw { type: "OperationError", errors: error.data };
            case 500:
                throw { type: "InternalServerError", errors: null };
        }

        throw error;
    }
}