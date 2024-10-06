import axios from 'axios';

export const BASE_URL = 'https://pixabay.com/api/';
export const API_KEY = '46360280-37ac22277a0bce1d099a81efa';
export const PER_PAGE = 15;

export async function fetchImages(query, currentPage = 1) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: currentPage,
        per_page: PER_PAGE,

    });

    const url = `${BASE_URL}?${params}`;

    try {
        const data = await axios.get(url);
        console.log('fetchImages data:', data.data);
        return data.data;
    } catch (error) {
        console.error('Error fetching images:', error);
    }

}
    
