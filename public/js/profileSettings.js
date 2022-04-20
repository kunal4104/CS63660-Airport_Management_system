window.addEventListener('load', function () {
	// function login() {
	// 	console.log('login');
	// 	var xhr = new XMLHttpRequest();
	// 	xhr.open('post', '/api/v1/user/login', true);
	// 	xhr.onload = function () {
	// 		if (xhr.status === 200) {
	// 			var rtrn = JSON.parse(xhr.responseText);
	// 			if (rtrn.status == 'success') {
	// 				window.location.href = '/index';
	// 			}
	// 		}
	// 	};
	// 	xhr.send();
	// }
	// const tryLogin = document.getElementById('Login');
	// console.log(tryLogin);
	// tryLogin.addEventListener('click', login);
    // document.getElementById("ProfileButton").addEventListener("click", getUserProfile);
    var userProfile = {}
    var uname = document.getElementById("uname");
    var uSSN = document.getElementById("uSSN");
    var uaddress = document.getElementById("uaddress");
    var uphone = document.getElementById("uphone");
    var usalary = document.getElementById("usalary");
    var uUnion = document.getElementById("uUnion");
    var btnUnionJoin = document.getElementById("btnUnionJoin");
    var btnUnionLeave = document.getElementById("btnUnionLeave");
    var uExpertise = document.getElementById("uExpertise");
    var uUtd = document.getElementById("uUtd");
    var expertiseLable = document.getElementById("expertiseLable");
    var uUtdLable = document.getElementById("uUtdLable");
    // var saveProfileSettings = document.getElementById("");

    document.getElementById("saveProfileSettings").addEventListener("click", saveProfileSettings);
    
    function getUserProfile() {
        var xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/v1/user/userProfile', true);
        xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
					// userProfile.name = rtrn.data[0].name
                    // userProfile.ssn = rtrn.data[0].SSN
                    userProfile = rtrn.data[0]
                    fillValues(rtrn.data[0])
				}
			}
		};
		
    }
    getUserProfile();

    function fillValues(profileData) {
        console.log(profileData);
        uname.value = profileData.name;
        uSSN.value = profileData.SSN;
        uaddress.value = profileData.address;
        uphone.value = profileData.phone_num;
        usalary.value = profileData.salary;
        uUnion.value = profileData.union_id;

        if (profileData.union_id && profileData.union_id > 0) {
            btnUnionLeave.style.visibility = "visible";
            btnUnionJoin.style.visibility = "hidden";
        }else {
            btnUnionLeave.style.visibility = "hidden";
            btnUnionJoin.style.visibility = "visible";
        }

        if (profileData.expertise) {
            uExpertise.value = profileData.expertise
            uUtd.style.visibility = "hidden";
            uExpertise.style.visibility = "visible";
            expertiseLable.style.visibility = "visible";
            uUtdLable.style.visibility = "hidden";
            uUtd.style.display = "none";
            uUtdLable.style.display = "none";
            // uUtd.remove();
            // uUtdLable.remove();
        }else {
            uUtd.value = profileData.last_testDate
            uUtd.style.visibility = "visible";
            uExpertise.style.visibility = "hidden";
            expertiseLable.style.visibility = "hidden";
            uUtdLable.style.visibility = "visible";
        }

    }

    function saveProfileSettings() {
        let postObj = {
            name: uname.value,
            SSN: uSSN.value,
            address: uaddress.value,
            phone_num: uphone.value,
            salary: usalary.value,
            union_id: uUnion.value,
        }

        if (userProfile.expertise) {
            postObj.expertise = uExpertise.value
        }
        if (userProfile.last_testDate) {
            postObj.last_testDate = uUtd.value
        }

        var http = new XMLHttpRequest();
        var url = '/api/v1/user/saveProfile';

        http.open('POST', url, true);

        //Send the proper header information along with the request
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

    function showUpdateInfo(state) {
        var successDiv = document.getElementById("uSuccessDialog");
        var uErrorDialog = document.getElementById("uErrorDialog");
        if (state === "success") {
            uErrorDialog.classList.add("hideInfo")
            successDiv.classList.add("showInfo")
        }else {
            successDiv.classList.add("hideInfo")
            uErrorDialog.classList.add("showInfo")
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
});