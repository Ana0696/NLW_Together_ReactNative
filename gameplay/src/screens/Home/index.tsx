import React, { useState, useCallback } from "react";
import { View, FlatList } from "react-native";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { Profile } from "../../components/Profile";
import { ListHeader } from "../../components/ListHeader";
import { ListDivider } from "../../components/ListDivider";
import { styles } from "./styles";
import { Appointments, AppointmentsProps } from "../../components/Appointment";
import { Background } from "../../components/Background";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { Load } from "../../components/Load";

export function Home() {
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [appointments,setAppointments] = useState<AppointmentsProps[]>([]);
    const navigation = useNavigation<any>();

    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails(guildSelected: AppointmentsProps) {
        navigation.navigate('AppointmentDetails', {guildSelected});
    }

    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate');
    }

    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentsProps[] = response ? JSON.parse(response):[];

        if(category){
            setAppointments(storage.filter(item=> item.category === category));
        }else{
            setAppointments(storage);
        }
        setLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadAppointments();
    }, [category]));

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate} />
            </View>

            <CategorySelect
                categorySelected={category}
                setCategory={handleCategorySelect} />
            {
                loading ? <Load/> :
                <>
                    <ListHeader title="Partidas agendadas" subtitle={`Total ${appointments.length}`} />

                    <FlatList data={appointments} keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Appointments data={item} onPress={()=>handleAppointmentDetails(item)} />
                        )}
                        ItemSeparatorComponent={() => <ListDivider />}
                        contentContainerStyle={{ paddingBottom: 69 }}
                        style={styles.matches}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            }  
        </Background>
    );
}