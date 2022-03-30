'use strict'

const Hash = use('Hash')
const User = use('App/Models/User')
const Token = use('App/Models/Token')

class SecurityController {
    islogged(request_params){
        return new Promise(async(resolve, reject) => {
            const user_inDB = await User.findBy('email',request_params.email)
            if(!user_inDB)
                reject("An error occured (1)")
    
            const token_inDB = await Token.findBy('user_id', user_inDB.id)
            if(!token_inDB || token_inDB.token!=request_params.token)
                reject("An error occured (2)")
    
            resolve(token_inDB.type)
        })
    }
    generateToken() {
        var c = 'abcdefghijknopqrstuvwxyzACDEFGHJKLMNPQRSTUVWXYZ12345679',
            n = c.length,
            /* p : chaîne de caractères spéciaux */
            p = '!$*&',
            o = p.length,
            r = '',
            n = c.length,
            /* s : determine la position du caractère spécial dans le mdp */
            s = Math.floor(Math.random() * (p.length - 1));

        for (var i = 0; i < 255; ++i) {
            if (s == i) {
                /* on insère à la position donnée un caractère spécial aléatoire */
                r += p.charAt(Math.floor(Math.random() * o));
            } else {
                /* on insère un caractère alphanumérique aléatoire */
                r += c.charAt(Math.floor(Math.random() * n));
            }
        }
        return r;
    }

    async register({request, response}){
        const {email, password, nom, prenom, adresse_numero, adresse_rue, ville, code_postal}=request.post()

        if(!email || !password || !nom || !prenom || !adresse_numero || ! adresse_rue || !ville || !code_postal)
        return response.status(403).send({
            message: "Registration form error",
            format: {
                email: "login",
                password: "password",
                nom:"nom",
                prenom: "prenom",
                adresse_numero: "adresse_numero",
                adresse_rue: "adresse_rue",
                ville:"ville",
                code_postal: "code_postal"
            }
        })

        var user_inDB= await User.findBy('email', email)

        if(user_inDB)
        return response.status(403).send({
            message: "An error occured (3)"
        })

        const user = new User()
        user.password=password
        user.email=email
        user.nom=nom
        user.prenom=prenom
        user.adresse_numero=adresse_numero
        user.adresse_rue=adresse_rue
        user.ville=ville
        user.code_postal=code_postal

        user.save()

        user_inDB= await User.findBy('email', email)

    
        const token_gen=this.generateToken()

        const token = new Token()
        token.user_id=user_inDB.id
        token.token=token_gen
        if(email.split('@')[1]=="kryptoneats.fr"){
            token.type="courier"
        } else {
            token.type="customer"
        }

        token.save()

        return response.status(201).send({
            message : "User correctly registered",
            token: token_gen
        })
    }

    async whoami({request, response}){
        const {mail, token} = request.headers()
        const auth = {mail, token}

        if(!mail || !token)
        return response.status(403).send({message: "You must be authenticated"})
        
        const role=[]
        try {
            role[0] = await this.islogged({email: auth.mail, token: auth.token})
        } catch(error) {
            return response.status(403).send({
                message : "An error occured"
            })
        }
        const user = await User.findBy('email', mail)
        const user_toReturn = {
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            adresse_numero: user.adresse_numero,
            adresse_rue: user.adresse_rue,
            ville: user.ville,
            code_postal: user.code_postal
        }
        return response.status(200).send({
            user: user_toReturn
        })
    }

    async login({request, response}){
        const {email, password, token} = request.post()

        if(!email || (!password && !token))
        return response.status(403).send({
            message: "Login Form Error",
            format: {
                email:"email",
                password:"password"
            }
        })

        const user = await User.findBy('email', email)
        if(!user)
            return response.status(403).send({
            message: "An error occured (4)"
            })

        if(token){
            var res
            try {
                res = this.islogged({email: email, token: token})
            } catch(error) {
                return response.status(403).send({
                    message: error
                })
            }
                return response.status(200).send({
                    message: "User logged in",
                    token: res.token
                })
        }

        const pwdVerif = await Hash.verify(password, user.password)

        if(!pwdVerif)
            return response.status(403).send({
                message: "An error occured"
            })
        
        const token_user = await Token.findBy('user_id', user.id)

        const token_gen = []
        if(!token_user){
            token_gen[0]=new Token()
        } else {
            token_gen[0] = token_user
        }
        if(user.email.split('@')[1]=="kryptoneats.fr"){
            token_gen[0].type="courier"
        } else {
            token_gen[0].type="customer"
        }
        token_gen[0].user_id=user.id
        token_gen[0].token = this.generateToken()

        token_gen[0].save()

        return response.status(200).send({
            message: "User logged in",
            token: token_gen[0].token
        })
    }


}

module.exports = SecurityController
