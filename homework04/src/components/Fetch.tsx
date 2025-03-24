import React, { useEffect, useState } from "react"

const getPokemonUrl = (id: number) => `https://pokeapi.co/api/v2/pokemon/${id}/`

// we only care about these two fields
interface PokemonResponse {
  id: number
  name: string
}

export default function Fetch() {
  const [pokemon, setPokemon] = useState<PokemonResponse[]>([])

  // your task here is to fetch Pokémon from a given URL and just display its name
  // first Pokémon should be fetched when the compontent is first rendered
  // then, once user clicks on FETCH button, increment your id to fetch the next one and add it to the list

  // fetch works just as it worked in plain JavaScript, the only difference is you need to specify what the
  // type of the object is, after converting it to .json()

  const [pokemonId, setPokemonId] = useState<number>(0)
  // e.g. code snippet
  const fetchPokemon = async (id: number) => {
    //we fetch the Pokemon, convert it to json and we have p object of type PokemonResponse
    try {
      const response = await fetch(getPokemonUrl(id))
      if(!response.ok) {
        throw new Error("Failed to fetch")
      }
    const p: PokemonResponse = await (await fetch(getPokemonUrl(id))).json()
    setPokemon(prev => [...prev, { id: p.id, name: p.name }])
    } catch (e) {
      console.log("Error: ", e);
    }
  }

   useEffect(() => {
    fetchPokemon(pokemonId)
  }, []) 

  const handleFetchClick = () => {
    const nextId = pokemonId + 1
    setPokemonId(nextId)
    fetchPokemon(nextId)
  }

  // return 2 elements:
  // 1st: a button which will trigger another fetch on click, for a Pokémon with next id
  // 2nd: All Pokémon stored in your list
  return (
    <div>
      <button onClick={handleFetchClick}>FETCH</button>
      {/* display Pokémon in a list here, just display a div with its name for each Pokémon */
      pokemon.map((pokemon) => (
        <div key={pokemon.id}>
          {pokemon.name}
        </div>
      ))
      }
    </div>
  )
}
