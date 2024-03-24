import { ModeToggle } from "../mode-toggle"

  
  const NavBar = () => {
    return (
<nav className="grid grid-cols-2 bg-secondary border mb-5 p-2 place-items-center w-full">
    <h1 className="text-xl">Notes App</h1>
    <ModeToggle/>
</nav>
    )
  }
  export default NavBar