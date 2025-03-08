import { useState } from "react";
import { Text, View, StyleSheet, Button, TextInput, FlatList } from "react-native";
import ListItem from "./components/ListItem";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  //Ruudulla esitettävät muistettavat tehtävät. Uudet tehtävät lisätään tähän tilamuuttujaan
  //useampi tehtävä alustettu sovelluksen demoamisen helpottamiseksi
  const [toDos, setToDos] = useState([
    {id: '0', description: 'Täytä tiskinkone', isImportant: false},
    {id: '1', description: 'todo test1', isImportant: false},
    {id: '2', description: 'tärkeä tehtävä', isImportant: false},
    {id: '3', description: 'esimerkki x', isImportant: false},
    {id: '4', description: 'esimerkki y', isImportant: false},
    {id: '5', description: 'esimerkki z', isImportant: false},
  ])

  //Tilamuuttuja, jota käytetään uuden luodun tehtävän lisäämiseen ruudulla esitettävään tilamuuttujaan.
  const [todo, setTodo] = useState("")

    const addTodo = () => {
      //Funktio, jolla tehdään uuden tehtävän lisäys
      let newTodo = {id: toDos.length.toString(), description: todo, isImportant: false}
      //spread operaattoria käyttäen korvataan vanha lista uudella ja lisätään uusi doto listaan
      const newTodos = [...toDos, newTodo]
      //asetetaan uusi lista ruudulla esitettävään tilamuuttujaan.
      setToDos(newTodos)
      //nollataan todo arvo, jotta uuden tehtävän luonti onnistuu ilman, että edellistä tarvii pyyhkiä pois
      setTodo("")
    }

    //Päivitetään tilamuuttujaa silloin kun tehtävä asetetaan tärkeäksi.
    const updateTodos = () => {
      const newTodos = [...toDos]
      setToDos(newTodos)
    }

    //Funktio, jolla poistetaan tehtävä tilamuuttujasta. Poistettava tehtävä tunnistetaan id:n perusteella
    const deleteTodo = (id: string) => {
      const updatedTodoList = toDos.filter((todo) => todo.id !== id)
      setToDos(updatedTodoList)
    }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tehtäväsi tänään</Text>

    {/* Flatlist komponentti, joka renderöi muistettavat tehtävät ruudulle.
    sort metodia käyttäen tärkeät tehtävät nostetaan ylimmäksi ruudulle renderöidyssä listassa*/}
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
      {/* Flatlist komponenttissa välitetään ListItem komponentille propsien kautta todo lista, sekä funktiot listan päivittämistä varten.*/}

      <View style={styles.uusiBoxi}>
        <Text style={styles.uustodo}>Lisää uusi tehtävä</Text>
        <TextInput
          value={todo}
          placeholder='Kirjoita tähän muistettava asia'
          onChangeText={text => setTodo(text)}
        />
          <Button title="Lisää " onPress={addTodo}/>
      </View>
      
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faebd7',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center'
  },
  uustodo: {
    fontSize: 20,
  },
  uusiBoxi: {
    backgroundColor: '#faebd7',
    alignItems: 'center',
    marginBottom: 50
  },
});