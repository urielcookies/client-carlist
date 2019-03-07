import {get} from "axios";

export const fetchCars = ({isLoaded, setLoaded, setCarList}) => {
  if (!isLoaded) {
    get('http://127.0.0.1:5000/upload')
    .then((response) => {
      setLoaded(true);
      setCarList(response.data);
    })           
    .catch((error) => {
        console.log(error);
    })
  }
}