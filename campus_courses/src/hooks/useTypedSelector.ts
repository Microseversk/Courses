import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "@reduxjs/toolkit/query";
import {RootReducer} from "../store/store";

export const useTypedSelector: TypedUseSelectorHook<RootReducer> = useSelector