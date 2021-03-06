import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

/*useState() hook helps us use state variables in a functional component.
 i will be using a state variable to save our pokemon data
  and another to filter pokemon when someone uses the search input */

const Pokemons = props => {
  const [pokemons, setPokemons] = useState([]);
  const [searchfeild, setSearchfeild] = useState('');

  /*We can use useEffect() hook as componentDidMount() . useEffect() takes a callback as a parameter. 
  To make it work like componentDidMount()
   we pass an empty array as a second parameter in the use useEffect() hook like so */

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=500')
      .then(response => response.json())
      .then(pokemons => setPokemons(pokemons.results));
  };

  /* In the above code, pokemons is a state variable, an array where i save our pokemon data. Initially, 
  it is an empty array and the setPokemons is a function that is used to change that state. The searchfeild state variable is for a search input that i will use.
   setPokemons and setSearchfeild works as this.setState() . i use useEffect() as componentDidMount(). In the fetchPokemons() function,
   we make an API call to the PokeApi server to get our pokemon data.
   Then i convert it into JSON format and then using the setPokemons functions i save pokemons.
   results in our pokemons state variable. */

  return (
    <View>
      <View style={styles.searchCont}>
        <TextInput
          style={styles.searchfeild}
          placeholder="Search Pokemons"
          onChangeText={value => setSearchfeild(value)}
          value={searchfeild}
        />
        
      </View>
      
      <ScrollView>
        <View style={styles.container}>
          {pokemons
            .filter(pokemon =>
              pokemon.name.toLowerCase().includes(searchfeild.toLowerCase())
            )
            .map((pokemon, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  key={index}
                  style={styles.card}
                  onPress={() =>
                    props.navigation.navigate('Details', {
                      pokemon: pokemon.name,
                    })
                  }>
                  <Image
                    style={{width: 150, height: 150}}
                    source={{
                      uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${
                        pokemon.name
                      }.png`,
                    }}
                  />
                  <Text>{pokemon.name}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

/*In the above code ,First, I code our TextInput that will be at the top.
 i use onChangeText to listen to changes happening in the TextInput and use the setSearchfeild function to set the value of our TextInput to searchfeild.
  i use the JavaScript .filter() method to filter pokemons according to the search.
   The .filter() method returns an array so i use .map() method to map through that array.*/

   /*To handle touches i use Touchable Components in React-Native.TouchableOpacity 
   gives feedback when touched or tapped on. */

   /* In onPress i using props.navigation.navigate() to navigate to Details.js component and passing pokemon.name as a param,
    i use that param to get individual pokemon data. */

export default Pokemons;

/* I use StyleSheet in React-Native to define styles for a Component. 
In StyleSheet.create() i pass an object in which i can define our styles for the component.
 i use the styles by passing a reference of that style in the style property of our React-Native elements. */

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 70,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    borderBottomWidth:1,
    borderBottomColor: '#0000cd',
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#ffc0cb',
    borderRadius: 50,
    
    
  },
  searchCont: {
    position: 'absolute',
    marginBottom: 70,
    left: '20%',
    zIndex: 1,
    marginTop: 10,
  },
  searchfeild: {
    height: 50,
    borderWidth: 3,
    borderColor: '#0000cd',
    textAlign: 'center',
    width: 250,
    borderRadius: 50,
  
  },
});