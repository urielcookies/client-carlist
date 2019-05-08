import {get, post} from "axios";

export const fetchCars = ({isLoaded, setLoaded, setCarList}) => {
  if (!isLoaded) {
    get('http://uriel.sellingcrap.com/upload')
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
    get(`http://uriel.sellingcrap.com/carinfo/${carId}`)
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
    get(`http://uriel.sellingcrap.com/carimages/${carId}`)
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
    get(`http://uriel.sellingcrap.com/loadexpenses/${carId}`)
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

  post(`http://uriel.sellingcrap.com/deleteexpense/${expenseId}`, formData, {
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

