import { Colors, Values, Card } from '../src/card';
import { Player } from '../src/player';

describe('Player', function() {
  describe('#constructor()', () => {
    it('should have a name', () => {
      expect(() => new (Player as any)()).toThrow();
      expect(() => new Player('')).toThrow();
      expect(() => new Player('Player 1')).not.toThrow();

      const name = 'Supercalifragilisticexpialidocious';
      const player = new Player(name);
      expect(player.name).toEqual(name);
    });
  });

  describe('#deck', function() {
    it('should start with 7 cards', () => pending());
  });

  describe('#play()', function() {
    it('should remove 1 card from player deck', () => pending());
  });

  describe('.fromSnapshot()', function() {
    it('should import a valid snapshot', () => {
      const snapshot = {
        name: 'Player 1',
        hand: [{ color: 0, value: 12 }, { color: 2, value: 4 }],
      };
      const player = Player.fromSnapshot(snapshot);
      expect(player).toBeDefined();
      expect(player.name).toBe('Player 1');
      expect(player.hand.length).toBe(2);
      const card = player.hand[1];
      expect([card.value, card.color]).toEqual([Values.FOUR, Colors.GREEN]);
    });
  });

  describe('#createSnapshot()', function() {
    it('should export a valid snapshot', () => {
      const player = new Player('Player 1');
      player.hand = [new Card(Values.ZERO, Colors.YELLOW)];
      const snapshot = player.createSnapshot();
      expect(snapshot).toBeDefined();
      expect(snapshot.name).toBe('Player 1');
      expect(snapshot.hand.length).toBe(1);
      expect(snapshot.hand[0].value).toBe(Values.ZERO);
    });
  });
});
