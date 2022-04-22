// const { Chart } = require("chart.js");

// import { Chart } from './chart.js';

window.addEventListener('load', function () {
    var aircraftData = {};
    var faaTestData = {};
    function getUserProfile() {
        getAllJobs();
        getAllEmployees();
        // getAllAircrafts();
        // getAllFaaTest();
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
                    createJobChart(rtrn.data)
				}
			}
		};
    }

    function createJobChart(jobData) {
        // oSaveALLJobs.data = jobData;
        console.log(jobData);
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
				}
			}
		};
    }

    function createAircraftChart(aircraftData) {
        
    }

    document.getElementById("jobsChart").addEventListener("click", showAllJobs);
    
    function showAllJobs(event) {
        window.location.href = '/allJobs';
        // console.log(event);
    }
});