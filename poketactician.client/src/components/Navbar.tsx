import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
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

function PokemonNavbar() {
  let [ref, { height }] = useMeasure();

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
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Filters
              </DrawerHeader>
              <DrawerBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod.
                </p>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Optimize
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default PokemonNavbar;
