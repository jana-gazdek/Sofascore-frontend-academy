import { Container, styled } from "../styled-system/jsx";
import heart from './heart.png';
import settings from './settings.png';
import pokeball from './pokeball.png';

function Header() {
    return(
        <Container display="flex" justifyContent="space-between" alignItems="center" background="primary.default" height="4xl">
            <styled.img src={heart} width="3xl" marginLeft="2xl" cursor="pointer"></styled.img>
            <Container display="flex" flexDirection="row" alignItems="center" gap="md">
                <styled.img src={pokeball} width="3xl"></styled.img>
                <styled.p color="surface.s0" textStyle="display.extraLarge">POKEDEX</styled.p>
            </Container>
            <styled.img src={settings} width="3xl" marginRight="2xl" cursor="pointer"></styled.img>
        </Container>
    );
}

export default Header;