const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class SponsorController {
    static async getAllSponsors() {
        return prisma.sponsor.findMany({
            select: {
                id: true,
                name: true,
                adress: true,
                logo: true,
                link: true
            },
        });
    }

    static async createSponsor(name, adress, info, logo) {
        return prisma.sponsor.create({
            data: {
                name: name,
                adress: adress,
                info: info,
                logo: logo,
            },
        });
    }

    static async updateSponsor(id, name, adress, info, logo) {
        return await prisma.sponsor.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                adress: adress,
                info: info,
                logo: logo,
            },
        });
    }

    static async deleteSponsor(id) {
        return await prisma.sponsor.delete({
            where: {
                id: id,
            },
        });
    }
}

module.exports = SponsorController;
