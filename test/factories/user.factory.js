class UserFactory {
  static async create(overrides = {}) {
    return {
      id: 1,
      name: overrides.name || 'User',
      email: overrides.email || 'user@test.com',
      role: overrides.role || 'user'
    };
  }

  static async createAdmin() {
    return this.create({
      role: 'admin',
      email: 'admin@test.com',
      name: 'Admin'
    });
  }
}

module.exports = UserFactory;
