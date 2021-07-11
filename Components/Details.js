import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';


/* It would be similar to the Pokemons component,
 making an API call in the useEffect() and saving it in our state.
  Then, using that state variable to display data onto our screen. */


  /* I use navigation.state.params to read the params 
  that i have passed from the Pokemons component to Details component. 
  Using that param in fetchPokemonsDetail function i make an API call to get individual pokemon data. 
  While returning from the component I’ve added a condition so that it doesn’t show a blank screen while data is being fetched, 
  it’ll show the ActivityIndicator . */ 


const Details = props => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  const fetchPokemonDetails = () => {
    const {state} = props.navigation;
    fetch(`https://pokeapi.co/api/v2/pokemon/${state.params.pokemon}`)
      .then(res => res.json())
      .then(details => setDetails(details));
  };

  return details.name ? (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Image
        style={styles.image}
        source={{
          uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${
            details.name
          }.png`,
        }}
      />
      <Text style={styles.text}>Name: {details.name}</Text>
      <Text style={styles.text}>Height: {details.height}</Text>
      <Text style={styles.text}>Weight: {details.weight}</Text>
      <Text style={styles.text}>
        Ability: {details.abilities[0].ability.name}
      </Text>
      <Text style={styles.text}>Type: {details.types[0].type.name}</Text>
    </View>
  ) : (
    <View style={styles.indicator}>
      <ActivityIndicator size="large" color="#E63F34" />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    backgroundColor: '#ffb6c1',
    borderRadius: 50,
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
    
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
});