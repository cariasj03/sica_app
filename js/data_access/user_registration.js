//DOM variables
const registerUser = document.getElementById("submit");
const signupForm = document.querySelector("form");

//Normal functions
//Function to get the values of the form fields
const getFormFields = () => {
  const formData = new FormData(signupForm);
  const bodyContent = {};
  formData.forEach((value, key) => {
    bodyContent[key] = value;
  });
  return bodyContent;
};

//Async functions
// Function to register a new user
const registerNewUser = async (body) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/users/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log("user: ", await response.json());
  } catch (error) {
    console.log(error);
  }
};

//Event listeners

registerUser.addEventListener("click", async (event) => {
  // Validates the fields of the form
  event.preventDefault();
  if (Object.values(validationFields[`signupFormFields`]).every(Boolean)) {
    await registerNewUser(getFormFields());
    successAlert(
      "Registro exitoso",
      "Su solicitud para crear una cuenta ha sido enviada. En caso de ser aprobada le llegará una contraseña temporal al correo electónico registrado."
    );
    signupForm.reset();
    const imageDisplaySignup = document.getElementById("imageDisplay");
    imageDisplaySignup.src = "../images/profile_picture.png";
    Object.keys(validationFields[`signupFormFields`]).forEach(
      (attribute) => (validationFields[`signupFormFields`][attribute] = false)
    );
  } else {
    errorAlert("Hay campos obligatorios sin llenar.");
    console.log("error");
  }
});
