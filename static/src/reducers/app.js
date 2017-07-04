import { SET_GENE } from '../actions';

const initialState = {
	datasource: 'balanced', // source of sample list
	googlesheet: '',
	dataList: [],
	currentStep: 0
};

export const app = (state = initialState, action) => {
	switch (action.type) {

	}
};

export default app;
