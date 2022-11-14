const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Usercontroller {
    static async getAllUsers() {
        return prisma.user.findMany({
            select: {
                email: true,
                first_name: true,
                last_name: true,
                created_at: true,
                updated_at: true
            }
        });
    }

    static async getUser(email) {
        return prisma.user.findUnique({
            where: {
                email
            }
        });
    }

    static async getUserById(id) {
        return prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    static async createUser(email, password, first_name, last_name) {
        return prisma.user.create({
            data: {
                email,
                password,
                first_name,
                last_name
            }
        })
    }

    static async updateUser(id, data) {
        return await prisma.user.update({
            where: {
                id
            },
            data: {
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                updated_at: new Date(Date.now())
            }
        })
    }

    static async deleteUser(id) {
        return await prisma.geofence.delete({
            where: {
                id
            }
        })
    }
}

module.exports = Usercontroller;