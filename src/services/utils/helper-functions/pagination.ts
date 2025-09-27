export const paginationFilter = <T>(data: T[], page: number, itemsOnPage: number): T[] => {
    const from = page * itemsOnPage
    const to = (page + 1) * itemsOnPage
    return data.slice(from, to)
}