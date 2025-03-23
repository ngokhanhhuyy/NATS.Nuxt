import { sendRequestAsync } from "./api";

/**
 * Gets a list of all contacts.
 * 
 * @returns A {@link Promise{T}} representing the asynchronous operation, which result is an
 * array of DTOs, containing the information of the contacts.
 * @example getListAsync();
 */
async function getListAsync(): Promise<ContactResponseDto[]> {
    return sendRequestAsync("/contact");
}

/**
 * Get a single contact.
 *
 * @param id The id of the contact to retrieve.
 * @returns A {@link Promise} representing the asynchronous operation, which result is a DTO
 * containing the information of the contact.
 * @example getSingleAsync(1);
 *
 * @throws {NotFoundError} Throws when the contact specified by {@link id} doesn't exist.
 */
async function getSingleAsync(id: number): Promise<ContactResponseDto> {
    return sendRequestAsync(`/contact/${id}`);
}

/**
 * Creates a new contact.
 * 
 * @param requestDto A DTO containing the data for the creating operation.
 * @returns A {@link Promise{T}} representing the asynchronous operation, which result is the
 * id of the created contact.
 * @example createAsync({ ... });
 * 
 * @throws {ValidationError} Throws when the data specified by {@link requestDto} is invalid.
 */
async function createAsync(requestDto: ContactUpsertRequestDto): Promise<number> {
    return sendRequestAsync("/contact", {
        method: "post",
        body: requestDto
    });
}

/**
 * Updates an existing contact, specified by its id.
 * 
 * @param id The id of the contact to update.
 * @param requestDto A DTO containing the data for the updating operation.
 * @returns A {@link Promise{T}} representing the asynchronous operation.
 * @example updateAsync(1, { ... });
 * 
 * @throws {ValidationError} Throws when the data specified by {@link requestDto} is invalid.
 * @throws {NotFoundError} Throws when the contact specified by {@link id} doesn't exist.
 * @throws {ConcurrencyError} Throws when there is a concurrency-related conflict occuring
 * during the operation.
 */
async function updateAsync(id: number, requestDto: ContactUpsertRequestDto): Promise<void> {
    await sendRequestAsync(`/contact/${id}`, {
        method: "put",
        body: requestDto
    });
}

/**
 * Deletes an existing contact.
 * 
 * @param id The id of the contact to delete.
 * @returns A {@link Promise{T}} representing the asynchronous operation.
 * @example deleteAsync({ ... });
 * 
 * @throws {NotFoundError} Throws when the contact specified by {@link id} doesn't exist.
 * @throws {ConcurrencyError} Throws when there is a concurrency-related conflict occuring
 * during the operation.
 */
async function deleteAsync(id: number): Promise<void> {
    await sendRequestAsync(`/contact/${id}`, { method: "delete" });
}

export {
    getListAsync as getContactListAsync,
    getSingleAsync as getContactSingleAsync,
    createAsync as createContactAsync,
    updateAsync as updateContactAsync,
    deleteAsync as deleteContactAsync
};