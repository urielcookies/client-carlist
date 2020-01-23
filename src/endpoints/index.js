import {get, post} from "axios";
const URL = 'http://api.sellingcrap.com';

const getCookie = (name) => {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

//Sample usage
const headers = {token: getCookie('token')};

export const fetchUsers = ({isLoading, setIsLoading, setUsers}) => {
  if (isLoading) {
    get(`${URL}/api/caraccess/getusernames`, {headers})
    .then(({data}) => {
      setIsLoading(false);
      setUsers(data);
    })           
    .catch((error) => console.log(error))
  }
};

// -------------------------------------------------------------
let host = null;
if (window.location.hostname === 'localhost') {
  host = 'http://localhost:5000';
} else {
  // host = 'http://uriel.sellingcrap.com';
  host = 'https://be-carlist.herokuapp.com';
}

export const url = host;

export const fetchCars = ({isLoaded, setLoaded, setCarList}) => {
  if (!isLoaded) {
    get(`${url}/fetchcars`)
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

export const fetchPartners = (partner, setPartners) => {
  if (!partner.length) {
    get(`${url}/fetchpartners`)
    .then((response) => {
      setPartners(response.data)
    })           
    .catch((error) => {
        console.log(error);
    })
  }
};
