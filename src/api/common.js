/* global localStorage */

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL || 'http://localhost:3000/'
export const API_URL = `${PUBLIC_URL}api/`

export const getToken = () => localStorage.getItem('token')