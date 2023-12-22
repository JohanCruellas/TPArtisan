const manufacturers = [
    {
        name: "BBois",
    },
    {
        name: "MetaLo",
    },
    {
        name: "pPlastique",
    },
]

const materials = [
    {
        name: "Frêne",
        type: "Wood",
        isEcoFriendly: true,
        cost : 10
    },
    {
        name: "Chêne",
        type: "Wood",
        isEcoFriendly: true,
        cost : 20
    },
    {
        name: "Noyer",
        type: "Wood",
        isEcoFriendly: true,
        cost : 30
    },
    {
        name: "Acier Inox",
        type: "Metal",
        isEcoFriendly: false,
        cost : 40
    },
    {
        name: "Aluminum",
        type: "Metal",
        isEcoFriendly: false,
        cost : 50
    },
    {
        name: "Plastique",
        type: "Plastic",
        isEcoFriendly: false,
        cost : 60
    },
]

const furnitures = [
    {
        name: "Géniale étagère à 5 niveaux",
        description : "Une étagère à 5 niveaux qui vous permettra de ranger tous vos livres et bibelots.",
        price : 250
    },
    {
        name: "Super armoire à 3 tiroirs",
        description : "Une armoire à 3 tiroirs qui vous permettra de ranger tous vos vêtements.",
        price : 500
    },
]

const categories = [
    {
        label: "Armoire",
    },
    {
        label: "Etagère",
    },
]

function initUtils() {
    return {
        async initialize(sequelize) {
            const { User, Furniture, Material, Manufacturer, Category } = sequelize.models
            let foundAdmin = await User.findOne({
                where: {
                    isAdministrator: true
                }
            })
            if (!foundAdmin) {
                let admin = await User.create({
                    username: "admin",
                    email: "admin@localhost.com",
                    password: "admin",
                    isAdministrator: true
                })

                await Manufacturer.bulkCreate(manufacturers)
                await Material.bulkCreate(materials)
                await Furniture.bulkCreate(furnitures)
                await Category.bulkCreate(categories)

                let BBois = await Manufacturer.findOne({
                    where: {
                        name: "BBois"
                    }
                })

                let MetaLo = await Manufacturer.findOne({
                    where: {
                        name: "MetaLo"
                    }
                })

                let pPlastique = await Manufacturer.findOne({
                    where: {
                        name: "pPlastique"
                    }
                })

                let Woods = await Material.findAll({
                    where: {
                        type: "Wood"
                    }
                })

                let Metals = await Material.findAll({
                    where: {
                        type: "Metal"
                    }
                })

                let Plastics = await Material.findAll({
                    where: {
                        type: "Plastic"
                    }
                })

                let Categories = await Category.findAll()

                Woods.forEach(async wood => {
                    wood.setManufacturers(BBois.id)
                })

                Metals.forEach(async metal => {
                    metal.setManufacturers(MetaLo.id)
                })

                Plastics.forEach(async plastic => {
                    plastic.setManufacturers(pPlastique.id)
                })

                let initializedFurnitures = await Furniture.findAll()
                initializedFurnitures.forEach(async (furniture, furnitureIndex) => {
                    furniture.setMaterials(Woods[0].id)
                    furniture.creatorId = admin.id
                    furniture.categoryId = Categories[furnitureIndex].id
                    await furniture.save()
                })
            }
        }
    };
}

module.exports = initUtils();

//

// Bois : frêne , chêne et noyer. Entreprise : BBois

// Fer : acier inox et aluminum. Entreprise : MetaLo

// Plastique. Entreprise : pPlastique.

// Il aimerait également avoir les catégories de meuble suivantes dans lequel il pourrait enregistrer l'ensemble de ses réalisations :

// Armoire

// Etagère
