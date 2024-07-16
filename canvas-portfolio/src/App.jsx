import ArrowImg from "./assets/arrow.svg";
import Nudake from "./containers/Nudake.jsx";
import RotateCanvas from "./containers/RotateCanvas.jsx";

function App() {
  return (
    <>
      <div className="app">
        {/* <section className="section-1">
          <header>
            <h1>1021</h1>
            <ul>
              <li>INSTAGRAM</li>
              <li>X</li>
              <li>Codepen</li>
            </ul>
          </header>
          <main> 
            <div><Nudake /></div>
          </main>
        </section>

        <section className="section-2">XXOKEE</section>

        <section className="section-3">
          <aside>
            <div className="top">
              Generated 50 paragraphs, 4068 words, 27691{" "}
            </div>
            <div className="bottom">
              <img src={ArrowImg} />
              <img src={ArrowImg} />
            </div>
          </aside>
          <article>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
            dignissimos tenetur quisquam in, rerum similique incidunt quod
            explicabo suscipit deleniti fugiat facilis velit earum praesentium
            expedita, perspiciatis ipsum aspernatur alias?
          </article>
        </section> */}

        <section className="section-4">
          <RotateCanvas />
        </section>
      </div>

      <footer>
        <div className="email">xxoke@gmail.com</div>
      </footer>
    </>
  );
}

export default App;
