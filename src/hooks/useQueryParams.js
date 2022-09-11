import React from 'react';
import { useLocation } from "react-router";

export function useQueryParams() {
    const { search } = useLocation();

    const query = React.useMemo(() => new URLSearchParams(search), [search])

    return query;
}

export function toggleQueryParamField(fieldName, value) {
    const oldQuery = new URLSearchParams(window.location.search);
    let newQuery = [];
    for (const [currField, currValue] of oldQuery.entries()) {
        if (currField === fieldName) {
            newQuery.push([currField, currValue]);
        }
    }
    let sameFieldIndex = newQuery.findIndex(([currField, currValue]) => currField === fieldName && currValue === value);
    if (sameFieldIndex !== -1) {
        newQuery.splice(sameFieldIndex, 1);
    }
    else {
        newQuery.push([fieldName, value]);
    }
    const searchString = `${newQuery.map(([key, val]) => `${key}=${val}`).join('&')}`;
    return searchString;
}