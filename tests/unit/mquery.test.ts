import { afterEach, it } from 'mocha';
import { createSandbox } from 'sinon';
import { expect } from 'chai';
import { mquery } from '../../src/mquery';

export default (): void => {
  const sandbox = createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it('should attach mquery', async () => {
    const mqueryMw = mquery();

    const req = { query: {} } as any;
    const res = sandbox.spy();
    const next = sandbox.spy();

    mqueryMw(req, res as any, next as any);

    expect(req.mquery.filter).to.exist;
    expect(req.mquery.options).to.exist;
    expect(next.calledOnce).to.be.equal(true);
  });

  it('should parse filter', async () => {
    const mqueryMw = mquery();

    const req = { query: { filter: 'key1==value1' } } as any;
    const res = sandbox.spy();
    const next = sandbox.spy();

    mqueryMw(req, res as any, next as any);

    expect(req.mquery.filter).to.deep.equal({ key1: 'value1' });
    expect(next.calledOnce).to.be.equal(true);
  });

  it('should fail to parse filter', async () => {
    const mqueryMw = mquery();

    const req = { query: { filter: 'invalid' } } as any;
    const res = sandbox.spy();
    const next = sandbox.spy();

    mqueryMw(req, res as any, next as any);

    expect(next.args[0][0].type).to.be.equal('mquery.parse.failed');
  });

  it('should parse fields', async () => {
    const mqueryMw = mquery();

    const req = { query: { fields: 'key1;key2' } } as any;
    const res = sandbox.spy();
    const next = sandbox.spy();

    mqueryMw(req, res as any, next as any);

    expect(req.mquery.options.projection).to.deep.equal({
      key1: 1,
      key2: 1,
    });
    expect(next.calledOnce).to.be.equal(true);
  });

  it('should parse sort', async () => {
    const mqueryMw = mquery();

    const req = { query: { sort: 'key1==asc;key2==desc;key3' } } as any;
    const res = sandbox.spy();
    const next = sandbox.spy();

    mqueryMw(req, res as any, next as any);

    expect(req.mquery.options.sort).to.deep.equal({
      key1: 1,
      key2: -1,
      key3: 1,
    });
    expect(next.calledOnce).to.be.equal(true);
  });

  it('should fail to parse sort', async () => {
    const mqueryMw = mquery();

    const req = { query: { sort: 'invalid==invalid' } } as any;
    const res = sandbox.spy();
    const next = sandbox.spy();

    mqueryMw(req, res as any, next as any);

    expect(next.args[0][0].type).to.be.equal('mquery.parse.failed');
  });

  it('should parse page', async () => {
    const mqueryMw = mquery();

    const req = {
      query: {
        page: '3',
        limit: '10',
      },
    } as any;
    const res = sandbox.spy();
    const next = sandbox.spy();

    mqueryMw(req, res as any, next as any);

    expect(req.mquery.options.skip).to.deep.equal(20);
    expect(req.mquery.options.limit).to.deep.equal(10);
    expect(next.calledOnce).to.be.equal(true);
  });

  it('should parse page without limit', async () => {
    const mqueryMw = mquery();

    const req = { query: { page: '3' } } as any;
    const res = sandbox.spy();
    const next = sandbox.spy();

    mqueryMw(req, res as any, next as any);

    expect(req.mquery.options.skip).to.deep.equal(2);
    expect(next.calledOnce).to.be.equal(true);
  });

  it('should parse skip', async () => {
    const mqueryMw = mquery();

    const req = { query: { skip: '1' } } as any;
    const res = sandbox.spy();
    const next = sandbox.spy();

    mqueryMw(req, res as any, next as any);

    expect(req.mquery.options.skip).to.deep.equal(1);
    expect(next.calledOnce).to.be.equal(true);
  });

  it('should parse limit', async () => {
    const mqueryMw = mquery();

    const req = { query: { limit: '1' } } as any;
    const res = sandbox.spy();
    const next = sandbox.spy();

    mqueryMw(req, res as any, next as any);

    expect(req.mquery.options.limit).to.deep.equal(1);
    expect(next.calledOnce).to.be.equal(true);
  });
};
