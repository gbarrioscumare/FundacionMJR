import React from "react"
import { View, Text, StyleSheet} from "react-native"

const Biblioteca = () => {
    return(
        <View style={{
            justifyContent: "center",
            alignContent: "center",
            width: 400,
            paddingLeft: 40,
            paddingBottom: 200,
            fontSize: 24,
            flex: 1
        }}>
            <Text>Aqui ira el repositorio de los cursos en formato PDF</Text>
        </View>         
    )
}

export default Biblioteca;