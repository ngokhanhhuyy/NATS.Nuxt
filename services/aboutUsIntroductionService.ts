import { sendRequestAsync } from "./api";

/**
 * Gets the about us introduction.
 *
 * @returns A {@link Promise} representing the asynchronous operation, which result is a DTO
 * containing the information of the about us introduction.
 * @example getAsync();
 */
function getAsync() {
    return sendRequestAsync<AboutUsIntroductionResponseDto>("/aboutUsIntroduction");
}

/**
 * Update the about us introduction.
 *
 * @param requestDto A DTO containing the data for the updating operation.
 * @returns A {@link Promise} representing the asynchronous operation.
 *
 * @throws {ApiError} Throws with type `ConcurrencyError` when there is a concurreny-related
 * conflict occuring during the operation.
 */
async function updateAsync(requestDto: AboutUsIntroductionUpdateRequestDto): Promise<void> {
    await sendRequestAsync("/aboutUsIntroduction", {
        method: "put",
        body: requestDto
    });
}

export {
    getAsync as getAboutUsIntroductionAsync,
    updateAsync as updateAboutUsIntroductionAsync
};