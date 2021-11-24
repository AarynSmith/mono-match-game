import "./App.scss";
import { Card } from "./Card";
import { BigCard } from "./BigCard";
import { MonoMatchDeck } from "./Deck";
import { faIcons } from "./SymbolSets";

import React from "react";
import { library, dom, IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { shuffle } from "./utility";

library.add(fas, fab);
dom.watch();

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

type Icon = { name: string; icon: JSX.Element };
const icons: Icon[] = shuffle(faIcons).map((v) => ({
  name: v,
  icon: (
    <FontAwesomeIcon
      icon={v as IconProp}
      color={colors[Math.floor(Math.random() * colors.length)]}
    />
  ),
}));

type AppProps = {};
type AppState = {
  CardA: Icon[];
  CardB: Icon[];
  Match: string;
};
class App extends React.Component<AppProps, AppState> {
  deck: MonoMatchDeck<Icon>;
  constructor(props: AppProps) {
    super(props);
    this.deck = new MonoMatchDeck({
      order: 5,
      symbols: icons,
      shuffle: true,
    });

    const CardA = this.draw();
    const CardB = this.draw();
    if (!CardA) {
      console.error(Error("Missing Cards in Deck"));
    }
    if (!CardB) {
      console.error(Error("Missing Cards in Deck"));
    }
    const Match =
      CardA?.find((v) => CardB?.map((v) => v.name).includes(v.name))?.name ||
      "";
    this.state = { CardA, CardB, Match } as AppState;
    this.handleClick = this.handleClick.bind(this);
  }
  draw() {
    const card = this.deck.cards.shift();
    if (card) {
      this.deck.cards.push(card);
      return card;
    }
    return;
  }

  handleClick(icon: string, match: string) {
    console.log("Clicked", { icon, match });
    if (icon === match) {
      const CardA = this.draw();
      const CardB = this.draw();
      if (!CardA) {
        console.error(Error("Missing Cards in Deck"));
      }
      if (!CardB) {
        console.error(Error("Missing Cards in Deck"));
      }
      const Match =
        CardA?.find((v) => CardB?.map((v) => v.name).includes(v.name))?.name ||
        "";
      this.setState({
        CardA,
        CardB,
        Match,
      } as AppState);
    }
  }

  render() {
    if (this.deck.cards.length === 0) return <div className="App">Problem</div>;
    return (
      <div className="App">
        <header className="App-header">
          <div className="title">MonolithicsMatch</div>
        </header>
        <div className="game-area">
          <BigCard
            icons={this.state.CardA}
            match={this.state.Match}
            onClick={this.handleClick}
          />
          <BigCard
            icons={this.state.CardB}
            match={this.state.Match}
            onClick={this.handleClick}
          />
        </div>
        <div className="card-container">
          {this.deck.cards.map((v, i) => {
            return <Card key={i} icons={v} />;
          })}
        </div>
      </div>
    );
  }
}

export default App;
