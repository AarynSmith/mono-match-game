import "./App.scss";
import { Card } from "./Card";
import { MonoMatchDeck } from "./Deck";
import { faIcons } from "./SymbolSets";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { shuffle } from "./utility";

library.add(fas);

const colors = [
  "red",
  "green",
  "orange",
  "blueviolet",
  "blue",
  "cyan",
  "limegreen",
  "navy",
  "tomato",
  "thistle",
  "slategray",
  "sandybrown",
  "powderblue",
  "moccasin",
  "maroon",
];

const icons = shuffle(faIcons).map((v) => (
  <FontAwesomeIcon
    icon={v}
    color={colors[Math.floor(Math.random() * colors.length)]}
  />
));

const deck = new MonoMatchDeck({
  order: 4,
  symbols: icons,
  shuffle: true,
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="title">Cards</div>
      </header>
      <div className="card-container">
        {deck.deck.map((v, i) => {
          return <Card key={i} icons={v} />;
        })}
      </div>
    </div>
  );
}

export default App;
