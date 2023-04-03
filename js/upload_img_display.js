//Variables
//Stores the form of the page the user is in
const uploadPictureForm = document.querySelector("form");

switch (uploadPictureForm.id) {
  case "signupForm":
    const imageInput = document.getElementById("userProfilePicture");
    const imageDisplay = document.getElementById("imageDisplay");

    //Event Listeners
    imageInput.addEventListener("change", function (e) {
      imageDisplay.src = URL.createObjectURL(e.target.files[0]);
    });
    break;

  case "assetTransferRequestValidation":
    const assetImageInput1 = document.getElementById("uploadPictureAsset1");
    const assetImageDisplay1 = document.getElementById("assetImageDisplay1");
    const assetImageInput2 = document.getElementById("uploadPictureAsset2");
    const assetImageDisplay2 = document.getElementById("assetImageDisplay2");

    //Event Listeners
    assetImageInput1.addEventListener("change", function (e) {
      assetImageDisplay1.src = URL.createObjectURL(e.target.files[0]);
    });

    assetImageInput2.addEventListener("change", function (e) {
      assetImageDisplay2.src = URL.createObjectURL(e.target.files[0]);
    });
    break;
}
