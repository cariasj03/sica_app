const errorAlert = function (message) {
  Swal.fire({
    title: "Error",
    text: message,
    icon: "error",
    confirmButtonText: "Aceptar",
  });
};

const successAlert = function (alertTitle, message) {
  Swal.fire({
    title: alertTitle,
    text: message,
    icon: "success",
    confirmButtonText: "Aceptar",
  });
};

const infoAlert = function (alertTitle, message, redirectURL) {
  Swal.fire({
    title: alertTitle,
    text: message,
    icon: "info",
    confirmButtonText: "Aceptar",
  }).then(function () {
    window.location = redirectURL;
  });
};
