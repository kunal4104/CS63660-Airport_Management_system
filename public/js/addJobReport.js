window.addEventListener('load', function () {
    document.getElementById("selectJob").addEventListener("change", showFlightAndTestName);
    document.getElementById("submitReport").addEventListener("click", submitReport);
    pendingJobs = [];
    faaTests = [];

    function getInProgressJobs() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'api/v1/user/inProgressJobs', true);
		xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
					pendingJobs = rtrn.data;
                    getAllFaaTest();
				}
			}
		};
		
	}

    getInProgressJobs();

    function getAllFaaTest() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/v1/airplane/test', true);
		xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
					console.log(rtrn.data);
					faaTests = rtrn.data;
					populate();
				}
			}
		};
	}

    function populate() {
        var selectTag = document.getElementById("selectJob");
        pendingJobs.forEach((job) => {
            var option = document.createElement("option");
            option.text = job.job_id;
            selectTag.add(option);
		});
    }

    function showFlightAndTestName() {
        var selectTagValue = document.getElementById("selectJob").value;
        var job = pendingJobs.find(x => x.job_id == selectTagValue);
        var test = faaTests.find(x => x.test_num == job.test_id);
        document.getElementById("div1").style.display = "block";
        document.getElementById("flightNo").innerHTML = job.flight_num;
        document.getElementById("div2").style.display = "block";
        document.getElementById("testName").innerHTML = test.name;
        document.getElementById("uscore").value = "";
        document.getElementById("max_score").innerHTML = " / "+test.max_score;
        document.getElementById("ufDate").value = "";
        document.getElementById("uhr").value = "";
    }

    function submitReport() {
        let postObj = {
            jobId: document.getElementById("selectJob").value,
            dateFinished: document.getElementById("ufDate").value,
            score: document.getElementById("uscore").value,
            hrsSpent: document.getElementById("uhr").value,
            status: '2',
        }

        var http = new XMLHttpRequest();
        var url = 'api/v1/user/assignedJobs';

        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        let urlEncodedData = "", urlEncodedDataPairs = [], name;
        for( name in postObj ) {
            urlEncodedDataPairs.push(encodeURIComponent(name)+'='+encodeURIComponent(postObj[name]));
        }
        urlEncodedData = urlEncodedDataPairs.join("&");
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                showUpdateInfo("Report submitted successfully");
            }else if (http.readyState == 4 && http.status != 200){
                showUpdateInfo("Resport submission failed");
            }
        }
        http.send(urlEncodedData);
    }

    function showUpdateInfo(state) {
        alert(state);
    }
});