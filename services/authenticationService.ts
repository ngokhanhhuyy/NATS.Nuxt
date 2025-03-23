import { sendRequestAsync, type ApiError } from "./api";

/**
 * Signs in with the specified username and password using cookies.
 * 
 * @remarks When the data in the request is valid and the authentication credentials
 * are correct, the server will generate an encoded cookie which contains the
 * authentication and authorization information of the requesting user and respond back
 * for the following requests.
 * 
 * @param requestDto - An object containing the username and password for the
 * authentication operation.
 * @returns A {@link Promise} representing the asynchronous operation, which result is
 * a {@link number} representing the id of the user who has been signed in.
 *
 * @throws {ApiError} Throws with type `OperationError` under the following circumstances:
 * - When the user with the specified username doesn't exist or has already been
 * deleted.
 * - When the specified password is incorrect.
 */
async function signInAsync(requestDto: SignInRequestDto): Promise<number> {
    return sendRequestAsync("/authentication/getAccessCookie", {
        method: "post",
        body: requestDto
    });
}

/**
 * Signs out and clear the cookies which contains the authentication credentials from
 * the requesting user.
 * 
 * @returns A {@link Promise} representing the asynchronous operation.
 */
async function signOutAsync(): Promise<void> {
    await sendRequestAsync("/authentication/clearAccessCookie", {
        method: "post"
    });
}

/**
 * Checks the authentication status of the requesting user.
 *
 * @remarks The operation is performed by sending a request containing the cookie
 * (when the authentication method is using access cookies) or the access token (when
 * the authentication method is using access token) in the header to the API endpoint
 * in order to check if the user has been authenticated.
 * 
 * @returns A {@link Promise} representing the asynchronous operation, which result is
 * a {@link boolean} value representing whether the requesting is authenticated.
 */
async function checkAuthenticationStatusAsync(): Promise<boolean> {
    try {
        await sendRequestAsync("/authentication/checkAuthenticationStatus");
        return true;
    } catch (err) {
        const error: ApiError = err as ApiError;
        if (error.type === "AuthenticationError") {
            return false;
        }

        throw err;
    }
}

export { signInAsync, signOutAsync, checkAuthenticationStatusAsync };