const errorAlert = function (message) {
  Swal.fire({
    title: 'Error',
    text: message,
    icon: 'error',
    confirmButtonText: 'Aceptar',
  });
};

const successAlert = function (alertTitle, message) {
  Swal.fire({
    title: alertTitle,
    text: message,
    icon: 'success',
    confirmButtonText: 'Aceptar',
  });
};

const infoAlert = function (alertTitle, message, redirectURL) {
  Swal.fire({
    title: alertTitle,
    text: message,
    icon: 'info',
    confirmButtonText: 'Aceptar',
  }).then(function () {
    window.location = redirectURL;
  });
};

const confirmationAlert = function (
  alertTitle,
  acceptedTitle,
  acceptedMessage,
  redirectURL,
  fuctionToExecute
) {
  Swal.fire({
    title: alertTitle,
    text: 'Esta acción no se puede deshacer. ¿Desea continuar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#687448',
    cancelButtonColor: '#974724',
    confirmButtonText: 'Sí, continuar',
    cancelButtonText: 'No, cancelar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      await fuctionToExecute();
      Swal.fire(acceptedTitle, acceptedMessage, 'success').then(() => {
        window.location.href = redirectURL;
      });
    }
  });
};
