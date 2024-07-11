const parseNumber = (value, defaultValue) => {
    if(typeof value !== "string") {
        return defaultValue;
    }

    const parsedValue = parseInt(value);
    if(Number.isNaN(parsedValue)) {
        return defaultValue;
    }

    return parsedValue;
}

const parsePaginationParams = ({page, limit})=> {
    const parsedPage = parseNumber(page, 1);
    const parsedLimit = parseNumber(limit, 10);

    return {
        page: parsedPage,
        limit: parsedLimit,
    }
}

export default parsePaginationParams;
