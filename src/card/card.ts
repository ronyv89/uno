import { Colors } from './colors';
import { Values } from './values';
import Serializable from '../serializable';

export interface CardSnapshot {
  value: number;
  color: number;
}
export class Card implements Serializable {
  private _value: Values;
  private _color: Colors | undefined;

  /**
   * Create instance from snapshot taken with
   * {@link createSnapshot}.
   */
  static fromSnapshot(snapshot: CardSnapshot): Card {
    return new Card(snapshot.value, snapshot.color);
  }

  constructor(value: Values, color?: Colors) {
    if (!Values.isWild(value) && color === undefined) {
      throw Error('Only wild cards can be initialized with no color');
    }

    this.value = value;
    this.color = color;
  }

  get value() {
    return this._value;
  }

  set value(value: Values) {
    if (this._value !== undefined && !this.isWildCard())
      throw new Error('Card values cannot be changed.');
    else if (!Values.isValidValue(value))
      throw new Error('The value must be a value from Values enum.');

    this._value = value;
  }

  /**
   * Index of the card color (from 0 to 3).
   *
   * WILD and WILD DRAW FOUR will not have this property set at start,
   * leaving it `undefined` until user sets it.
   */
  get color() {
    return this._color;
  }

  /**
   * @throws if trying to change the color of a non-wild card.
   * @throws if trying to set this to an unexistent color.
   */
  set color(color: Colors) {
    if (this._color !== undefined && !this.isWildCard())
      throw new Error('Only wild cards can have theirs colors changed.');
    else if (color !== undefined && !Colors.isValidValue(color))
      throw new Error('The color must be a value from Colors enum.');

    this._color = color;
  }

  isWildCard() {
    return Values.isWild(this.value);
  }

  isSpecialCard() {
    return (
      this.isWildCard() ||
      this.value === Values.DRAW_TWO ||
      this.value === Values.REVERSE ||
      this.value === Values.SKIP
    );
  }

  matches(other: Card) {
    if (this.isWildCard()) return true;
    else if (this.color === undefined || other.color === undefined)
      throw new Error(
        'Both cards must have theirs colors set before comparing',
      );

    return other.value === this.value || other.color === this.color;
  }

  get score() {
    switch (this.value) {
      case Values.DRAW_TWO:
      case Values.SKIP:
      case Values.REVERSE:
        return 20;
      case Values.WILD:
      case Values.WILD_DRAW_FOUR:
        return 50;
      default:
        return this.value;
    }
  }

  is(value: Values, color?: Colors) {
    let matches = this.value === value;
    if (!!color) matches = matches && this.color === color;
    return matches;
  }

  createSnapshot(): CardSnapshot {
    return {
      value: this.value,
      color: this.color,
    };
  }

  toString() {
    return `${Colors[this.color] || 'NO_COLOR'} ${Values[this.value]}`;
  }
}
