// actions/bookingActions.ts

export const SET_SYMPTOMS = 'SET_SYMPTOMS';
export const SET_LOADING = 'SET_LOADING';
export const SET_STEP = 'SET_STEP';
export const SET_PATIENT = 'SET_PATIENT';
export const SET_SELECTED_DATE = 'SET_SELECTED_DATE';
export const SET_SELECTED_TIME = 'SET_SELECTED_TIME';
export const SET_SHOW_BOOKING_FORM = 'SET_SHOW_BOOKING_FORM';

export const setSymptoms = (symptoms: string) => ({
  type: SET_SYMPTOMS,
  payload: symptoms,
});

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setStep = (step: number) => ({
  type: SET_STEP,
  payload: step,
});

export const setPatient = (patient: IPatient) => ({
  type: SET_PATIENT,
  payload: patient,
});

export const setSelectedDate = (date: string) => ({
  type: SET_SELECTED_DATE,
  payload: date,
});

export const setSelectedTime = (time: string) => ({
  type: SET_SELECTED_TIME,
  payload: time,
});

export const setShowBookingForm = (show: boolean) => ({
  type: SET_SHOW_BOOKING_FORM,
  payload: show,
});
