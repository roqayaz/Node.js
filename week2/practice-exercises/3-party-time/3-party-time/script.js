
/**
 * 3: Party time
 * 
 * After reading the documentation make a request to https://reservation100-sandbox.mxapps.io/rest-doc/api
 * and print the response to the console. Use async-await and try/catch.
 * 
 * Hints:
 * - make sure to use the correct headers and http method in the request
 */

 import fetch from "node-fetch";

 async function makeReservation() {
   try {
    const response = await fetch("https://reservation100-sandbox.mxapps.io/api/reservations",
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           name: "David",
           numberOfPeople: 4,
         }),
       }
     );
     const data = await response.json();
     console.log(data.message);
   }
   catch (error) {
     console.log(error);
   }
 }
 
 makeReservation();