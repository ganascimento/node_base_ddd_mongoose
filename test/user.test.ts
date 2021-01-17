import 'jest';
import request from 'supertest';

let address: string = (<any>global).address;
const auth: string = process.env.TOKEN_TEST || '';

test('create user', async () => {
    return await request(address)
        .post('/user')
        .send({
            firstName: "Guilherme",
            lastName: "Araujo",
            email: "gui@email.com",
            password: "12345678"
        })
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.userName).toBe('Guilherme Araujo');
            expect(res.body.data.userEmail).toBe('gui@email.com');
        });
});

test('login', async () => {
    return await request(address)
        .post('/user/auth')
        .send({
            email: "gui@email.com",
	        password: "12345678"
        })
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.userName).toBe('Guilherme Araujo');
            expect(res.body.data.userEmail).toBe('gui@email.com');
        });
});

test('login invalid credentials', async () => {
    return await request(address)
        .post('/user/auth')
        .send({
            email: "gui@email.com",
	        password: "123456789"
        })
        .then(res => {
            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        });
});

test('update user', async () => {
    return await request(address)
        .put('/user')
        .set('Authorization', auth)
        .send({
            firstName: "Guilherme",
	        lastName: "de Araujo"
        })
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toBe(true);
        });
});

test('change password', async () => {
    return await request(address)
        .put('/user/password')
        .set('Authorization', auth)
        .send({
            password: "123465789"
        })
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toBe(true);
        });
});