//Functions
//Function to update the user Password
const changeUserPassword = async (id, body) => {
  try {
    const response = await fetch(
      `http://localhost:8000/users/update-pass/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Function to update the user Password
const checkUserPassword = async (id, body) => {
  try {
    const response = await fetch(
      `http://localhost:8000/users/check-pass/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
