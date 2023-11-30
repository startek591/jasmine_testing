(function () {
  describe('A suite', function () {
    it('contains spec with an expectation', function () {
      expect(true).toBe(true);
    });
  });

  describe('A suite is just a function', function () {
    let a;
    it('and so is a spec', function () {
      a = true;
      expect(a).toBe(true);
    });
  });

  describe("The 'toBe' matcher compares with ===", function () {
    it('and has a positive case', function () {
      expect(true).toBe(true);
    });

    it('and can have a negative case', function () {
      expect(false).not.toBe(true);
    });
  });

  describe('A suite with some shared setup', function () {
    let foo = 0;

    beforeEach(function () {
      foo += 1;
    });

    afterEach(function () {
      foo = 0;
    });

    beforeAll(function () {
      foo = 1;
    });

    afterAll(function () {
      foo = 0;
    });

    xit(); // Setup and Teardown
  });

  describe('A spec', function () {
    beforeEach(function () {
      this.foo = 0;
    });

    it('can use the `this` to share state', function () {
      expect(this.foo).toEqual(0);
      this.bar = 'test pollution?';
    });

    it(
      'prevents test pollution by having an empty `this` ' +
        'created for the next spec',
      function () {
        expect(this.foo).toEqual(0);
        expect(this.bar).toBe(undefined);
      }
    );
  });

  describe('A spec using the fail function', function () {
    function foo(x, callBack) {
      if (x) {
        callBack();
      }
    }

    it('should not call the callBack', function () {
      foo(false, function () {
        fail('Callback has been called');
      });
    });
  });
})();
