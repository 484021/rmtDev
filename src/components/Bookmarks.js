import {
    state,
    bookmarksBtnEl,
    jobDetailsEl,
    jobListBookmarksEl
} from '../common.js';

import renderJobList from './JobList.js';

const clickHandler = (event) => {
    //dont continue if bookmark button wasnt clicked
    if(!event.target.className.includes('bookmark')) return;
    //update state
    if (state.bookmarkJobItems.some(bookmarkJobItem => bookmarkJobItem.id === state.activeJobItem.id)) {
        state.bookmarkJobItems = state.bookmarkJobItems.filter(bookmarkJobItem => bookmarkJobItem.id !== state.activeJobItem.id)
    } else {
        state.bookmarkJobItems.push(state.activeJobItem);
    }
    //persist data with local storage
    localStorage.setItem('bookmarkJobItems',JSON.stringify(state.bookmarkJobItems));
    //update bookmark icon as marked
    document.querySelector('.job-info__bookmark-icon').classList.toggle('job-info__bookmark-icon--bookmarked');
    //renderjoblist in bookmark
    renderJobList();
    

    
};

const mouseEnterHandler = () => {
    // make bookmarks button look active
    bookmarksBtnEl.classList.add('bookmarks-btn--active');

    //make drop down joblist visible
    jobListBookmarksEl.classList.add('job-list--visible');

    //renderJoblist
    renderJobList('bookmarks');
};

const mouseLeaveHandler = () => {
     // make bookmarks button look active
     bookmarksBtnEl.classList.remove('bookmarks-btn--active');

     //make drop down joblist visible
     jobListBookmarksEl.classList.remove('job-list--visible');
};

bookmarksBtnEl.addEventListener('mouseenter', mouseEnterHandler);
jobListBookmarksEl.addEventListener('mouseleave', mouseLeaveHandler);
jobDetailsEl.addEventListener('click', clickHandler);