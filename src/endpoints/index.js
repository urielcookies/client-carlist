import {get} from "axios";

export const fetchCars = ({isLoaded, setLoaded, setCarList}) => {
  if (!isLoaded) {
    get('http://127.0.0.1:5000/upload')
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
    get(`http://127.0.0.1:5000/carinfo/${carId}`)
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
    get(`http://127.0.0.1:5000/carimages/${carId}`)
    .then((response) => {
      setIsImagesLoaded(true);
      setCarImages(response.data);
    })           
    .catch((error) => {
        console.log(error);
    })
  }
};
