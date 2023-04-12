const registerUnit = document.getElementById('submit');
let nextId;

/* //Gets the next id
fetch('http://127.0.0.1:8000/units')
  .then((response) => {
    const unitsList = response.json();
    return unitsList;
  })
  .then((unitsList) => {
    const unitsIds = unitsList.map((unit) => {
      return Number(unit.id);
    });
    const lastId = Math.max(...unitsIds);
    nextId = getNextId(lastId);
  })
  .catch((error) => {
    console.log(error);
  }); */

registerUnit.addEventListener('click', async (e) => {
  e.preventDefault();
  //Validates the fields of the form
  if (
    Object.values(validationFields.unitRegistrationFormFields).every(Boolean)
  ) {
    //Make the request to the server
    const response = await fetch('http://127.0.0.1:8000/units', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(getFormFields()),
    });
    console.log('unit: ', response);
  }
});

//Function to get the values of the form fields
const getFormFields = () => {
  const unitId = '000001';
  const unitCreationDate = new Date();
  const unitName = document.getElementById('unitName').value;
  const unitDescription = document.getElementById('unitDescription').value;
  const provinceSelect = document.getElementById('provinceSelect').value;
  const cantonSelect = document.getElementById('cantonSelect').value;
  const districtSelect = document.getElementById('districtSelect').value;
  const address = document.getElementById(
    'additionalGeographicInformation'
  ).value;
  const bodyContent = {
    id: unitId,
    creationDate: unitCreationDate,
    name: unitName,
    description: unitDescription,
    province: provinceSelect,
    canton: cantonSelect,
    district: districtSelect,
    address: address,
  };
  return bodyContent;
};

const padZeros = (num) => {
  if (typeof num !== 'string') {
    num = num.toString();
  }
  const paddedNum = num.padStart(6, '0');
  return paddedNum;
};

const getNextId = (num) => {
  num++;
  return padZeros(num);
};
