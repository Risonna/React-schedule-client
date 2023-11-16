//cabinetActions.js
export const fetchCabinetsRequest = () => ({ type: 'FETCH_CABINETS_REQUEST' });
export const fetchCabinetsSuccess = (cabinets) => ({ type: 'FETCH_CABINETS_SUCCESS', payload: cabinets });
export const fetchCabinetsFailure = (error) => ({ type: 'FETCH_CABINETS_FAILURE', error });