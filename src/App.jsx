function App() {
  return (
    <div>
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <h1 className="title is-4 has-text-white">Proyecto Innova</h1>
          </a>
        </div>
      </nav>

      <section className="section">
        <div className="container">
          <div className="box">
            <h2 className="title">¡Bienvenido!</h2>
            <p className="subtitle">
              Esta es la base de tu proyecto con <strong>React</strong> y <strong>Bulma CSS</strong>.
            </p>
            <button className="button is-link">Comenzar</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>Proyecto ING2030</strong> - Construido con React y Bulma.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
