import request from 'supertest';
import app from '../../src/app';
import jwt from 'jsonwebtoken';

describe('GET /api/user/profile', () => {
  const mockUserPayload = {
    id: '123',
    email: 'test@example.com',
    name: 'Test User',
  };

  // Create a token using the same secret as your app
  const token = jwt.sign(mockUserPayload, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  it('should return user profile for valid token', async () => {
    const res = await request(app)
      .get('/api/user/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toMatchObject(mockUserPayload);
  });

  it('should return 401 if no token provided', async () => {
    const res = await request(app).get('/api/user/profile');
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
  });
});
