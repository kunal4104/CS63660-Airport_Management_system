window.addEventListener('load', function () {
    var modelDetails = {}
    var tName = document.getElementById("tName");
    var tMax = document.getElementById("tMax");

    //var btnaddEmplpyee = document.getElementById("btnaddEmplpyee");
    var btncancelAddFaaTestModel = document.getElementById("btncancelAddFaaTestModel");
    
    var addfaaTestSuccess = document.getElementById("addfaaTestSuccess");
    var addfaaTestError = document.getElementById("addfaaTestError");
    // var saveProfileSettings = document.getElementById("");
    
    document.getElementById("btnAddFaaTestModel").addEventListener("click", addFaaTest);
    btncancelAddFaaTestModel.addEventListener("click", cancelAddFaaTest);

    function addFaaTest() {
        let postObjAddEmp = {
            name: tName.value,
            max_score: tMax.value,
        }

        var http = new XMLHttpRequest();
        var url = '/api/v1/admin/addFaaTest';

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
            addfaaTestError.classList.add("hideInfo")
            addfaaTestSuccess.classList.add("showInfo")
        }else {
            addfaaTestSuccess.classList.add("hideInfo")
            addfaaTestError.classList.add("showInfo")
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

    function cancelAddFaaTest() {
        tName.value = "";
        tMax.value = "";
    }

});