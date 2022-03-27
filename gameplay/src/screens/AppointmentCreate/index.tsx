import React from "react";
import { Text, View } from "react-native";
import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { theme } from "../../global/styles/theme";
import { styles } from "./styles";

export function AppointmentCreate() {

    return (
        <Background>
            <Header title="Agendar partida" />

        </Background>
    );
}