import ThemeToggle from "./themeToggle"

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <h1>Country Explorer</h1>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header
