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
