window.addEventListener('load', function () {

    var userProfile = {}
    var eName = document.getElementById("eName");
    var eSSN = document.getElementById("eSSN");
    var eType = document.getElementById("eType");
    var addExpertise = document.getElementById("addExpertise");
    var expLabel = document.getElementById("addExpertiseLable");
    var eUtd = document.getElementById("eUtd");
    var eUtdLabel = document.getElementById("eUtdLable");
    var eaddress = document.getElementById("eaddress");
    var ephone = document.getElementById("ephone");
    var esalary = document.getElementById("esalary");
    var euserid = document.getElementById("euserid");
    var epword = document.getElementById("epword");
    //var btnaddEmplpyee = document.getElementById("btnaddEmplpyee");
    var btncancelAddEmployee = document.getElementById("btncancelAddEmployee");
    
    var addEmployeeSuccess = document.getElementById("addEmployeeSuccess");
    var addEmployeeError = document.getElementById("addEmployeeError");
    // var saveProfileSettings = document.getElementById("");
    eType.addEventListener("change", changeEmployeeType);
    document.getElementById("btnaddEmplpyee").addEventListener("click", addEmployees);
    btncancelAddEmployee.addEventListener("click", cancelAddEmployees);

    function cancelAddEmployees() {
        eName.value = "";
        eSSN.value= "";
        eaddress.value= "";
        ephone.value= "";
        esalary.value= "";
        eType.value= "technician";
        euserid.value= "";
        epword.value= "";
        addExpertise.value= "";
        eUtd.value= "";
    }

    function changeEmployeeType() {
        if (eType.value === "technician") {
            addExpertise.style.display = "block";
            expLabel.style.display = "block";
            eUtd.style.display = "none";
            eUtdLabel.style.display = "none";
        }else if (eType.value === "ATC") {
            expLabel.style.display = "none";
            addExpertise.style.display = "none";
            eUtd.style.display = "block";
            eUtdLabel.style.display = "block";
            eUtd.classList.remove("hideInfo");
            eUtdLabel.classList.remove("hideInfo");
            // eUtd.classList.add("showInfo");
            // eUtdLabel.classList.add("showInfo");
        }else {
            addExpertise.style.display = "none";
            expLabel.style.display = "none";
            eUtd.style.display = "none";
            eUtdLabel.style.display = "none";
        }
    }
    
    function addEmployees() {
        let postObjAddEmp = {
            name: eName.value,
            SSN: eSSN.value,
            address: eaddress.value,
            phone_num: ephone.value,
            salary: esalary.value,
            type: eType.value,
            user_id: euserid.value,
            password: epword.value,
            expertise : addExpertise.value,
            last_testDate : eUtd.value,
        }

        var http = new XMLHttpRequest();
        var url = '/api/v1/admin/addEmployee';

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
            addEmployeeError.classList.add("hideInfo")
            addEmployeeSuccess.classList.add("showInfo")
        }else {
            addEmployeeSuccess.classList.add("hideInfo")
            addEmployeeError.classList.add("showInfo")
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