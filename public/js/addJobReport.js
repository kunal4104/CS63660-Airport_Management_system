window.addEventListener('load', function () {
    document.getElementById("selectJob").addEventListener("change", showFlightAndTestName);
    document.getElementById("submitReport").addEventListener("click", submitReport);
    pendingJobs = [];
    faaTests = [];
    var addJobReportSuccess = document.getElementById("addJobReportSuccess");
    var addJobReportError = document.getElementById("addJobReportError");

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

        if (postObj.jobId == "") {
            showAlertError("Please select job");
            return;
        }

        if (postObj.dateFinished == "") {
            showAlertError("Please enter completed date");
            return;
        }
        
        var job = pendingJobs.find(x => x.job_id == postObj.jobId);
        var test = faaTests.find(x => x.test_num == job.test_id);
        if (postObj.score == "" || postObj.score > test.max_score) {
            showAlertError("Please enter correct score");
            return;
        }

        if (postObj.hrsSpent == "") {
            showAlertError("Please enter hours spent");
            return;
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
                showUpdateInfo("success");
            }else if (http.readyState == 4 && http.status != 200){
                showUpdateInfo("error");
            }
        }
        http.send(urlEncodedData);
    }

    function showAlertError(state) {
        alert(state);
    }

    function showUpdateInfo(state) {
        if (state === "success") {
            addJobReportError.classList.add("hideInfo")
            addJobReportSuccess.classList.add("showInfo")
        }else {
            addJobReportSuccess.classList.add("hideInfo")
            addJobReportError.classList.add("showInfo")
        }


        var close = document.getElementsByClassName("closebtn");
        var i;

        for (i = 0; i < close.length; i++) {
            close[i].onclick = function(){
                var div = this.parentElement;
                // div.style.opacity = "0";
                setTimeout(function(){ div.classList.remove("showInfo"); }, 600);
            }
        }
    }

});