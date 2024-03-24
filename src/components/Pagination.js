import {
    state,
    paginationEl,
    paginationNumberNextEl,
    paginationNumberBackEl,
    paginationBtnNextEl,
    paginationBtnBackEl,
    RESULT_PER_PAGE
} from '../common.js'
import renderJobList from './JobList.js';

const renderPaginationButtons = () => {
    //display back button if we are on page 2 or further
    if(state.currentPage > 1) {
        paginationBtnBackEl.classList.remove('pagination__button--hidden');
    } else {
        paginationBtnBackEl.classList.add('pagination__button--hidden'); 
    }
    //display next button if therea re more job items on next page
    if((state.searchJobItems.length - state.currentPage * RESULT_PER_PAGE) <= 0 ) {
        paginationBtnNextEl.classList.add('pagination__button--hidden');
    } else {
        paginationBtnNextEl.classList.remove('pagination__button--hidden'); 
    }
    //update page numbers
paginationNumberNextEl.textContent = state.currentPage + 1;
paginationNumberBackEl.textContent = state.currentPage - 1;

//unfocus selected button
paginationBtnNextEl.blur();
paginationBtnBackEl.blur();
}
const clickHandler = event => {
    //get clicked button
    const clickedButtonEl = event.target.closest('.pagination__button');

    // stop function if null
    if(!clickedButtonEl) return;

    //check intention if next or previous page
    const nextPage = clickedButtonEl.className.includes('--next') ? true : false;

    //update state
    nextPage ? state.currentPage++ : state.currentPage--;

    //render pagination button
    renderPaginationButtons();

    //render job items for the current page
    renderJobList();


}

paginationEl.addEventListener('click', clickHandler);

export default renderPaginationButtons;