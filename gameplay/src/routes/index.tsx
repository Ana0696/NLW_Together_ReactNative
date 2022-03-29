import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "../hooks/auth";
import { SignIn } from "../screens/SignIn";

const mainTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "transparent",
    },
};

export function Routes() {
    const {user} = useAuth();

    return (
        <NavigationContainer theme={mainTheme}>
            {user.id ? <AuthRoutes/> : <SignIn/>}
        </NavigationContainer>

    )
}