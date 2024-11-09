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

describe(" 'toBe' matcher compares with ===", function () {
  it('and has a postive case', function () {
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
    foo = 1;
  });

  beforeAll(function () {
    foo = 1;
  });

  afterAll(function () {
    foo = 0;
  });

  it('state of foo', function () {
    expect(foo).toBe(2);
  });
});

describe('A spec', function () {
  beforeEach(function () {
    this.foo = 0;
  });
  it('can use this `this` to share state', function () {
    expect(this.foo).toEqual(0);
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

// Manually Failing a spec with fail
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

// fdescribe - suites tested first
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
  //fit - tested tested first
  xit("can be declared 'xit'", function () {
    expect(true).toBe(false);
  });

  it('can be declared with `it` but without a function');

  it("can be declared by calling 'pending' in the spec body", function () {
    expect(true).toBe(false);
    pending('this is why it is pending');
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

  it('tracks if it was called at all', function () {
    foo.setBar();
    expect(foo.setBar.calls.any()).toEqual(true);
  });
});

describe('A spy, when created manually', function () {
  let whatAmI;

  beforeEach(function () {
    whatAmI = jasmine.createSpy('whatAmI');

    whatAmI('I', 'am', 'a', 'spy');
  });

  it('tracks that the spy was called', function () {
    expect(whatAmI).toHaveBeenCalled();
  });
});

describe('Multiple spies, when created manually', function () {
  let tape;

  beforeEach(function () {
    tape = jasmine.createSpyObj('tape', [
      'play',
      'pause',
      'stop',
      'rewind',
    ]);
    tape.play();
    tape.pause();
    tape.rewind(0);
  });

  it('creates spies for each requested function', function () {
    expect(tape.play).toBeDefined();
    expect(tape.pause).toBeDefined();
    expect(tape.stop).toBeDefined();
    expect(tape.rewind).toBeDefined();
  });
});

describe('jasmine.any', function () {
  it('matches any value', function () {
    expect({}).toEqual(jasmine.any(Object));
    expect(12).toEqual(jasmine.any(Number));
  });

  describe('when used with a spy', function () {
    it('is useful for comparing arguments', function () {
      const foo = jasmine.createSpy('foo');
      foo(12, function () {
        return true;
      });

      expect(foo).toHaveBeenCalledWith(
        jasmine.any(Number),
        jasmine.any(Function)
      );
    });
  });
});

describe('jasmine.objectContaining', function () {
  let foo;

  beforeEach(function () {
    foo = {
      a: 1,
      b: 2,
      bar: 'baz',
    };
  });

  it('matches objects with the expect key/value pairs', function () {
    expect(foo).toEqual(
      jasmine.objectContaining({
        bar: 'baz',
      })
    );
    expect(foo).not.toEqual(
      jasmine.objectContaining({
        c: 37,
      })
    );
  });

  describe('when used with a spy', function () {
    it('is useful for comparing arguments', function () {
      const callback = jasmine.createSpy('callback');

      callback({
        bar: 'baz',
      });

      expect(callback).toHaveBeenCalledWith(
        jasmine.objectContaining({ bar: 'baz' })
      );
    });
  });
});

describe('jasmine.arrayContaining', function () {
  let foo;

  beforeEach(function () {
    foo = [1, 2, 3, 4];
  });

  it('matches arrays with some of the values', function () {
    expect(foo).toEqual(jasmine.arrayContaining([3, 1]));
    expect(foo).not.toEqual(jasmine.arrayContaining([6]));
  });

  describe('when used with a spy', function () {
    it('is useful when comparing arguments', function () {
      const callback = jasmine.createSpy('callback');

      callback([1, 2, 3, 4]);

      expect(callback).toHaveBeenCalledWith(
        jasmine.arrayContaining([4, 2, 3])
      );

      expect(callback).not.toHaveBeenCalledWith(
        jasmine.arrayContaining([5, 2])
      );
    });
  });
});

describe('jasmine.stringMatching', function () {
  it('matches as a regexp', function () {
    expect({ foo: 'bar' }).toEqual({
      foo: jasmine.stringMatching(/^bar$/),
    });
    expect({ foo: 'foobarbaz' }).toEqual({
      foo: jasmine.stringMatching('bar'),
    });
  });
});

describe('custom asymmetry', function () {
  const tester = {
    asymmetricMatch: function (actual) {
      const secondValue = actual.split(',')[1];
      return secondValue === 'bar';
    },
  };

  it('dives in deep', function () {
    expect('foo,bar,baz,quux').toEqual(tester);
  });

  describe('when used with a spy', function () {
    it('is useful for comparing argments', function () {
      const callback = jasmine.createSpy('callback');
      callback('foo,bar,baz');

      expect(callback).toHaveBeenCalledWith(tester);
    });
  });
});
