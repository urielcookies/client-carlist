import {get, post} from "axios";

export const url = 'http://uriel.sellingcrap.com';
// export const url = 'http://localhost:5000';

export const fetchCars = ({isLoaded, setLoaded, setCarList}) => {
  if (!isLoaded) {
    get(`${url}/upload`)
    .then((response) => {
      setLoaded(true);
      setCarList(response.data.reverse());
    })           
    .catch((error) => {
        console.log(error);
    })
  }
};

export const fetchCarInfo = ({carId, isCarInfoLoaded, setIsCarInfoLoaded, setCarInfo}) => {
  if (!isCarInfoLoaded) {
    get(`${url}/carinfo/${carId}`)
    .then((response) => {
      setIsCarInfoLoaded(true);
      setCarInfo(response.data);
    })           
    .catch((error) => {
        console.log(error);
    })
  }
};

export const fetchCarImages = ({carId, isImagesLoaded, setIsImagesLoaded, setCarImages}) => {
  if (!isImagesLoaded) {
    get(`${url}/carimages/${carId}`)
    .then((response) => {
      setIsImagesLoaded(true);
      setCarImages(response.data);
    })           
    .catch((error) => {
        console.log(error);
    })
  }
};

export const fetchCarExpenses = ({carId, isExpensesLoaded, setIsExpensesLoaded, setExpenses}) => {
  if (!isExpensesLoaded) {
    get(`${url}/loadexpenses/${carId}`)
    .then((response) => {
      setIsExpensesLoaded(true);
      console.log(response.data);
      setExpenses(response.data);
    })           
    .catch((error) => {
        console.log(error);
    })
  }
};

export const deleteCarExpense = (expenseId, state) => {
  const formData = new FormData();
  formData.append('expenseId', expenseId);

  post(`${url}/deleteexpense/${expenseId}`, formData, {
    headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    'Accept': '*',
    }
  })
  .then(function (response) {
    console.log(response);
    state(false);
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const fetchCarStatus = ({carId, isCarStatusLoaded, setIsCarStatusLoaded, setCarStatus}) => {
  if (!isCarStatusLoaded) {
    get(`${url}/carstatus/${carId}`)
    .then((response) => {
      setIsCarStatusLoaded(true);
      setCarStatus(response.data);
    })           
    .catch((error) => {
        console.log(error);
    })
  }
};
