const INITIAL_STATE = {
    files: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'file':
            return { ...state, files: action.payload };
        default:
            return INITIAL_STATE;
    }
}