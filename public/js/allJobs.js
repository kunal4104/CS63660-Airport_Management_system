

window.addEventListener('load', function () {
	function getAssignedJobs() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/v1/admin/getAllJobs', true);
        xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
                    populate(rtrn.data)
				}
			}
		};
		// populate(oSaveALLJobs);
	}

	getAssignedJobs();

	function populate(assignedJobs) {
		var NewTable = document.getElementById("allNewJobsTable");
        var inProgressTable = document.getElementById("allInProgressJobsTable");
        var finishedTable = document.getElementById("allFinishedJobsTable");
		assignedJobs.forEach((job) => {
            if (job.status == 0) {
                let row = NewTable.insertRow();
                let cell1 = row.insertCell();
                cell1.innerHTML = job.job_id;
                let cell2 = row.insertCell();
                cell2.innerHTML = job.flight_num; 
                let cell3 = row.insertCell();
                cell3.innerHTML = job.date_assigned; 
                let cell4 = row.insertCell();
                cell4.innerHTML = job.test_id; 
                let cell5 = row.insertCell();
                cell5.innerHTML = job.technician_id; 
            } else if (job.status == 1) {
                let row = inProgressTable.insertRow();
                let cell1 = row.insertCell();
                cell1.innerHTML = job.job_id;
                let cell2 = row.insertCell();
                cell2.innerHTML = job.flight_num; 
                let cell3 = row.insertCell();
                cell3.innerHTML = job.date_assigned; 
                let cell4 = row.insertCell();
                cell4.innerHTML = job.test_id; 
                let cell5 = row.insertCell();
                cell5.innerHTML = job.technician_id; 
            } else if (job.status == 2) {
                let row = finishedTable.insertRow();
                let cell1 = row.insertCell();
                cell1.innerHTML = job.job_id;
                let cell2 = row.insertCell();
                cell2.innerHTML = job.flight_num; 
                let cell3 = row.insertCell();
                cell3.innerHTML = job.date_assigned; 
                let cell4 = row.insertCell();
                cell4.innerHTML = job.test_id; 
                let cell5 = row.insertCell();
                cell5.innerHTML = job.technician_id; 
                let cell6 = row.insertCell();
                cell6.innerHTML = job.date_finished; 
                let cell7 = row.insertCell();
                cell7.innerHTML = job.hours_spent; 
                let cell8 = row.insertCell();
                cell8.innerHTML = job.score; 
            }
			
		});
	}
});
