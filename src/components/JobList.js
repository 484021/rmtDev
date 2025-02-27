
 //JOB LIST COMPONENT IMPORTS
 import {
    jobListSearchEl,
    jobDetailsContentEl,
    BASE_API_URL,
    getData,
    state,
    RESULT_PER_PAGE,
    jobListBookmarksEl
} from '../common.js';

import renderError from './Error.js';

import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';

//render job list
const renderJobList = (whichJobList = 'search') => {
    //determine correct selector for joblist (search or bookmarks)
    const jobListEl = whichJobList === 'search' ? jobListSearchEl : jobListBookmarksEl;
    //remove previous job items 
    jobListEl.innerHTML = '';

    //determine job items to be render
    let jobItems;
    if(whichJobList === 'search'){
       jobItems = state.searchJobItems.slice(state.currentPage * RESULT_PER_PAGE - RESULT_PER_PAGE,state.currentPage * RESULT_PER_PAGE);
    } else if (whichJobList === 'bookmarks') {
        jobItems = state.bookmarkJobItems;
    };
    
    //display job items
    jobItems.forEach(jobItem => {
        const newJobItemHTML = `
        <li class="job-item ${state.activeJobItem.id === jobItem.id ? 'job-item--active' : ''}">
        <a class="job-item__link" href="${jobItem.id}">
            <div class="job-item__badge">${jobItem.badgeLetters}</div>
            <div class="job-item__middle">
                <h3 class="third-heading">${jobItem.title}</h3>
                <p class="job-item__company">${jobItem.company}</p>
                <div class="job-item__extras">
                    <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}</p>
                    <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobItem.salary}</p>
                    <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}</p>
                </div>
            </div>
            <div class="job-item__right">
                <i class="fa-solid fa-bookmark job-item__bookmark-icon ${state.bookmarkJobItems.some(bookmarkJobItem => bookmarkJobItem.id === jobItem.id) && 'job-item__bookmark-icon--bookmarked'}"></i>
                <time class="job-item__time">${jobItem.daysAgo}</time>
            </div>
        </a>
    </li>
    `;
    jobListEl.insertAdjacentHTML('beforeend',newJobItemHTML);
    });

}

 const clickHandler = async event => {
    //prevent default behavior
    event.preventDefault();

    //get clicked job item
    const jobItemEl = event.target.closest('.job-item');

    //remove active class from previously active job item
    document.querySelectorAll('.job-item--active').forEach(jobItemWithActiveClass =>jobItemWithActiveClass.classList.remove('job-item--active'));

    //empty the job details section
    jobDetailsContentEl.innerHTML = '';
    
    //render spinner job details
    renderSpinner('job-list');
    // get the id of the selected job item
    const id = jobItemEl.children[0].getAttribute('href');

    //update state with current job detail
    const allJobItems = [...state.searchJobItems, ...state.bookmarkJobItems];
    state.activeJobItem = allJobItems.find(jobItem => jobItem.id === +id);

    //render joblist
    renderJobList();

    //add id to url
    history.pushState(null,'', `/#${id}`)

    try {
      const data = await getData(`${BASE_API_URL}/jobs/${id}`);
        //extract job item
        const {jobItem} = data;
        //remove spinner
        renderSpinner('job-details');
        //render job details
        renderJobDetails(jobItem);

    } catch (error) {
        renderSpinner('job-details');
        renderError(error.message);
    }

};

 jobListSearchEl.addEventListener('click', clickHandler);
 jobListBookmarksEl.addEventListener('click', clickHandler);


 export default renderJobList;
