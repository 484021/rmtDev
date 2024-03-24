import {
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    BASE_API_URL,
    getData,
    state,
    sortingBtnRecentEl,
    sortingBtnRelevantEl
} from '../common.js';

import renderError from './Error.js';
import renderJobList from './JobList.js';
import renderSpinner from './Spinner.js';
import renderPaginationButtons from './Pagination.js'

 const submitHandler = async event => {
    // prevent default behavior
    event.preventDefault();

    // get search text
    const searchText = searchInputEl.value;

    // validation (regex)
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);

    if (patternMatch) {
        renderError('Your search may not contain numbers');
        return;
    }

    //blur input
    searchInputEl.blur();

    //remove previous search/ job items
    jobListSearchEl.innerHTML = '';

    //render spinner
    renderSpinner('search');

    //reset sorting buttons
    sortingBtnRecentEl.classList.remove('sorting__button--active');
    sortingBtnRelevantEl.classList.add('sorting__button--active');

    //fet search results
    try {
        const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);
        //extract job items
        const {jobItems} = data;

        //update state 
        state.searchJobItems = jobItems;
        //update page
        state.currentPage = 1;
        //render pagination buttons
        renderPaginationButtons();

    //remove spinner
    renderSpinner('search')
    //render number of results
    numberEl.textContent = jobItems.length;

    //render job items in search job list
    renderJobList();

    } catch (error) {
        renderSpinner('search');
        renderError(error.message);
    }

 };
 
 searchFormEl.addEventListener('submit', submitHandler);
