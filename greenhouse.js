class GREENHOUSEJOBBOARD {
    constructor() {
        this.tableBody = document.querySelector("[data-item='table']");
        this.jobItem = this.tableBody ? this.tableBody.querySelector("[data-item='job-item']"):null;
        this.tableParent = this.tableBody.parentElement;
        this.jobs = null;
        this.init();
    }
    init() {
        this.loadJobsFromApi();
    }

    loadJobsFromApi() {
        let url = 'https://boards-api.greenhouse.io/v1/boards/element5/departments';
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                this.jobs = data.departments;
                this.appendJobs(this.jobs);
            })
            .catch((err) => console.log(err));
    }

    appendJobs(jobs) {
        if (this.tableBody != undefined && this.jobItem != undefined) {
            if(jobs.length > 0){
                jobs.forEach(job => {
                    if(job.jobs.length>0){
                        let newTable = this.tableBody.cloneNode(true);
                        let department = newTable ? newTable.querySelector("[data-item='department']") : null;
                        department.innerHTML = job.name;
                        job.jobs.forEach(data => {
                            let newJob = this.jobItem.cloneNode(true);
                            let roleLink = newJob ? newJob.querySelector("[data-item='role-link']") : null;
                            let roleText = newJob ? newJob.querySelector("[data-item='role-text']") : null;
                            let location = newJob ? newJob.querySelector("[data-item='location']") : null;
                            let apply = newJob ? newJob.querySelector("[data-item='apply']") : null;
                            
                            roleLink.setAttribute('href', data.absolute_url);
                            roleText.innerHTML = data.title;
                            location.innerHTML = data.location.name;
                            apply.setAttribute("href",data.absolute_url)
                            
                            newTable.querySelector("[data-item='job-item']").parentElement.appendChild(newJob);

                        });

                        this.tableParent.appendChild(newTable)
                        
                        newTable.querySelectorAll("[data-item='job-item']")[0].remove();
                    }
                });

                this.tableBody.remove()
            }
        }
    }
}

new GREENHOUSEJOBBOARD;