window.addEventListener('load', function () {
    var unionId = document.getElementById('union_id');
    var unionName = document.getElementById('uname');
    var started = document.getElementById('startDate');
    var leadername = document.getElementById('lname');
    var oUnionDetails = {}
    function getUnionDetails(event) {
        
        console.log(unionId);
        event.preventDefault();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `api/v1/user/union/${unionId.value}`, true);
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



    function getUnions() {
        var xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/v1/user/allunions', true);
        xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
                    fillValues(rtrn.data);
				}
			}
		};
		
    }



    tablediv = this.document.getElementById('union_members_table');


    function fillValues(unionData) {
        for (let i = 0; i < unionData.length; i++) {
            let x = unionData[i].union_id;
            oUnionDetails[x] = unionData[i];
            // unionDetails.founderName = unionData[i].founder_name;
            unionName.add(new Option(unionData[i].name,unionData[i].union_id));
        }
    }

    function setUnionDetailValues() {
        unionid = unionName.value;
        if (unionName === "") {
            unionId.value = "";
            started.value = "";
            leadername.value = "";
        }else {
            unionId.value = oUnionDetails[unionid].union_id; 
            started.value = oUnionDetails[unionid].founded_date; 
            leadername.value = oUnionDetails[unionid].founder_name; 
        }
        
    }


    

    function populate(data) {
        var table = document.getElementById("unionMembersTable");
        var rowCount = table.rows.length;
        for (var i = rowCount - 1; i >= 1; i--) {
            table.deleteRow(i);
        }
        data.forEach((member) => {
            tablediv.style.display = 'block';
            var row = table.insertRow();
            var cell1 = row.insertCell();
            cell1.innerHTML = member.name;
            var cell2 = row.insertCell();
            cell2.innerHTML = member.union_membership;
        });
    }
    var getMember = document.getElementById('get_union_members');
    console.log(getMember);
    getMember.addEventListener('click', getUnionDetails);
    unionName.addEventListener('change', setUnionDetailValues);
    getUnions();
});
