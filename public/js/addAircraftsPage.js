window.addEventListener('load', function () {
    var modelDetails = {};
    var modelDetailMap = {};
    var aModel = document.getElementById("aModel");
    var aRegNum = document.getElementById("aRegNum");
    var aCapacity = document.getElementById("aCapacity");
    var aBuild = document.getElementById("aBuild");
    var aWeight = document.getElementById("aWeight");

    //var btnaddEmplpyee = document.getElementById("btnaddEmplpyee");
    var btncancelAddAircraft = document.getElementById("btncancelAddAircraft");
    
    var addAircraftSuccess = document.getElementById("addAircraftSuccess");
    var addAircraftError = document.getElementById("addAircraftError");
    // var saveProfileSettings = document.getElementById("");
    aModel.addEventListener("change", changeModel);
    document.getElementById("btnaddAircraft").addEventListener("click", addAircrafts);
    btncancelAddAircraft.addEventListener("click", cancelAddEmployees);


    
    function getModels() {
        var xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/v1/admin/getAircraftModels', true);
        xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
                    modelDetails = rtrn.data;
                    createModelMap(modelDetails);
                    fillValues(rtrn.data);
				}
			}
		};
		
    }
    getModels();

    function createModelMap(modelData) {
        for (let i = 0; i < modelData.length; i++) {

            modelDetailMap[modelData[i].model_num] = {
                model_num: modelData[i].model_num,
                name: modelData[i].name,
                weight: modelData[i].weight,
                capacity: modelData[i].capacity
            }
        }
    }

    function fillValues(modelData) {
        for (let i = 0; i < modelData.length; i++) {
            modelName = modelData[i].model_num;
            // modelDetails.modelName = modelData[i];
            aModel.add(new Option(modelData[i].model_num, modelData[i].model_num));
        }
    }

    function changeModel() {
        modelName = aModel.value;
        if (modelName === "Blank") {
            aCapacity.value = "";
            aBuild.value = "";
            aWeight.value = "";
            aRegNum.value = "";
        }else {
            oModelData = modelDetailMap[modelName]
            // oModelData = modelDetails.modelName;
            aRegNum.value = "";
            aCapacity.value = oModelData.capacity;
            aBuild.value = oModelData.name;
            aWeight.value = oModelData.weight;
        }
        
    }


    function addAircrafts() {
        let postObjAddEmp = {
            model: aModel.value,
            registration_no: aRegNum.value,
        }

        var http = new XMLHttpRequest();
        var url = '/api/v1/admin/addAircrafts';

        http.open('POST', url, true);

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        let urlEncodedData = "", urlEncodedDataPairs = [], name;
        for( name in postObjAddEmp ) {
            urlEncodedDataPairs.push(encodeURIComponent(name)+'='+encodeURIComponent(postObjAddEmp[name]));
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

    function showUpdateInfo(state) {
        if (state === "success") {
            addAircraftError.classList.add("hideInfo")
            addAircraftSuccess.classList.add("showInfo")
        }else {
            addAircraftSuccess.classList.add("hideInfo")
            addAircraftError.classList.add("showInfo")
        }


        var close = document.getElementsByClassName("closebtn");
        var i;

        for (i = 0; i < close.length; i++) {
            close[i].onclick = function(){
                var div = this.parentElement;
                div.style.opacity = "0";
                setTimeout(function(){ div.style.display = "none"; }, 600);
            }
        }
    }

    function cancelAddEmployees() {
        aModel.value = "Blank";
        aCapacity.value = "";
        aBuild.value = "";
        aWeight.value = "";
        aRegNum.value = "";
    }

});