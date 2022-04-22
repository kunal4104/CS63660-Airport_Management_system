window.addEventListener('load', function () {
    var http = new XMLHttpRequest();
    var btnUnionLeave = document.getElementById("btnUnionLeave");
    var btnUnionJoin = document.getElementById("btnUnionJoin");
    var updateUnionSuccess = document.getElementById("updateUnionSuccess");
    var updateUnionError = document.getElementById("updateUnionError");

    btnUnionLeave.addEventListener('click', unionLeave);
    btnUnionJoin.addEventListener('click', unionJoin);
    function unionLeave(event) {
        var url = '/api/v1/user/updateUnion';
        console.log('In the onclick function');
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            let postObj ={
                union_id:0
            };
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
        if (state === "success") {
            updateUnionError.classList.add("hideInfo")
            updateUnionSuccess.classList.add("showInfo")
        }else {
            updateUnionSuccess.classList.add("hideInfo")
            updateUnionError.classList.add("showInfo")
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

    function unionJoin(event) {
        var url = '/api/v1/user/updateUnion';
        console.log('In the onclick function');
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            let postObj ={
                union_id:document.getElementById('union_id').value
            };
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
});