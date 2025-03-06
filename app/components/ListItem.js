import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function ListItem(props) {
  
  const [isPressedText, setIsPressedText] = useState(false)
  const [isPressedBox, setIsPressedBox] = useState(false)

  const pressedText = () => {
      setIsPressedText(!isPressedText)
  }
  const pressedBox = () => {
    setIsPressedBox(!isPressedBox)
    //props.importantTodo(props.todo.id)
    props.todo.isImportant = !props.todo.isImportant
    props.updateTodos()
}
  
  
  return (
    <View style={styles.kokonaisuus}>
      <View style={styles.tehtRivi}>
        <Pressable onPress={pressedText} >
          
          <Text style={[styles.testi,{textDecorationLine: isPressedText ? 'line-through' : ''}, {backgroundColor: isPressedText ? '#faebd7' : 'white'}]}>{props.todo.description}</Text>
            
          
          {/*
            <Text>{props.todo}</Text>
             */}
          
          </Pressable>

          <Pressable onPress={pressedBox} >
            <Text style={[styles.laatikko,{backgroundColor: isPressedBox ? 'red': 'white'}]}></Text>
          </Pressable>
            
             {/*
          <Pressable onPress={() => props.deleteTodo()}>
            <Icon name="trash-alt" size={20} color="red" />
            <Text>{props.todo.id}</Text>
          </Pressable>
          */}
          <Icon name="trash-alt" size={20} color="red" onPress={() => props.deleteTodo(props.todo.id)}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  kokonaisuus: {
    flex: 1,
    //flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'white',
    
  },
  laatikko:{
    //backgroundColor: 'black',
    width: 25,
    height: 25,
    //justifyContent: 'flex-end'
    marginLeft: 35,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'black',
    marginRight: 25
  },
  testi: {
    //backgroundColor: 'teal',
    width: 230,
  },
  tehtRivi: {
    flexDirection: 'row'
  }
});