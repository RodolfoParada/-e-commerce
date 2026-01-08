// Task 1: Pirámide de Testing y Testing de Integración (8 minutos)
// Comprensión de dónde encaja el integration testing en la estrategia general de testing.

// 🏗️ La Pirámide de Testing
// Jerarquía de tests por costo y velocidad:

// E2E Tests (5-10%)         ⬆️ Más lentos, más caros
//     ▲                        Más realistas
// Integration Tests (20%)
//     ▲
// Unit Tests (70-80%)         ⬇️ Más rápidos, más baratos
//                            Más enfocados
// Características de cada nivel:

// Unit Tests (rápidos, baratos, muchos):

// Funciones/módulos individuales
// Mocks para dependencias externas
// Cobertura alta de edge cases
// Desarrollo en TDD
// Integration Tests (moderados):

// Interacción entre módulos
// APIs reales con DB de test
// Flujos completos de negocio
// Verificación de contratos
// E2E Tests (lentos, caros, pocos):

// Flujo completo usuario-sistema
// Navegador real
// Cobertura de happy paths críticos
// Validación de UX completa
// Concepto clave: Integration tests verifican que las piezas funcionen juntas correctamente.

// 🔗 ¿Qué es Integration Testing?
// Testing que verifica integración entre componentes:

// ¿Por qué es necesario?

// Unit tests pasan pero sistema falla en conjunto
// Interfaces entre módulos pueden tener bugs
// Configuración puede causar problemas
// Datos pueden corromperse en tránsito
// Ejemplo de integration testing:

// ❌ Unit test (aislado)
test('UserService.createUser guarda usuario', () => {
  const mockRepo = { save: jest.fn() };
  const service = new UserService(mockRepo);

  service.createUser({ name: 'Juan' });

  expect(mockRepo.save).toHaveBeenCalledWith({ name: 'Juan' });
});

// ✅ Integration test (real)
test('POST /users crea usuario en base de datos', async () => {
  const response = await request(app)
    .post('/users')
    .send({ name: 'Juan', email: 'juan@test.com' })
    .expect(201);

  expect(response.body).toHaveProperty('id');

  // Verificar en DB real
  const userInDb = await User.findByPk(response.body.id);
  expect(userInDb.name).toBe('Juan');
});
// Concepto clave: Integration tests usan dependencias reales (o casi reales) para verificar funcionamiento conjunto.