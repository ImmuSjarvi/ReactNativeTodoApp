import { useState } from "react";
import { Text, View, StyleSheet, Button, TextInput, FlatList } from "react-native";
import ListItem from "./components/ListItem";
import { SafeAreaView } from "react-native-safe-area-context";


//TODO: käytä flatlistiä returnin sisällä eikä mappia
//TODO: mahdollisuus merkata tärkeäksi taskiksi
export default function Index() {
  const [toDos, setToDos] = useState([
    {id: '0', description: 'Täytä tiskinkone', isImportant: false},
    {id: '1', description: 'todo test1', isImportant: false},
    {id: '2', description: 'tärkeä tehtävä', isImportant: false},
  ])
  const [todo, setTodo] = useState("")
    
    /* Oisko joku iffittely, etä jos lista tyhjä, niin näytä jtn että lisää. Jos on todoita, niin näytä ne */

    const addTodo = () => {
      //Uuden todon luonti
      //let newTodo = {id: Date.now().toString(), description: todo, isImportant: false}
      let newTodo = {id: toDos.length.toString(), description: todo, isImportant: false}
      //spread operaattoria käyttäen korvataan vanha lista uudella ja lisätään uusi doto listaan
      const newTodos = [...toDos, newTodo]
      //asetetaan uusi lista useStateen.
      setToDos(newTodos)
      //nollataan todo arvo
      setTodo("")
    }

    {/* ei iha järkevä, mutta toimii :D*/}
    const updateTodos = () => {
      const newTodos = [...toDos]
      setToDos(newTodos)
    }

    const deleteTodo = (id: string) => {
      //let newTodos = [...toDos];
      //newTodos.splice(id, 1);
      //setToDos(newTodos)
      const updatedTodoList = toDos.filter((todo) => todo.id !== id)
      setToDos(updatedTodoList)
    }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tehtäväsi tänään</Text>
      {/*{toDos.map((toDo) => (
        <View key={toDo.id}> 
          
          <ListItem todo={toDo.description}/>
        </View>
      ))}*/}

     <FlatList 
        data={toDos.sort((a,b) => {
          if (a.isImportant === true && b.isImportant === false) {
            return -1
          } else if (a.isImportant === false && b.isImportant === true) {
            return 1
          } else {
            return 0
          }
        })}
        renderItem={({item}) => <ListItem todo={item} updateTodos={updateTodos} deleteTodo={deleteTodo}/>}
        keyExtractor={item => item.id}
      />
      {/*
        <FlatList 
          data={toDos.sort((a,b) => {
            if (a.isImportant === true && b.isImportant === false) {
              return -1
            } else if (a.isImportant === false && b.isImportant === true) {
              return 1
            } else {
              return 0
            }
          })}
          renderItem={({item}) => {
            return (
              <View key={item.id}> 
                <ListItem todo={item}
                />
                {/* <ListItem todo={item}  importantTodo={importantTodo} */}
                {/* posta alta kuhan toimii oikein */} {/*
                <Text>{item.isImportant.toString()}</Text>
              </View>
            )
          }}
          keyExtractor={item => item.id}
        />
        */ }
      <View style={styles.uusiBoxi}>
        <Text style={styles.uustodo}>Lisää uusi tehtävä alle</Text>
        <TextInput
          value={todo}
          placeholder='Kirjoita tähän muistettava asia'
          onChangeText={text => setTodo(text)}
        />
        {/* Jos textinput ei tyhjä, niin nappia voi painaa/näkyy? */}
          <Button title="Lisää " onPress={addTodo}/>
      </View>
      
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faebd7',
    //alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center'
    //textDecorationLine: 'line-through'
  },
  uustodo: {
    //marginTop: 10,
    fontSize: 18,
  },
  uusiBoxi: {
    flex: 1,
    backgroundColor: '#faebd7',
    alignItems: 'center',
    //marginTop: 20
  },
});