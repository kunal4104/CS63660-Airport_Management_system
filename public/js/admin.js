window.addEventListener('load', function () {
    aircraftData = {};
    faaTestData = {};
    jobsData = {};
    function getUserProfile() {
        getAllJobs();
        getAllEmployees();
        // createAircraftChart();
    }

    getUserProfile();

    function getAllJobs() {
        var xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/v1/admin/getAllJobs', true);
        xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
                    createJobChart(rtrn.data);
                    getAllAircrafts();
				}
			}
		};
    }

    function createJobChart(jobData) {
        // oSaveALLJobs.data = jobData;
        console.log(jobData);
        jobsData = jobData;
        let newCount =0
        let inProgressCount = 0;
        let completedCount =0;
        for (i in jobData) {
            if (jobData[i].status == 0) {
                newCount++;
            }else if (jobData[i].status == 1) {
                inProgressCount++
            } else if (jobData[i].status == 2) {
                completedCount++;
            }
        }
        
        var xValues = ["New", "In Progress", "Completed"];
        var yValues = [newCount, inProgressCount, completedCount];
        var barColors = [
        "#b91d47",
        "#00aba9",
        "#2b5797"
        ];

        new Chart("jobsChart", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: barColors,
            data: yValues
            }]
        },
        options: {
            title: {
                display: true,
                text: "All Jobs"
            }
        },
        
        });
		
    }

    function getAllEmployees() {
        var xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/v1/admin/getAllEmployees', true);
        xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
                    createEmployeeChart(rtrn.data)
				}
			}
		};
    }

    function createEmployeeChart(empData) {
        console.log(empData);
        let techCount =empData.technician.length;
        let FAACount = empData.FAA.length;

        
        
        var xValues = ["Technician", "FAA employees"];
        var yValues = [techCount, FAACount];
        var barColors = [
        "#b91d47",
        "#00aba9"
        ];

        new Chart("allEmployees", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: barColors,
            data: yValues
            }]
        },
        options: {
            title: {
            display: true,
            text: "All Employees"
            }
        }
        });
		
    }

    function getAllAircrafts() {
        var xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/v1/admin/getAllAircrafts', true);
        xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
                    aircraftData = rtrn.data;
                    // saveVals(aircraftData);
                    getAllFaaTest();
                    
				}
			}
		};
    }

    function getAllFaaTest() {
        var xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/v1/airplane/test', true);
		xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
					faaTestData =rtrn.data;
                    createAircraftChart();
				}
			}
		};
    }
    var aircraftTest = {}
    function createAircraftChart() {
        aircraftData.forEach((airCraft) => {
            aircraftTest[airCraft.registration_no] = [];
            jobsData.forEach((job) => {
                if (job.status == 2 && job.flight_num == airCraft.registration_no) {
                    aircraftTest[airCraft.registration_no].push(job);
                }
            });
        });
        createFaaTestMap();
        getAirCraftTestScore();
        // console.log(aircraftTest)
    }
    testScoreMap = {};
    function createFaaTestMap() {
        faaTestData.forEach((test) => {
            testScoreMap[test['test_num']]= test.max_score;
        })
    }

    function getAirCraftTestScore() {
        let passAircrafts = 0;
        let failAircrafts = 0;

        for (k in aircraftTest) {
            if (aircraftTest[k].length > 0) {
                pass = 0
                aircraftTest[k].forEach((report) => {
                    if (report.score >= (testScoreMap[report.test_id] * .8)) {
                        pass++
                    }
                });

                if (pass == aircraftTest[k].length) {
                    passAircrafts++;
                }else {
                    failAircrafts++
                }
            }else {
                passAircrafts++;
            }
        }

        var xValues = ["Pass", "Fail"];
        var yValues = [passAircrafts, failAircrafts];
        var barColors = [
        "#b91d47",
        "#00aba9"
        ];

        new Chart("allAircrafts", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: barColors,
            data: yValues
            }]
        },
        options: {
            title: {
                display: true,
                text: "All Jobs"
            }
        },
        
        });

    }

    document.getElementById("jobsChart").addEventListener("click", showAllJobs);
    
    function showAllJobs(event) {
        window.location.href = '/allJobs';
        // console.log(event);
    }
});