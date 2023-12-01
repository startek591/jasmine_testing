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

  describe('A spec', function () {
    let foo;

    beforeEach(function () {
      foo = 0;
      foo += 1;
    });

    afterEach(function () {
      foo = 0;
    });

    it('is just a function, so it can contain any code', function () {
      expect(foo).toEqual(1);
    });

    it('can have more than one expectation', function () {
      expect(foo).toEqual(1);
      expect(true).toEqual(true);
    });

    describe('nested inside a second describe', function () {
      let bar;

      beforeEach(function () {
        bar = 1;
      });

      it('can reference both scopes as needed', function () {
        expect(foo).toEqual(bar);
      });
    });
  });

  xdescribe('A spec', function () {
    let foo;

    beforeEach(function () {
      foo = 0;
      foo += 1;
    });

    it('is just a function, so it can contain any code', function () {
      expect(foo).toEqual(1);
    });
  });

  describe('Pending specs', function () {
    xit('can be declared `xit`', function () {
      expect(true).toBe(false);
    });
  });

  describe('A spy', function () {
    let foo;
    let bar = null;

    beforeEach(function () {
      foo = {
        setBar: function (value) {
          bar = value;
        },
      };

      spyOn(foo, 'setBar');

      foo.setBar(123);
      foo.setBar(456, 'another param');
    });

    it('tracks that the spy was called', function () {
      expect(foo.setBar).toHaveBeenCalled();
    });

    it('tracks that the spy was called x times', function () {
      expect(foo.setBar).toHaveBeenCalledTimes(2);
    });

    it('tracks all the arguments of its calls', function () {
      expect(foo.setBar).toHaveBeenCalledWith(123);
      expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
    });

    it('stops all execution on a function', function () {
      expect(bar).toBeNull();
    });

    it('tracks if it was called at all', function () {
      foo.setBar();
      expect(foo.setBar.calls.any()).toEqual(true);
    });
  });
})();
