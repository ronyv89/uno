import { Card, Values } from './card';
import { CardSnapshot } from './card/card';
import Serializable from './serializable';

export interface PlayerSnapshot {
  name: string;
  hand: CardSnapshot[];
}
export class Player implements Serializable {
  name: string;
  // FIXME: make private, initialize on constructor
  hand: Card[] = [];

  static fromSnapshot(snapshot: PlayerSnapshot) {
    const player = new Player(snapshot.name);
    player.hand = snapshot.hand.map(Card.fromSnapshot);
    return player;
  }

  constructor(name: string) {
    name = !!name ? name.trim() : name;
    if (!name) throw new Error('Player must have a name');

    this.name = name;
  }

  getCardByValue(value: Values) {
    if (!value) return undefined;

    return this.hand.find(c => c.value === value);
  }

  hasCard(card: Card) {
    if (!card) return false;

    return this.hand.some(
      c => c.value === card.value && c.color === card.color,
    );
  }

  removeCard(card: Card) {
    if (!this.hasCard(card)) return;

    const i = this.hand.findIndex(
      c => c.value === card.value && c.color === card.color,
    );
    this.hand.splice(i, 1);
  }

  valueOf() {
    return this.name;
  }

  createSnapshot(): PlayerSnapshot {
    return {
      name: this.name,
      hand: this.hand.map(c => c.createSnapshot()),
    };
  }

  toString() {
    return this.name;
  }
}
