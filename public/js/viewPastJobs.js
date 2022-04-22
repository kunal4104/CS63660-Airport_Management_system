window.addEventListener('load', function () {
    function getPastJobs() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'api/v1/user/pastJobs', true);
		xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
					console.log(rtrn.data);
					populate(rtrn.data);
				}
			}
		};
		
	}

	getPastJobs();

	function populate(pastJobs) {
		var table = document.getElementById("pastJobsTable");
		pastJobs.forEach((job) => {
			var row = table.insertRow();
			var cell1 = row.insertCell();
			cell1.innerHTML = job.job_id;
			var cell2 = row.insertCell();
			cell2.innerHTML = job.flight_num; 
			var cell3 = row.insertCell();
			cell3.innerHTML = job.date_assigned; 
			var cell4 = row.insertCell();
			cell4.innerHTML = job.test_id; 
			var cell5 = row.insertCell();
			cell5.innerHTML = job.status; 
		});
	}
});