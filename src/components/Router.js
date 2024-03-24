import {
    jobDetailsContentEl,
    BASE_API_URL,
    getData,
    state
} from '../common.js'
import renderJobList from './JobList.js'
import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';
import renderError from './Error.js';

const loadHashChangeHandler = async () => {
    //get id from url
    const id = window.location.hash.substring(1);

    if (id) {
      
        //remove active class from previously active job item
        document.querySelectorAll('.job-item--active').forEach(jobItemWithActiveClass =>jobItemWithActiveClass.classList.remove('job-item--active'));
        //remove previous job details content
        jobDetailsContentEl.innerHTML = '';

        //remove spinner
        renderSpinner('job-details');

        //display job details
        try {
            const data = await getData(`${BASE_API_URL}/jobs/${id}`);
              //extract job item
              const {jobItem} = data;

              //update state
              state.activeJobItem = jobItem;
              //render joblist
              renderJobList();
              //remove spinner
              renderSpinner('job-details');
              //render job details
              renderJobDetails(jobItem);
      
          } catch (error) {
              renderSpinner('job-details');
              renderError(error.message);
          }
      
    }
};

window.addEventListener('DOMContentLoaded', loadHashChangeHandler);
window.addEventListener('hashchange', loadHashChangeHandler);