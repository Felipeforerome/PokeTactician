import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
  Link as NextUILink,
} from '@nextui-org/react';
import useMeasure from 'react-use-measure';

function PokemonNavbar() {
  let [ref, { height }] = useMeasure();
  return (
    <Navbar
      isBordered
      ref={ref}
      className="z-10 w-full fixed top-0 left-0 right-0"
    >
      <NextUILink href="/">
        <NavbarBrand>
          <Image src="./favicon.ico" width={height} />
          <p className="font-bold hidden sm:flex text-foreground/90">
            PokeTactician
          </p>
        </NavbarBrand>
      </NextUILink>
      <p className="font-bold sm:hidden">PokeTactician</p>
      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      ></NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex"></NavbarItem>
        <NavbarItem>
          <NextUILink color="foreground" href="/results">
            Results
          </NextUILink>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default PokemonNavbar;
