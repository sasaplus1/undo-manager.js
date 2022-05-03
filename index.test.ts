import assert = require('assert');

import { UndoManager } from '.';

describe('UndoManager', function () {
  describe('add', function () {
    it('should add item', function () {
      const um = new UndoManager<number>();

      um.add(1);
      um.add(2);

      assert(um.undo() === 1);
    });
    it('should add item and remove items', function () {
      const um = new UndoManager<number>();

      um.add(1);
      um.add(2);
      um.add(3);
      um.add(4);
      um.add(5);

      um.undo();
      um.undo();

      um.add(6);
      um.add(7);
      um.add(8);

      assert(um.undo() === 7);
      assert(um.undo() === 6);
      assert(um.undo() === 3);
      assert(um.undo() === 2);
      assert(um.undo() === 1);

      assert(um.redo() === 2);
      assert(um.redo() === 3);
      assert(um.redo() === 6);
      assert(um.redo() === 7);
      assert(um.redo() === 8);
    });
  });
  describe('canRedo', function () {
    it('return false when just created', function () {
      const um = new UndoManager<number>();

      assert(!um.canRedo());

      um.add(1);

      assert(!um.canRedo());

      um.add(2);

      assert(!um.canRedo());
    });
    it('return true if can redo', function () {
      const um = new UndoManager<number>();

      um.add(1);
      um.add(2);
      um.undo();

      assert(um.canRedo());
    });
    it('return false if cannot redo', function () {
      const um = new UndoManager<number>();

      um.add(1);
      um.add(2);
      um.undo();
      um.redo();

      assert(!um.canRedo());
    });
  });
  describe('canUndo', function () {
    it('return false when just created', function () {
      const um = new UndoManager<number>();

      assert(!um.canUndo());

      um.add(1);

      assert(!um.canUndo());
    });
    it('return true if can undo', function () {
      const um = new UndoManager<number>();

      um.add(1);
      um.add(2);

      assert(um.canUndo());
    });
    it('return false if cannot undo', function () {
      const um = new UndoManager<number>();

      um.add(1);

      assert(!um.canUndo());

      um.add(2);
      um.undo();

      assert(!um.canUndo());
    });
  });
  describe('clear', function () {
    it('should remove all items', function () {
      const um = new UndoManager<number>();

      um.add(1);
      um.clear();

      assert(um.length === 0);

      um.add(1);
      um.add(2);
      um.add(3);
      um.add(4);
      um.add(5);
      um.clear();

      assert(um.length === 0);
    });
  });
  describe('length', function () {
    it('return item count', function () {
      const um = new UndoManager<number>();

      assert(um.length === 0);

      um.add(1);

      // NOTE: `+` is fix for TS2367
      assert(+um.length === 1);

      um.add(2);

      // NOTE: `+` is fix for TS2367
      assert(+um.length === 2);
    });
  });
  describe('redo', function () {
    it('throws error when just created', function () {
      const um = new UndoManager<number>();

      assert.throws(function () {
        um.redo();
      });
    });
    it('cannot redo if out of range', function () {
      const um = new UndoManager<number>();

      um.add(1);
      um.add(2);
      um.undo();
      um.redo();

      assert.throws(function () {
        um.redo();
      });
    });
    it('can redo if index in the range', function () {
      const um = new UndoManager<number>();

      um.add(1);
      um.add(2);
      um.add(3);
      um.undo();
      um.undo();

      assert(um.redo() === 2);
      assert(um.redo() === 3);
    });
  });
  describe('undo', function () {
    it('throws error when just created', function () {
      const um = new UndoManager<number>();

      assert.throws(function () {
        um.undo();
      });
    });
    it('cannot undo if out of range', function () {
      const um = new UndoManager<number>();

      um.add(1);
      um.add(2);
      um.undo();

      assert.throws(function () {
        um.undo();
      });
    });
    it('can undo if index in the range', function () {
      const um = new UndoManager<number>();

      um.add(1);
      um.add(2);
      um.add(3);

      assert(um.undo() === 2);
      assert(um.undo() === 1);
    });
  });
});
