Practical exercise to apply the concepts learned.
🛠️ Implementación Práctica
Crea suite completa de integration tests:

Configurar Entorno de Testing

Base de datos de test separada
Factories para datos consistentes
Setup global optimizado
Testing de APIs REST

Endpoints CRUD completos
Validación de requests/responses
Manejo de errores HTTP
Testing con Base de Datos

Operaciones complejas con joins
Constraints y relaciones
Transacciones y rollback
Testing de Lógica de Negocio

Reglas de negocio complejas
Autorización y permisos
Estados y transiciones
Optimización de Performance

Tests paralelos eficientes
Setup mínimo necesario
Cleanup automático
Ejercicio: Implementa integration tests para un sistema de "e-commerce" que incluya usuarios, productos, pedidos y pagos, verificando todas las relaciones y reglas de negocio.

Requerimientos:
# Instalar dependencias de testing integración
npm install --save-dev supertest sequelize-test-helpers

# Configurar variables de entorno para test
# .env.test
NODE_ENV=test
DATABASE_URL=postgresql://test:test@localhost:5432/test_db
JWT_SECRET=test_jwt_secret

# Configurar scripts
{
  "scripts": {
    "test:integration": "jest --testPathPattern=integration",
    "test:unit": "jest --testPathPattern=unit"
  }
}