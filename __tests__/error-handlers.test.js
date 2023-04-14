'use strict';
const handle404 = require('../src/error-handlers/404.js');
const errorHandler = require('../src/error-handlers/500.js');


describe('handle404 function', () => {
  it('should set status to 404', () => {
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    handle404(null, res, null);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('should set error message', () => {
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    handle404(null, res, null);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: 'Sorry, we could not find what you were looking for'
    });
  });
});


describe('errorHandler middleware', () => {
  it('should set status to 500', () => {
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    errorHandler('test error', null, res, null);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('should set error message', () => {
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    errorHandler('test error', null, res, null);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: 'test error'
    });
  });

  it('should set error message from error object', () => {
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const error = new Error('test error');
    errorHandler(error, null, res, null);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: 'test error'
    });
  });
});

