//Upload image display
//Variables
const imageInput = document.getElementById("userProfilePicture");
const imageDisplay = document.getElementById("imageDisplay");
let uploadedProfilePicture;

//Event Listeners
imageInput.addEventListener("change", function () {
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    uploadedProfilePicture = reader.result;

    imageDisplay.src = reader.result;
  });
  reader.readAsDataURL(this.files[0]);
});
