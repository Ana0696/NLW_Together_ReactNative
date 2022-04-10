import React from "react";
import { View, Text, Image, Alert, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { useAuth } from "../../hooks/auth";
import IllustrationImg from '../../assets/illustration.png';
import { ButtonIcon } from "../../components/ButtonIcon";
import { Background } from "../../components/Background";
import { theme } from "../../global/styles/theme";

export function SignIn() {
    const { loading, signIn } = useAuth();
    console.log("6");

    async function handleSignIn() {
        try {
            console.log("1");
            await signIn();
        } catch (error) {
            console.log("2");
            Alert.alert(error);
        }
    }

    return (
        <Background>
            <View style={styles.container}>

                <Image source={IllustrationImg} style={styles.image} resizeMode="stretch" />

                <View style={styles.content}>
                    <Text style={styles.title}>
                        Organize {'\n'}
                        suas jogatinas {'\n'}
                        facilmente
                    </Text>

                    <Text style={styles.subtitle}>
                        Crie grupos para jogar seus games {'\n'}
                        favoritos com seus amigos
                    </Text>
                    
                    {
                        loading? <ActivityIndicator color ={theme.colors.primary}/> :
                        
                        <ButtonIcon title="Entrar com Discord" onPress={handleSignIn} />
                    }

                </View>
            </View>
        </Background>
    );
}