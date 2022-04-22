window.addEventListener('load', function () {
    var modelDetails = {}
    var uName = document.getElementById("uName");
    var uUid = document.getElementById("uUid");
    var uFname = document.getElementById("uFname");
    var uDateF = document.getElementById("uDateF");


    //var btnaddEmplpyee = document.getElementById("btnaddEmplpyee");
    var btncancelAddUnion = document.getElementById("btncancelAddUnion");
    
    var addUnionSuccess = document.getElementById("addUnionSuccess");
    var addUnionError = document.getElementById("addUnionError");
    // var saveProfileSettings = document.getElementById("");
    
    document.getElementById("btnaddUnion").addEventListener("click", addUnions);
    btncancelAddUnion.addEventListener("click", cancelAddUnion);

    function addUnions() {
        let postObjAddEmp = {
            name: uName.value,
            union_id: uUid.value,
            founder_name: uFname.value,
            founded_date:uDateF.value,
        }

        var http = new XMLHttpRequest();
        var url = '/api/v1/admin/addNewUnion';

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
            addUnionError.classList.add("hideInfo")
            addUnionSuccess.classList.add("showInfo")
        }else {
            addUnionSuccess.classList.add("hideInfo")
            addUnionError.classList.add("showInfo")
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

    function cancelAddUnion() {
        uName.value = "";
        uUid.value = "";
        uFname.value = "";
        uDateF.value = "";
    }

});