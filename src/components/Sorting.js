import {
    sortingBtnRecentEl,
    sortingEl,
    sortingBtnRelevantEl,
    state
} from "../common.js";
import renderJobList from "./JobList.js";
import renderPaginationButtons from "./Pagination.js";


const clickHandler = (event) => {
    //get clicked button element
    const clickedButtonEl = event.target.closest('.sorting__button');

    //stop function if no clicked button element
    if(!clickedButtonEl) return;

    //update page to 1
    state.currentPage = 1;

    //check if intetntion is recent or relevant sorting
    const recent = clickedButtonEl.className.includes('--recent') ? true : false;

    //make button active depending on where clicked
    if(recent) {
        sortingBtnRecentEl.classList.add('sorting__button--active');
        sortingBtnRelevantEl.classList.remove('sorting__button--active');
    } else {
        sortingBtnRecentEl.classList.remove('sorting__button--active');
        sortingBtnRelevantEl.classList.add('sorting__button--active');

    }
    if (recent) {
        state.searchJobItems.sort((a,b) => {
            return a.daysAgo - b.daysAgo;
        });
    } else {
        state.searchJobItems.sort((a,b) => {
            return  b.relevanceScore - a.relevanceScore;
        });
    }
    //render pagination buttons
    renderPaginationButtons();
    //render job items in list
    renderJobList();

};;

sortingEl.addEventListener('click', clickHandler);

