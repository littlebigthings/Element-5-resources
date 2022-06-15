class GREENHOUSEJOBBOARD {
    constructor() {

        this.tableBody = document.querySelector("[data-item='table']");
        this.jobItem = this.tableBody ? this.tableBody.querySelector("[data-item='job-item']") : null;
        this.tableParent = this.tableBody.parentElement;

        this.departmentDropDownHead = document.querySelector("[data-item='department-default']");
        this.departmentList = document.querySelector("[data-item='department-list']");
        this.departmentItem = this.departmentList ? this.departmentList.querySelector("[data-item='department']") : null;

        this.locationDropDownHead = document.querySelector("[data-item='location-default']");
        this.locationList = document.querySelector("[data-item='location-list']");
        this.locationItem = this.locationList ? this.locationList.querySelector("[data-item='location']") : null;

        this.jobs = null;
        this.locationArr = [];

        this.clickedOnLocation = null;
        this.clickedOndepartment = null;
        this.lastSearch = null;

        this.filteredDepartments = [];
        this.filteredLocations = [];
        this.filteredRoles = [];
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
            if (jobs.length > 0) {
                jobs.forEach(job => {
                    if (job.jobs.length > 0) {
                        let newTable = this.tableBody.cloneNode(true);
                        let department = newTable ? newTable.querySelector("[data-item='department']") : null;
                        department.innerHTML = job.name;
                        department.setAttribute('data-dept', this.convertToSlug(job.name));
                        if (department != null) {
                            let newDepartment = this.departmentItem.cloneNode(true);
                            newDepartment.innerHTML = job.name;
                            newDepartment.setAttribute('search-dept', this.convertToSlug(job.name));
                            this.departmentList.appendChild(newDepartment)
                        }
                        job.jobs.forEach(data => {
                            let newJob = this.jobItem.cloneNode(true);
                            let roleLink = newJob ? newJob.querySelector("[data-item='role-link']") : null;
                            let roleText = newJob ? newJob.querySelector("[data-item='role-text']") : null;
                            let location = newJob ? newJob.querySelector("[data-item='location']") : null;
                            let apply = newJob ? newJob.querySelector("[data-item='apply']") : null;

                            roleLink.setAttribute('href', data.absolute_url);
                            roleText.innerHTML = data.title;
                            roleText.setAttribute('search-role', this.convertToSlug(data.title));
                            location.innerHTML = data.location.name;
                            location.setAttribute('data-location', this.convertToSlug(data.location.name));

                            if (!this.locationArr.includes(data.location.name)) {

                                this.locationArr.push(data.location.name);
                                let newLocation = this.locationItem.cloneNode(true);
                                newLocation.innerHTML = data.location.name;
                                newLocation.setAttribute('search-location', this.convertToSlug(data.location.name));
                                this.locationList.appendChild(newLocation);

                            }

                            apply.setAttribute("href", data.absolute_url)

                            newTable.querySelector("[data-item='job-item']").parentElement.appendChild(newJob);

                        });

                        this.tableParent.appendChild(newTable)

                        newTable.querySelectorAll("[data-item='job-item']")[0].remove();
                    }
                });

                this.tableBody.remove()
                this.addFilters();
            }
        }
    }

    addFilters() {
        this.departmentList.childNodes.forEach(child => {
            child.addEventListener('click', (e) => {
                this.clickedOndepartment = e.target.getAttribute('search-dept');
                this.departmentDropDownHead.innerHTML = e.target.innerHTML;
                if (this.clickedOndepartment.length > 0) {
                    if (this.clickedOndepartment != 'all-departments') {
                        let getDepartment = [...document.querySelectorAll(`[data-dept='${this.clickedOndepartment}']`)];
                        this.filteredDepartments = getDepartment.length > 0 ? getDepartment.map(dept => dept.closest("[data-item='table']")) : null;
                        this.filterJobs()
                    }
                    else {
                        this.filteredDepartments = [];
                        this.showAllJobs()
                    }
                }
            })
        })
        this.locationList.childNodes.forEach(child => {
            child.addEventListener('click', (e) => {
                this.clickedOnLocation = e.target.getAttribute('search-location');
                this.locationDropDownHead.innerHTML = e.target.innerHTML;
                if (this.clickedOnLocation.length > 0) {
                    if (this.clickedOnLocation != 'all-locations') {
                        let getLocation = [...document.querySelectorAll(`[data-location='${this.clickedOnLocation}']`)];
                        this.filteredLocations = getLocation.length > 0 ? getLocation.map(dept => dept.closest("[data-item='job-item']")) : null;
                        this.filterJobs()
                    }
                    else {
                        this.filteredLocations = [];
                        this.showAllLocations()
                    }
                }
            })
        })
    }

    filterJobs() {
        let allTablesArr = document.querySelectorAll("[data-item='table']");
        if (allTablesArr.length > 0) {
            if (this.filteredDepartments.length > 0) {
                allTablesArr.forEach(table => {
                    if (this.filteredDepartments.includes(table)) {
                        table.classList.remove("hide")
                    }
                    else {
                        table.classList.add("hide")
                    }
                    if (this.filteredLocations.length > 0) {
                        let allLocations = [...table.querySelectorAll("[data-item='job-item']")];
                        allLocations.forEach(locItem => {
                            if (!this.filteredLocations.includes(locItem)) {
                                locItem.classList.add("hide");
                            }
                            else {
                                locItem.classList.remove("hide");
                            }
                            let allChilds = [...allLocations.filter(loc => {
                                if (loc.classList.contains('hide')) {
                                    return loc
                                }
                            })];
                            if (allChilds.length == allLocations.length) {
                                table.classList.add("hide")
                            }
                        })
                    }
                })
            }
            else if (this.filteredLocations.length > 0) {
                allTablesArr.forEach(table => {
                    let allLocations = [...table.querySelectorAll("[data-item='job-item']")];
                    allLocations.forEach(locItem => {
                        if (!this.filteredLocations.includes(locItem)) {
                            locItem.classList.add("hide");
                        }
                        else {
                            locItem.classList.remove("hide");
                        }
                        let allChilds = [...allLocations.filter(loc => {
                            if (loc.classList.contains('hide')) {
                                return loc
                            }
                        })];
                        if (allChilds.length <= 0) {
                            table.classList.remove("hide")
                        }
                        else if (allChilds.length == allLocations.length) {
                            table.classList.add("hide")
                        }
                    })

                })
            }
        }

    }

    showAllJobs() {
        let allTablesArr = document.querySelectorAll("[data-item='table']");
        if (allTablesArr.length > 0) {
            allTablesArr.forEach(item => {
                if (item.classList.contains('hide')) item.classList.remove('hide')
            })
        }
    }

    showAllLocations() {
        let allTablesArr = document.querySelectorAll("[data-item='job-item']");
        if (allTablesArr.length > 0) {
            allTablesArr.forEach(item => {
                if (item.classList.contains('hide')) item.classList.remove('hide')
            })
        }
    }

    convertToSlug(Text) {
        return Text.toLowerCase()
            .replace(/[^\w ]+/g, "")
            .replace(/ +/g, "-");
    }
}

new GREENHOUSEJOBBOARD;