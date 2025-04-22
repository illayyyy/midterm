import ThemeToggle from "./themeToggle"

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <h1>Visualizing Country Information</h1>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header
