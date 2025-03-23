import { sendRequestAsync } from "./api";

type ListRequestDto = CatalogItemListRequestDto;
type BasicResponseDto = CatalogItemBasicResponseDto;
type UpsertRequestDto = CatalogItemUpsertRequestDto;

/**
 * Get the list of all catalog items with basic information and thumbnail only.
 *
 * @param requestDto (Optional) A DTO containing the conditions for the results.
 * @returns A {@link Promise} representing the asynchronous operation, which result is a DTO
 * containing the information of the item.
 * @example getListAsync(CatalogItemType.Service);
 *
 * @throws {ApiError} Throws with type `ValidationError` when the conditions specified in
 * {@link requestDto} is invalid.
 * exist.
 */
async function getListAsync(requestDto?: ListRequestDto): Promise<BasicResponseDto[]> {
    return await sendRequestAsync("/catalogItem", {
        params: requestDto
    });
}

/**
 * Gets a specific catalog item by given id with detail information, thumbnail url and photos.
 *
 * @param id The id of the catalog item to retrieve.
 * @returns A {@link Promise} representing the asynchronous operation, which result is a DTO
 * containing the information of the item.
 * @example getDetailAsync(CatalogItemType.Service, 1);
 *
 * @throws {ApiError} Throws with type `NotFoundError` when the catalog items specified by
 * {@link type} and {@link id} doesn't exist.
 */
async function getDetailAsync(id: number): Promise<CatalogItemDetailResponseDto> {
    return sendRequestAsync(`/catalogItem/${id}`);
}

/**
 * Create a new catalog item with the given data.
 *
 * @param requestDto A DTO containing the data for the creating operation.
 * @returns A {@link Promise} representing the asynchronous operation, which result is the id
 * of the created catalog item.
 * @example createAsync({ ... });
 *
 * @throws {ApiError} Throws with following types:
 * - `ValidationError` when the data specified by {@link requestDto} is invalid.
 * - `ConcurrencyError` when a concurrency-related conflict occurs during the operation.
 */
async function createAsync(requestDto: UpsertRequestDto): Promise<number> {
    return sendRequestAsync("/catalogItem", {
        method: "post",
        body: requestDto
    });
}

/**
 * Update an existing catalog item by the given id with the data specified in the request,
 * containing thumbnail and photo files.
 *
 * @param id The id of the catalog item to be updated.
 * @param requestDto A DTO containing the data for the updating operation.
 * @returns A {@link Promise} representing the asynchronous operation.
 * @example updateAsync(1, { ... });
 *
 * @throws {ApiError} with the following types:
 * - `ValidationError` when the data specified by {@link requestDto} is invalid.
 * - `NotFoundError` when the catalog item specified by doesn't exist.
 */
async function updateAsync(id: number, requestDto: UpsertRequestDto): Promise<void> {
    await sendRequestAsync(`/catalogItem/${id}`, {
        method: "put",
        body: requestDto
    });
}

/**
 * Delete an existing catalog item with the given id, including its thumbnail and photos.
 *
 * @param id The id of the catalog item to be deleted.
 * @returns A {@link Promise} representing the asynchronous opeartion.
 *
 * @throws {ApiError} with the following types:
 * - `NotFoundError` when the catalog item specified by {@link id} doesn't exist.
 * - `ConcurrencyError` when there is a concurrency-related conflict occuring during the
 * operation.
 */
async function deleteAsync(id: number): Promise<void> {
    await sendRequestAsync(`/catalogItem/${id}`, {
        method: "delete"
    });
}

export {
    getListAsync as getCatalogItemListAsync,
    getDetailAsync as getCatalogItemDetailAsync,
    createAsync as createCatalogItemAsync,
    updateAsync as updateCatalogItemAsync,
    deleteAsync as deleteCatalogItemAsync
};