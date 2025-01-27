import { writable } from 'svelte/store';

export const pagination = writable({ 
    next: null,
    previous: null,
    currentPage: 1,
    totalPages: 0
})

export function getPageFromUrl(url) {
    if (!url) return null;
    const params = new URL(url).searchParams
    return parseInt(params.get('page')) || 1;
}