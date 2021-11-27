import "./App.scss";

import { BigCard } from "./BigCard";
import { MonoMatchDeck } from "./Deck";
import { faAllIcons } from "./SymbolSets";
import { IconType } from "./Icon";

import React from "react";
import { library, dom, IconName } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { shuffle } from "./utility";

library.add(fas, fab);
dom.watch();

const colors = [
  "#cbff4d",
  "#afed68",
  "#93dc84",
  "#77ca9f",
  "#5bb9bb",
  "#3fa7d6",
  "#89c7e6",
  "#add7ef",
  "#d2e7f7",
  "#f7f7ff",
];
const icons: IconType[] = shuffle(faAllIcons).map((v) => ({
  name: v,
  icon: ["fas", v as IconName],
  color: colors[Math.floor(Math.random() * colors.length)],
}));

type AppProps = {};
type AppState = {
  CardA: IconType[];
  CardB: IconType[];
  Match: string;
  Score: number;
  ScoreTime: number;
  StartTime: number;
};
class App extends React.Component<AppProps, AppState> {
  deck: MonoMatchDeck<IconType>;
  constructor(props: AppProps) {
    super(props);
    this.deck = new MonoMatchDeck({
      order: 11,
      symbols: icons,
      shuffle: true,
    });

    const CardA = this.draw();
    const CardB = this.draw();
    if (!CardA) console.error(Error("Missing Cards in Deck"));
    if (!CardB) console.error(Error("Missing Cards in Deck"));
    const Match = CardA?.find((v) =>
      CardB?.map((v) => v.name).includes(v.name)
    )?.name;
    if (!Match) console.error("No match");
    this.state = {
      CardA,
      CardB,
      Match,
      Score: 0,
      ScoreTime: 0,
      StartTime: Date.now(),
    } as AppState;

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
    console.log("Clicked", { icon });
    if (icon === match) {
      const CardA = this.draw();
      const CardB = this.draw();
      if (!CardA) console.error(Error("Missing Cards in Deck"));
      if (!CardB) console.error(Error("Missing Cards in Deck"));
      const Match = CardA?.find((v) =>
        CardB?.map((v) => v.name).includes(v.name)
      )?.name;
      if (!Match) console.error("No Match found");
      this.setState({
        CardA,
        CardB,
        Match,
        Score: this.state.Score + 1,
        ScoreTime: Date.now() - this.state.StartTime,
        StartTime: Date.now(),
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
          <div className="game-head">Matches Found {this.state.Score}</div>
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
          <div className="game-foot">
            Last found in {Math.floor(this.state.ScoreTime / 1000)} seconds
          </div>
        </div>
      </div>
    );
  }
}

export default App;
