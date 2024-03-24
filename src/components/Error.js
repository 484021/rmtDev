import {
    errorTextEl,
    errorEl,
    DEAULT_DISPLAY_TIME
} from '../common.js'

const renderError = (message = 'Something went wrong') => {
    errorTextEl.textContent = message;
    errorEl.classList.add('error--visible');
    setTimeout(() => {
        errorEl.classList.remove('error--visible');
    },DEAULT_DISPLAY_TIME);
}

export default renderError;