import { styled } from '../styled-system/jsx';
import { type Pokemon } from './interface';
import favorite from './favorite.png'

export const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <styled.article
      backgroundColor="surface.s2"
      borderRadius="lg"
      padding="4"
      boxShadow="md"
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-2px)' }}
      border="solid black"
    >
      <styled.div display="flex" position="relative" paddingTop="100%">
      <styled.img src={favorite} cursor="pointer" display="inline-block" zIndex="2"/>
        <styled.img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          position="absolute"
          top="0"
          width="100%"
          height="100%"
          objectFit="contain"
        />
      </styled.div>

      <styled.div marginTop="4">
        <styled.h2 textStyle="display.large" color="neutral.900">
          #{pokemon.id.toString().padStart(4, '0')} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </styled.h2>
        
        <styled.div display="flex" gap="2" marginTop="2" textAlign="center" alignItems="center">Type:
          {pokemon.types.map((type, id) => (
            <styled.span
            key={`${type.type.name}-${id}`}
            backgroundColor={`colors.${type.type.name}`}
            paddingX="2"
            paddingY="1"
            borderRadius="md"
            textStyle="label.small"
            textAlign="center"
            >
              {type.type.name}
            </styled.span>
          ))}
        </styled.div>
      </styled.div>

      <styled.div marginTop="4" spaceY="2">
        {pokemon.stats.map((stat, id) => (
          <styled.div 
          key={`${stat.stat.name}-${id}`}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <styled.span textStyle="body.small" color="neutrals.nLv1">
              {stat.stat.name}
            </styled.span>
            <styled.span textStyle="body.medium">
              {stat.base_stat}
            </styled.span>
          </styled.div>
        ))}
      </styled.div>
    </styled.article>
  );
};