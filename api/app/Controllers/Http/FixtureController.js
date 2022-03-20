'use strict'
const Env = use('Env')
const Product = use('App/Models/Product')
const User = use('App/Models/User')
const Token = use('App/Models/Token')
class FixtureController {
    /**
   * Load fixtures in database
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async dev({request, response}) {
        const {password} = request.post()

        if(!password || password!=Env.get('FIXTURE_PASSWORD'))
            return response.status(403).send({message: "You are not allow to use this route"})

        /**
         * Clear all the products already stored in database
         */
        const products = await Product.all()
        console.log(products)
        if(products){
            for(let i = 0; i < products.rows.length; i++){
                console.log(products.rows[i])
                products.rows[i].delete()
            }
        }

        const data = [{
            reference: 'IDE84YZ',
            titre: 'Burger Bacon cheese chicken',
            description: 'Un bon burger au poulet et bacon avec son cheddar fondu',
            prix: 15.90,
            quantite: 1
        },
        {
            reference: 'Z444Y160',
            titre: 'Wrap courgette',
            description: 'Parce que les vegans aussi on le droit de se faire plaisir !',
            prix: 7.90,
            quantite: 1
        }]

        const products_inDB = await Product.createMany(data)

        return response.status(201).send({
            message : "Fixture correctly loaded",
            products: data
        })
    }

    async prod({request, response}) {
        const {password} = request.post()

        if(!password || password!=Env.get('FIXTURE_PASSWORD'))
            return response.status(403).send({message: "You are not allow to use this route"})

        /**
         * Clear all the products already stored in database
         */
        const products = await Product.all()
        console.log(products)
        if(products){
            for(let i = 0; i < products.rows.length; i++){
                console.log(products.rows[i])
                products.rows[i].delete()
            }
        }

        const data = [{
            reference: 'B4C1590',
            titre: 'Burger Bacon cheese chicken',
            description: 'Un bon burger au poulet et bacon avec son cheddar fondu',
            prix: 15.90,
            quantite: 0
        },
        {
            reference: 'WRCO790',
            titre: 'Wrap courgette',
            description: 'Parce que les vegans aussi on le droit de se faire plaisir !',
            prix: 7.90,
            quantite: 0
        },
        {
            reference: 'Z444Y160',
            titre: 'Big Maxi Huge Triple Cheese Burger',
            description: 'Les vrais amoureux du burger à l\'américain l\'aimeront',
            prix: 17.90,
            quantite: 0
        },
        {
            reference: 'FF250',
            titre: 'La barquette de frites, la classique',
            description: 'Le petit accompagnement qui va bien',
            prix: 2.50,
            quantite: 0
        },
        {
            reference: 'FF400',
            titre: 'La grosse barquette de frites, la belle',
            description: 'Le gros accompagnement qui va bien',
            prix: 4.00,
            quantite: 0
        },
        {
            reference: 'FF550',
            titre: 'La très belle barquette de frite, l\'énorme',
            description: 'Avec son fromage fondu et ses morceaux de bacon',
            prix: 5.50,
            quantite: 0
        }]

        const users = [
            {
                email: "corentin.mors@insa-cvl.fr",
                password: "D4$HL4N3",
                nom:"Mors",
                prenom: "Corentin",
                adresse_numero: "21",
                adresse_rue: "Rue de la Vie",
                ville:"Paris",
                code_postal: "75018"
            },{
                email: "delivery@kryptoneats.fr",
                password: "0H_MY_L01$",
                nom:"Delivery",
                prenom: "Guy",
                adresse_numero: "88",
                adresse_rue: "Boulevard Lahitolle",
                ville:"Bourges",
                code_postal: "18000"
            },
        ]

        const products_toStore = await Product.createMany(data)
        const users_toStore = await User.createMany(users)

        return response.status(201).send({
            message : "Fixture correctly loaded",
            products: data
        })
    }
}

module.exports = FixtureController
