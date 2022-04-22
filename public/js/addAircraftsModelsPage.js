window.addEventListener('load', function () {
    var modelDetails = {}
    var amName = document.getElementById("amName");
    var amModelNum = document.getElementById("amModelNum");
    var amCapacity = document.getElementById("amCapacity");
    var amWeight = document.getElementById("amWeight");


    //var btnaddEmplpyee = document.getElementById("btnaddEmplpyee");
    var btncancelAddAircraftModel = document.getElementById("btncancelAddAircraftModel");
    
    var addAircrafModeltSuccess = document.getElementById("addAircrafModeltSuccess");
    var addAircraftModelError = document.getElementById("addAircraftModelError");
    // var saveProfileSettings = document.getElementById("");
    
    document.getElementById("btnaddAircraftModel").addEventListener("click", addAircraftsModels);
    btncancelAddAircraftModel.addEventListener("click", cancelAddAircrafts);

    function addAircraftsModels() {
        let postObjAddEmp = {
            name: amName.value,
            model_num: amModelNum.value,
            capacity: amCapacity.value,
            weight:amWeight.value,
        }

        var http = new XMLHttpRequest();
        var url = '/api/v1/admin/addAircraftsModels';

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
            addAircraftModelError.classList.add("hideInfo")
            addAircrafModeltSuccess.classList.add("showInfo")
        }else {
            addAircrafModeltSuccess.classList.add("hideInfo")
            addAircraftModelError.classList.add("showInfo")
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

    function cancelAddAircrafts() {
        amName.value = "";
        amModelNum.value = "";
        amCapacity.value = "";
        amWeight.value = "";
    }

});