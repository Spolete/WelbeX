

export class userController {
    async getProducts(req, res) {
        res.json(res.paginatedResults)
    }
}

export default new userController()