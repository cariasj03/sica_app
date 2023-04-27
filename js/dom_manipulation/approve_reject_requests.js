//Variables
const form = document.querySelector('form');

switch (form.id) {
  case 'assetRegistrationRequestReviewForm':
    const approveAssetRegistrationButton = document.getElementById(
      'approveAssetRegistration'
    );
    const rejectAssetRegistrationButton = document.getElementById(
      'rejectAssetRegistration'
    );

    approveAssetRegistrationButton.addEventListener('click', function () {
      infoAlert(
        'Solicitud de registro de activo aprobada',
        'La solicitud de registro del activo ha sido aprobada.',
        '../html/asset_registration_requests_list.html'
      );
    });

    rejectAssetRegistrationButton.addEventListener('click', function () {
      infoAlert(
        'Solicitud de registro de activo rechazada',
        'La solicitud de registro del activo ha sido rechazada.',
        '../html/asset_registration_requests_list.html'
      );
    });
    break;

  case 'assetTransferRequestReviewForm':
    const approveAssetTransferButton = document.getElementById(
      'approveAssetTransfer'
    );
    const rejectAssetTransferButton =
      document.getElementById('rejectAssetTrasfer');

    approveAssetTransferButton.addEventListener('click', function () {
      infoAlert(
        'Solicitud de traslado de activo aprobada',
        'La solicitud de traslado del activo ha sido aprobada.',
        '../html/asset_transfer_requests_list.html'
      );
    });

    rejectAssetTransferButton.addEventListener('click', function () {
      infoAlert(
        'Solicitud de traslado de activo rechazada',
        'La solicitud de traslado del activo ha sido rechazada.',
        '../html/asset_transfer_requests_list.html'
      );
    });
    break;
}
