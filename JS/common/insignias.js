// IMPORTS
import { RequestHandlerClass } from "./dbCalls/requestHandler.js"

// CONST
const RequestHandler = new RequestHandlerClass();

// FUNCTIONS
export async function calculateINS(userEmail) {
    const user = await RequestHandler.getDefault("http://localhost:8085/users/" + userEmail)
    const rates = []
    let rateQuantity = 0
    let totalRate = 0

    user.reviews.forEach(async e => {
        const review = await RequestHandler.getDefault("http://localhost:8085/review/" + e)
        rates.push(review.rating)
    });

    rateQuantity = rates.length
    rates.forEach(e => {
        totalRate += e
    });

    const finalRate = totalRate / rateQuantity
    let newINSG = "../Imagenes/Logos/MeansWhiteBronce.png"

    if (finalRate < 1) newINSG = "../Imagenes/Logos/MeansWhiteBronce.png"
    else if (finalRate < 2) newINSG = "../Imagenes/Logos/MeansWhitePlata.png"
    else if (finalRate < 3) newINSG = "../Imagenes/Logos/MeansWhiteOro.png"
    else if (finalRate < 4) newINSG = "../Imagenes/Logos/MeansWhiteRubí.png"
    else if (finalRate < 5) newINSG = "../Imagenes/Logos/MeansWhitePlatino.png"

    user.insignias.forEach(e => {
        if (e != "../Imagenes/Logos/MeansLogoInversor.png") e = newINSG
    });

    await RequestHandler.putDefault("http://localhost:8085/users/edit/" + user.email, user)
}