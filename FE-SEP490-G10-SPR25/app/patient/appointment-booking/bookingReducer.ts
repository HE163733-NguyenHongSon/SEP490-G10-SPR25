// reducers/bookingReducer.ts

import {
  SET_SYMPTOMS,
  SET_LOADING,
  SET_STEP,
  SET_PATIENT,
  SET_SELECTED_DATE,
  SET_SELECTED_TIME,
  SET_SHOW_BOOKING_FORM,
} from  "./bookingActions"

const initialState = {
  symptoms: '',
  loading: false,
  step: 1,
  patient: null,
  selectedDate: '',
  selectedTime: '',
  showBookingForm: false,
};

interface BookingAction {
  type: string;
  payload?: string | boolean | number | null;
}

const bookingReducer = (state = initialState, action: BookingAction) => {
  switch (action.type) {
    case SET_SYMPTOMS:
      return { ...state, symptoms: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_STEP:
      return { ...state, step: action.payload };
    case SET_PATIENT:
      return { ...state, patient: action.payload };
    case SET_SELECTED_DATE:
      return { ...state, selectedDate: action.payload };
    case SET_SELECTED_TIME:
      return { ...state, selectedTime: action.payload };
    case SET_SHOW_BOOKING_FORM:
      return { ...state, showBookingForm: action.payload };
    default:
      return state;
  }
};

export default bookingReducer;
