//Variables
//Stores the form of the page the user is in
const uploadPictureForm = document.querySelector("form");

switch (uploadPictureForm.id) {
  case "signupForm":
    const uploadPictureButton = document.getElementById("pictureUploadButton");
    const imageInput = document.getElementById("userProfilePicture");
    const imageDisplay = document.getElementById("imageDisplay");

    uploadPictureButton.addEventListener("click", function () {
      imageInput.click();
    });

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

  case "userInfoForm":
    const userPictureButton = document.getElementById("editUserPictureButton");
    const userPictureInput = document.getElementById("userPictureInput");
    const userPictureDisplay = document.getElementById("userPictureDisplay");

    //Event Listeners
    userPictureButton.addEventListener("click", function () {
      userPictureInput.click();
    });

    userPictureInput.addEventListener("change", function (e) {
      userPictureDisplay.src = URL.createObjectURL(e.target.files[0]);
    });
    break;

  case "myProfileForm":
    const myProfilePictureButton = document.getElementById(
      "profilePictureUploadButton"
    );
    const myProfilePictureInput = document.getElementById(
      "profilePictureInput"
    );
    const myProfilePictureDisplay = document.getElementById(
      "profilePictureDisplay"
    );

    //Event Listeners
    myProfilePictureButton.addEventListener("click", function () {
      myProfilePictureInput.click();
    });

    myProfilePictureInput.addEventListener("change", function (e) {
      myProfilePictureDisplay.src = URL.createObjectURL(e.target.files[0]);
    });
    break;
}
