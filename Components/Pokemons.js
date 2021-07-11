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

export default Pokemons;

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