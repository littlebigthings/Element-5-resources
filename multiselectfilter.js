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
        this.searchInput = document.querySelector("[data-item='search']");

        this.jobs = null;
        this.locationArr = [];

        this.clickedOnLocation = [];
        this.clickedOndepartment = [];
        this.clickedOnLocationName = [];
        this.clickedOnDepartmentName = [];

        this.filteredDepartments = [];
        this.filteredLocations = [];
        this.filteredRoles = [];
        this.init();
    }
    init() {
        // this.loadJobsFromApi();
        this.loadJobsFromCms();
    }

    loadJobsFromCms() {
        if (jobsObject != undefined) {
            let newDepartmentObj = [];

            if (jobsObject.departments.length > 0) {
                jobsObject.departments.forEach(department => {
                    // console.log(department)
                    let jobItem = {
                        "absolute_url": department.jobURL,
                        "location": {
                            "name": department.jobLocation,
                        },
                        "title": department.job,
                    }

                    if (newDepartmentObj.length > 0) {
                        let filterDept = newDepartmentObj.filter(newDepartment => {
                            return newDepartment.name === department.name
                        })
                        if (filterDept.length > 0) {
                            filterDept[0].jobs.push(jobItem)
                        }else{
                            newDepartmentObj.push({
                                "name": department.name,
                                "jobs": [jobItem]
                            })
                        }
                    } else {
                        newDepartmentObj.push({
                            "name": department.name,
                            "jobs": [jobItem]
                        })
                    }
                });

                this.appendJobs(newDepartmentObj)
            }
        }
    }
    // loadJobsFromApi() {
    //     let url = 'https://boards-api.greenhouse.io/v1/boards/element5/departments';
    //     fetch(url)
    //         .then((res) => {
    //             if (res.ok) {
    //                 return res.json();
    //             }
    //         })
    //         .then((data) => {
    //             this.jobs = data.departments;
    //             this.appendJobs(this.jobs);
    //         })
    //         .catch((err) => console.log(err));
    // }



    appendJobs(jobs) {
        if (this.tableBody != undefined && this.jobItem != undefined) {
            if (jobs.length > 0) {
                jobs.forEach(job => {
                    if (job.jobs.length > 0) {
                        let newTable = this.tableBody.cloneNode(true),
                            department = newTable ? newTable.querySelector("[data-item='department']") : null;
                        department.innerHTML = job.name;
                        department.setAttribute('data-dept', this.convertToSlug(job.name));
                        if (department != null) {
                            let newDepartment = this.departmentItem.cloneNode(true);
                            newDepartment.innerHTML = job.name;
                            newDepartment.setAttribute('search-dept', this.convertToSlug(job.name));
                            newDepartment.setAttribute("is-active", false);
                            this.departmentList.appendChild(newDepartment)
                        }
                        job.jobs.forEach(data => {
                            let newJob = this.jobItem.cloneNode(true),
                                roleLink = newJob ? newJob.querySelector("[data-item='role-link']") : null,
                                roleText = newJob ? newJob.querySelector("[data-item='role-text']") : null,
                                location = newJob ? newJob.querySelector("[data-item='location']") : null,
                                apply = newJob ? newJob.querySelector("[data-item='apply']") : null;

                            roleLink.setAttribute('href', data.absolute_url);
                            roleText.innerHTML = data.title;
                            roleText.setAttribute('search-role', data.title.toLowerCase());
                            location.innerHTML = data.location.name;
                            location.setAttribute('data-location', this.convertToSlug(data.location.name));

                            if (!this.locationArr.includes(data.location.name)) {

                                this.locationArr.push(data.location.name);
                                let newLocation = this.locationItem.cloneNode(true);
                                newLocation.innerHTML = data.location.name;
                                newLocation.setAttribute('search-location', this.convertToSlug(data.location.name));
                                newLocation.setAttribute('is-active', false);
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
                let clickedElm = e.target,
                    isActive = clickedElm.getAttribute("is-active"),
                    departmentName = e.target.getAttribute('search-dept');

                if (departmentName == 'all-departments') {
                    this.clickedOndepartment = [];
                }
                else if (isActive == "false") {
                    clickedElm.classList.add("active")
                    clickedElm.setAttribute("is-active", true);
                    this.clickedOndepartment.push(departmentName);
                    this.clickedOnDepartmentName.push(e.target.innerText);
                }
                else if (isActive == "true") {
                    child.classList.remove("active")
                    clickedElm.setAttribute("is-active", false);
                    let idx = this.clickedOndepartment.indexOf(departmentName),
                        idxName = this.clickedOnDepartmentName.indexOf(e.target.innerText)
                    this.clickedOndepartment.splice(idx, 1);
                    this.clickedOnDepartmentName.splice(idxName, 1);
                }

                this.changeHeadName({
                    check: this.clickedOndepartment,
                    getName: this.clickedOnDepartmentName,
                    setHead: this.departmentDropDownHead,
                })

                if (this.clickedOndepartment.length > 0) {
                    let getDepartment = [];
                    this.clickedOndepartment.forEach(dept => {
                        getDepartment.push(...document.querySelectorAll(`[data-dept='${dept}']`));
                    })
                    this.filteredDepartments = getDepartment.length > 0 ? getDepartment.map(dept => dept.closest("[data-item='table']")) : null;
                    this.filterJobs()
                }
                else {
                    this.resetFilter(true, false)
                }
            })
        })
        this.locationList.childNodes.forEach(child => {
            child.addEventListener('click', (e) => {
                let clickedElm = e.target,
                    isActive = clickedElm.getAttribute("is-active"),
                    locationName = e.target.getAttribute('search-location');

                if (locationName == 'all-locations') {
                    this.clickedOnLocation = [];
                }
                else if (isActive == "false") {
                    child.classList.add("active")
                    clickedElm.setAttribute("is-active", true);
                    this.clickedOnLocation.push(locationName);
                    this.clickedOnLocationName.push(e.target.innerText);
                }
                else if (isActive == "true") {
                    clickedElm.classList.remove("active")
                    clickedElm.setAttribute("is-active", false);
                    let idx = this.clickedOnLocation.indexOf(locationName),
                        idxName = this.clickedOnLocationName.indexOf(e.target.innerText);
                    this.clickedOnLocation.splice(idx, 1);
                    this.clickedOnLocationName.splice(idxName, 1);
                }

                this.changeHeadName({
                    check: this.clickedOnLocation,
                    getName: this.clickedOnLocationName,
                    setHead: this.locationDropDownHead,
                })

                if (this.clickedOnLocation.length > 0) {
                    let getLocations = [];
                    this.clickedOnLocation.forEach(loc => {
                        getLocations.push(...document.querySelectorAll(`[data-location='${loc}']`));
                    })
                    this.filteredLocations = getLocations.length > 0 ? getLocations.map(loc => loc.closest("[data-item='job-item']")) : null;
                    this.filterJobs()
                }
                else {
                    this.resetFilter(false, true)
                }
            })
        })

        this.searchInput.addEventListener("input", (e) => {
            let inpData = e.target.value;
            let getJobs = [...document.querySelectorAll("[data-item='role-text']")]

            this.filteredRoles = getJobs.map(item => {
                let jobRole = item.getAttribute('search-role');
                if (jobRole.includes(inpData)) {
                    return item.closest("[data-item='job-item']");
                }
            })
            this.filterJobs();
        })
    }


    filterJobs() {
        let allTablesArr = this.tableParent.querySelectorAll("[data-item='table']");
        if (allTablesArr.length > 0) {
            if (this.filteredDepartments.length > 0) {
                if (this.filteredLocations.length > 0) {
                    if (this.filteredRoles.length > 0) {
                        allTablesArr.forEach(table => {
                            let allLocations = [...table.querySelectorAll("[data-item='job-item']")];
                            allLocations.forEach(locationItem => {
                                if (this.filteredLocations.includes(locationItem) && this.filteredRoles.includes(locationItem)) {
                                    locationItem.classList.remove("hide");
                                }
                                else {
                                    locationItem.classList.add("hide");
                                }
                            })
                            let checkAllhideChild = this.returnChilds(allLocations);
                            if (this.filteredDepartments.includes(table)) {
                                table.classList.remove("hide");
                            }
                            else {
                                table.classList.add("hide")
                            }
                            if (checkAllhideChild.length <= 0 && this.filteredDepartments.includes(table)) {
                                table.classList.remove("hide")
                            }
                            else if (checkAllhideChild.length == allLocations.length && this.filteredDepartments.includes(table)) {
                                table.classList.add("hide")
                            }
                        })
                    }
                    else {

                        allTablesArr.forEach(table => {
                            let allLocations = [...table.querySelectorAll("[data-item='job-item']")];
                            allLocations.forEach(locationItem => {
                                if (this.filteredLocations.includes(locationItem)) {
                                    locationItem.classList.remove("hide");
                                }
                                else {
                                    locationItem.classList.add("hide");
                                }
                            })
                            let checkAllhideChild = this.returnChilds(allLocations);
                            if (this.filteredDepartments.includes(table)) {
                                table.classList.remove("hide");
                            }
                            else {
                                table.classList.add("hide")
                            }
                            if (checkAllhideChild.length <= 0 && this.filteredDepartments.includes(table)) {
                                table.classList.remove("hide")
                            }
                            else if (checkAllhideChild.length == allLocations.length && this.filteredDepartments.includes(table)) {
                                table.classList.add("hide")
                            }
                        })
                    }
                }
                else {
                    if (this.filteredRoles.length > 0) {

                        allTablesArr.forEach(table => {
                            if (this.filteredDepartments.includes(table)) {
                                table.classList.remove("hide");
                            }
                            else {
                                table.classList.add("hide")
                            }
                            let allLocations = [...table.querySelectorAll("[data-item='job-item']")];
                            allLocations.forEach(locationItem => {
                                if (this.filteredRoles.includes(locationItem) && this.filteredDepartments.includes(table)) {
                                    locationItem.classList.remove("hide");
                                }
                                else {
                                    locationItem.classList.add("hide")
                                }
                            })
                            let checkAllhideChild = this.returnChilds(allLocations);

                            if (checkAllhideChild.length <= 0) {
                                table.classList.remove("hide")
                            }
                            else if (checkAllhideChild.length == allLocations.length) {
                                table.classList.add("hide")
                            }
                        })
                    }
                    else {

                        allTablesArr.forEach(table => {
                            if (this.filteredDepartments.includes(table)) {
                                table.classList.remove("hide");
                            }
                            else {
                                table.classList.add("hide")
                            }
                            let allLocations = table.querySelectorAll("[data-item='job-item']");
                            allLocations.forEach(locationItem => {
                                locationItem.classList.remove("hide");
                            })
                        })
                    }
                }
            }
            else if (this.filteredDepartments.length == 0) {
                if (this.filteredLocations.length > 0) {
                    if (this.filteredRoles.length > 0) {

                        allTablesArr.forEach(table => {
                            let allLocations = [...table.querySelectorAll("[data-item='job-item']")];
                            allLocations.forEach(locationItem => {
                                if (this.filteredLocations.includes(locationItem) && this.filteredRoles.includes(locationItem)) {
                                    locationItem.classList.remove("hide");
                                }
                                else {
                                    locationItem.classList.add("hide");
                                }
                            })
                            let checkAllhideChild = this.returnChilds(allLocations);
                            table.classList.remove("hide")
                            if (checkAllhideChild.length <= 0) {
                                table.classList.remove("hide")
                            }
                            else if (checkAllhideChild.length == allLocations.length) {
                                table.classList.add("hide")
                            }
                        })
                    }
                    else {

                        allTablesArr.forEach(table => {
                            let allLocations = [...table.querySelectorAll("[data-item='job-item']")];
                            allLocations.forEach(locationItem => {
                                if (this.filteredLocations.includes(locationItem)) {
                                    locationItem.classList.remove("hide");
                                }
                                else {
                                    locationItem.classList.add("hide");
                                }
                            })
                            let checkAllhideChild = this.returnChilds(allLocations);
                            table.classList.remove("hide")
                            if (checkAllhideChild.length <= 0) {
                                table.classList.remove("hide")
                            }
                            else if (checkAllhideChild.length == allLocations.length) {
                                table.classList.add("hide")
                            }
                        })
                    }
                }
                else if (this.filteredRoles.length > 0) {

                    allTablesArr.forEach(table => {
                        let allLocations = [...table.querySelectorAll("[data-item='job-item']")];
                        allLocations.forEach(locationItem => {
                            if (this.filteredRoles.includes(locationItem)) {
                                locationItem.classList.remove("hide");
                            }
                            else {
                                locationItem.classList.add("hide");
                            }
                        })
                        let checkAllhideChild = this.returnChilds(allLocations);
                        table.classList.remove("hide")
                        if (checkAllhideChild.length <= 0) {
                            table.classList.remove("hide")
                        }
                        else if (checkAllhideChild.length == allLocations.length) {
                            table.classList.add("hide")
                        }
                    })
                }
                else {
                    allTablesArr.forEach(table => {
                        table.classList.remove("hide");
                        let allLocations = table.querySelectorAll("[data-item='job-item']");
                        allLocations.forEach(locationItem => {
                            locationItem.classList.remove("hide");
                        })
                    })
                }
            }
        }
    }

    returnChilds(item) {
        let child = [...item.filter(loc => {
            if (loc.classList.contains('hide')) {
                return loc
            }
        })];
        return child
    }

    convertToSlug(Text) {
        return Text.toLowerCase()
            .replace(/[^\w ]+/g, "")
            .replace(/ +/g, "-");
    }

    resetFilter(department, location) {
        if (department) {
            this.departmentDropDownHead.innerHTML = "All Departments";
            this.filteredDepartments = [];
            this.clickedOnDepartmentName = [];
            this.departmentList.childNodes.forEach(child => {
                child.setAttribute("is-active", false)
                child.classList.remove("active")
            })
            this.filterJobs();
        }
        else if (location) {
            this.locationDropDownHead.innerHTML = "All locations";
            this.filteredLocations = [];
            this.clickedOnLocationName = [];
            this.locationList.childNodes.forEach(child => {
                child.classList.remove("active")
                child.setAttribute("is-active", false)
            })
            this.filterJobs();
        }
    }

    changeHeadName(nameObj) {
        if (nameObj.check.length > 1) {
            nameObj.setHead.innerHTML = `${nameObj.getName[0]} +${nameObj.check.length - 1} More`;
        }
        else {
            nameObj.setHead.innerHTML = `${nameObj.getName[0]}`;
        }
    }
}

new GREENHOUSEJOBBOARD;