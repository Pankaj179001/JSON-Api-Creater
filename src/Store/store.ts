import { configureStore  } from "@reduxjs/toolkit";

export  const store=configureStore ({reducer:{},middleware:(arg)=>arg().concat()})