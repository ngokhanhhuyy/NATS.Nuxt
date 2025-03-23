import { sendRequestAsync } from "./api";

/**
 * Gets the settings.
 * 
 * @returns A {@link Promise} representing the asynchronous operation, which result is a DTO
 * containing the settings information.
 * @example getAsync();
 */
async function getAsync(): Promise<GeneralSettingsResponseDto> {
    return sendRequestAsync("/generalSettings");
}

/**
 * Updates the settings.
 * 
 * @param requestDto A DTO containing the data for the updating operation.
 * @returns A {@link Promise} representing the asynchronous operation.
 * @example updateAsync({ ... });
 * 
 * @throws {ConcurrencyError} Throws when there is a concurrency-related conflict occuring
 * during the operation.
 */
async function updateAsync(requestDto: GeneralSettingsUpdatetRequestDto): Promise<void> {
    return sendRequestAsync("/generalSettings", {
        method: "put",
        body: requestDto
    });
}

export {
    getAsync as getGeneralSettingsAsync,
    updateAsync as updateGeneralSettingsAsync
};