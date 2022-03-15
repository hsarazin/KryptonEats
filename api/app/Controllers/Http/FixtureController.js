'use strict'
const Env = use('Env')
const Product = use('App/Models/Product')
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
}

module.exports = FixtureController
