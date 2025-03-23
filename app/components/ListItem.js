import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/AntDesign';

export default function ListItem(props) {
  
  //Tilamuuttujat, joilla hallitaan komponentin osien painalluksia ja niiden toimintoja
  const [isPressedText, setIsPressedText] = useState(false)
  const [isPressedBox, setIsPressedBox] = useState(false)

  //Functio, joka vaihtaa tekstiä hallitsevan tilamuuttujan arvoa falsen ja truen väliltä
  const pressedText = () => {
      setIsPressedText(!isPressedText)
  }
  //Functio, jota käytetään tehtävän tärkeäksi nostamiseen
  const pressedBox = () => {
    setIsPressedBox(!isPressedBox)
    props.todo.isImportant = !props.todo.isImportant
    props.updateTodos()
  }   
  return (
    <View style={styles.kokonaisuus}>
      <View style={styles.tehtRivi}>
        <Pressable onPress={pressedText} >
          <Text style={[styles.teksti,{textDecorationLine: isPressedText ? 'line-through' : ''}, 
            {backgroundColor: isPressedText ? '#faebd7' : 'white'}]}>{props.todo.description}
          </Text>
        </Pressable>
        <View style={styles.iconit}>
          <Icon2 style={styles.laatikko} name="staro" size={25} onPress={pressedBox} color="goldenrod" 
            backgroundColor={isPressedBox ? 'yellow': 'white'}  
          />
          <Icon name="trash-alt" size={23} color="red" onPress={() => props.deleteTodo(props.todo.id)}/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  kokonaisuus: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'white',
    
  },
  laatikko:{
    marginLeft: 35,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 25,
  },
  teksti: {
    fontSize: 15
  },
  iconit: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-end" 
  },
  tehtRivi: {
    flexDirection: 'row',
    justifyContent: "flex-start" 
    
  }
});