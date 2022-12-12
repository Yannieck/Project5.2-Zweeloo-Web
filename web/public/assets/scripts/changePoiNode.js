var checkbox = document.getElementById("poitype");
var nodeForm = document.getElementById("nodeForm");
var pointForm = document.getElementById("pointForm");

checkbox.addEventListener("change", () => {
    if (checkbox.value === "node") {
        nodeForm.hidden = false;
        pointForm.hidden = true;
    } else {
        nodeForm.hidden = true;
        pointForm.hidden = false;
    }
    console.log(checkbox.value);
});
