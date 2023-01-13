const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserController {
    static async getAllUsers() {
        return prisma.user.findMany({
            select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
            },
        });
    }

    static async getUserByEmail(email) {
        return prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    }

    static async getUserById(id) {
        return prisma.user.findUnique({
            where: {
                id: id,
            },
        });
    }

    static async createUser(email, password, first_name, last_name) {
        return prisma.user.create({
            data: {
                email,
                password,
                first_name,
                last_name,
            },
        });
    }

    static async updateUser(id, email, first_name, last_name) {
        return await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                email: email,
                first_name: first_name,
                last_name: last_name,
            },
        });
    }

    static async updatePass(id, password) {
        return await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                password: password,
            },
        });
    }

    static async deleteUser(id) {
        return await prisma.user.delete({
            where: {
                id: id,
            },
        });
    }
}

module.exports = UserController;
