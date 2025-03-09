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
} from '@heroui/react';
import useMeasure from 'react-use-measure';
import { FiltersProps } from './Filters';
import { TiThMenu } from 'react-icons/ti';
import Sidebar from './Sidebar';

interface SidebarProps extends FiltersProps {
  applyFilters: () => void;
  selectStrategy: (strategy: string) => void;
  selectRoles: (roles: string[]) => void;
  selectObjectiveFunctions: (objectiveFunctions: string[]) => void;
}

function PokemonNavbar({
  updateFilters,
  applyFilters,
  selectStrategy,
  selectRoles,
  selectObjectiveFunctions,
}: SidebarProps) {
  let [ref, { height }] = useMeasure();

  const handleFilterChange = (id: string, value: any) => {
    updateFilters(id, value);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
              <TiThMenu className="fill-white opacity-50" />
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
        <DrawerContent className="bg-background">
          <>
            <DrawerHeader className="flex-col gap-1">Filters</DrawerHeader>
            <DrawerBody>
              <Sidebar
                updateFilters={handleFilterChange}
                applyFilters={applyFilters}
                selectStrategy={selectStrategy}
                selectRoles={selectRoles}
                selectObjectiveFunctions={selectObjectiveFunctions}
                isMobile={true}
              />
            </DrawerBody>
          </>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default PokemonNavbar;
