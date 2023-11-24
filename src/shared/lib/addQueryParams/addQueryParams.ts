export function setQueryParams(params: OptionalRecord<string, string>) {
    const searchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([name, value]) => {
        if (value !== undefined) {
            searchParams.set(name, value);
        }
    });
    return `?${searchParams.toString()}`;
}

export function addQueryParams(params: OptionalRecord<string, string>) {
    window.history.pushState(null, '', setQueryParams(params));
}

export function getQueryParams(): URLSearchParams {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams;
}
