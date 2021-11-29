import axios, { AxiosInstance } from "axios";

const restaurantApi: AxiosInstance = axios.create({
  baseURL: "https://restaurang-booking-app.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const runASecondFunction = () => {
  console.log("second")
};

//NODEJS BASE URL HERE
//SOMEENDPOINT HERE
//EMPTY END POINT WILL WORK
//SAID TEGEL
export default restaurantApi;
