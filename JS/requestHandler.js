class RequestHandlerClass {
    constructor() {}

    // Get Default
    async getDefault(url) {
        const res = await fetch(url)
        const data = res.json()
        return data
    }

    // Post Default
    async postDefault(url, data) {
        const res = await fetch(url, {method: 'POST', body: JSON.stringify(data)})
        const dataRes = res.json()
        return dataRes
    }

    // Put Default
    async putDefault(url, data) {
        const res = await fetch(url, {method: 'PUT', body: data})
        const dataRes = res.json()
        return dataRes
    }
}

export {RequestHandlerClass}