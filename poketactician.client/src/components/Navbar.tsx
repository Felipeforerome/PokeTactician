import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  useDisclosure,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
  Link as NextUILink,
} from '@nextui-org/react';
import useMeasure from 'react-use-measure';
import Filters from './Filters';
import { FiltersProps } from './Filters';

function PokemonNavbar({ updateFilters, applyFilters }: FiltersProps) {
  let [ref, { height }] = useMeasure();

  const handleFilterChange = (id: string, value: any) => {
    updateFilters(id, value);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleApply = () => {
    // Put your filter application logic here
    applyFilters();
  };

  return (
    <>
      <Navbar
        isBordered
        ref={ref}
        className="z-10 w-full fixed top-0 left-0 right-0"
      >
        <NavbarBrand>
          <div className="block sm:hidden">
            <Button isIconOnly variant="light" onPress={onOpen}>
              F
            </Button>
          </div>
          <NextUILink href="/">
            <Image src="./favicon.ico" width={height} />
            <p className="font-bold hidden sm:flex text-foreground/90">
              PokeTactician
            </p>
          </NextUILink>
        </NavbarBrand>
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
      <Drawer isOpen={isOpen} placement={'left'} onOpenChange={onOpenChange}>
        <DrawerContent className="dark bg-background">
          <>
            <DrawerHeader className="flex flex-col gap-1">Filters</DrawerHeader>
            <DrawerBody>
              <Filters
                updateFilters={handleFilterChange}
                applyFilters={handleApply}
              />
            </DrawerBody>
          </>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default PokemonNavbar;
