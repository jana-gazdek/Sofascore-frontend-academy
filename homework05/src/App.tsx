import { useState, useEffect, useRef } from 'react';
import { styled } from '../styled-system/jsx';
import { Pokemon, PokeAPIResponse } from './interface';
import { PokemonCard } from "./PokemonCard";
import Header from "./Header";
import { API_HOSTNAME } from './routes';

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(API_HOSTNAME);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const fetchPokemons = async (url: string) => {
    setLoading(true);
    const response = await fetch(url);
    const data: PokeAPIResponse = await response.json();

    const detailedPokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        return await res.json() as Pokemon;
      })
    );

    setPokemons((prev) => {
      const newPokemons = detailedPokemons.filter(
        (pokemon) => !prev.some((p) => p.id === pokemon.id)
      );
      return [...prev, ...newPokemons];
    });

    setNextUrl(data.next);
    setLoading(false);
  };
  useEffect(() => {
    if (nextUrl) {
      fetchPokemons(nextUrl);
    }
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const bottom = bottomRef.current;
      if (!bottom || loading || !nextUrl) return;

      const { top } = bottom.getBoundingClientRect();
      if (top < window.innerHeight + 100) {
        fetchPokemons(nextUrl); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [nextUrl, loading]);

  return (
    <>
      <Header />
      <styled.div maxWidth="1200px" marginX="auto" padding="4">
        <styled.div
          display="grid"
          gridTemplateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap="4"
        >
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </styled.div>

        <styled.div ref={bottomRef} height="20px" paddingY="8" textAlign="center">
          {loading && 'Loading pokemons...'}
        </styled.div>
      </styled.div>
    </>
  );
}

export default App;
