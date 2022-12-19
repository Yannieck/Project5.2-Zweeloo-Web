var poiTypeDropdown = document.getElementById("poitype");
var nodeForm = document.getElementById("nodeForm");
var pointForm = document.getElementById("pointForm");
var poiTypeField = document.getElementById("poitypefield");

//Set the hidden field value in the poi form
poiTypeField.value = poiTypeDropdown.value;

//Event triggers when poi type dropdown value is changed
poiTypeDropdown.addEventListener("change", () => {
    poiTypeField.value = poiTypeDropdown.value;

    //Enable and disable the corresponding forms according to which poi type is selected
    if (poiTypeDropdown.value === "NODE") {
        nodeForm.hidden = false;
        pointForm.hidden = true;
    } else {
        nodeForm.hidden = true;
        pointForm.hidden = false;
    }
});
