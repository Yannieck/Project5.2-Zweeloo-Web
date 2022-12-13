var poiTypeDropdown = document.getElementById("poitype");
var nodeForm = document.getElementById("nodeForm");
var pointForm = document.getElementById("pointForm");
var poiTypeField = document.getElementById("poitypefield");

poiTypeField.value = poiTypeDropdown.value;

poiTypeDropdown.addEventListener("change", () => {
    poiTypeField.value = poiTypeDropdown.value;

    if (poiTypeDropdown.value === "NODE") {
        nodeForm.hidden = false;
        pointForm.hidden = true;
    } else {
        nodeForm.hidden = true;
        pointForm.hidden = false;
    }
    console.log(poiTypeDropdown.value);
});
