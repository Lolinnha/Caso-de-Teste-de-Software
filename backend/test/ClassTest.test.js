// Import necessary modules
const request = require('supertest');
const app = require("../index.js");
const { dbSync } = require("../config/dbConnect.js")
const classController = require('../controllers/classContrller.js')

// Description of the test suite
describe('Test for workshop creation', () => {
  
  test('Should create a workshop successfully', async () => {

    const newOng = {
      name: "Instituto Ebenézer",
      email: "inst.ebenezer@gmail.com",
      cnpj: "000.000.000/0001-00",
      telephone: "1190000-0000",
      foundationData: "2020-09-08",
      address: "Rua Preciso de um Milagre, Céu, 7"
    };

    // Example data for workshop creation
    const newClass = {
      local: "online",
      status: true,
      workshop: "vôlei",
      category: "esporte",
      ong_id: 1
    };

    await dbSync()
    
    // Make a POST request to the /classes route with the data of the new class
    await request(app).post('/api/ongs').set('Content-Type', 'application/json').send(newOng);
    const response = await request(app).post('/api/classes').set('Content-Type', 'application/json').send(newClass);
    
    // Check if the response has HTTP status 201 OK and if the response contains the data of the created class
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.workshop).toBe(newClass.workshop);
    expect(response.body.category).toBe(newClass.category);
   
  });
  
  
});
