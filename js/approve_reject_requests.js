//Variables
const form = document.querySelector("form");

switch (form.id) {
  case "userRegistrationRequestReviewForm":
    const approveUserRegistrationButton = document.getElementById(
      "approveUserRegistration"
    );
    const rejectUserRegistrationButton = document.getElementById(
      "rejectUserRegistration"
    );

    approveUserRegistrationButton.addEventListener("click", function () {
      infoAlert(
        "Solicitud de registro de usuario aprobada",
        "La solicitud de registro del usuario ha sido aprobada.",
        "/html/requests_registration_users.html"
      );
    });

    rejectUserRegistrationButton.addEventListener("click", function () {
      infoAlert(
        "Solicitud de registro de usuario rechazada",
        "La solicitud de registro del usuario ha sido rechazada.",
        "/html/requests_registration_users.html"
      );
    });
    break;

  case "assetRegistrationRequestReviewForm":
    const approveAssetRegistrationButton = document.getElementById(
      "approveAssetRegistration"
    );
    const rejectAssetRegistrationButton = document.getElementById(
      "rejectAssetRegistration"
    );

    approveAssetRegistrationButton.addEventListener("click", function () {
      infoAlert(
        "Solicitud de registro de activo aprobada",
        "La solicitud de registro del activo ha sido aprobada.",
        "/html/asset_registration_applications.html"
      );
    });

    rejectAssetRegistrationButton.addEventListener("click", function () {
      infoAlert(
        "Solicitud de registro de activo rechazada",
        "La solicitud de registro del activo ha sido rechazada.",
        "/html/asset_registration_applications.html"
      );
    });
    break;

  case "assetTransferRequestReviewForm":
    const approveAssetTransferButton = document.getElementById(
      "approveAssetTransfer"
    );
    const rejectAssetTransferButton =
      document.getElementById("rejectAssetTrasfer");

    approveAssetTransferButton.addEventListener("click", function () {
      infoAlert(
        "Solicitud de traslado de activo aprobada",
        "La solicitud de traslado del activo ha sido aprobada.",
        "/html/asset_transfer_applications.html"
      );
    });

    rejectAssetTransferButton.addEventListener("click", function () {
      infoAlert(
        "Solicitud de traslado de activo rechazada",
        "La solicitud de traslado del activo ha sido rechazada.",
        "/html/asset_transfer_applications.html"
      );
    });
    break;
}
