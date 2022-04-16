class RequestHandlerClass {
    constructor() {}

    // Get Default
    async getDefault(url) {
        const res = await fetch(url)
        const data = await res.json()
        return data
    }

    // Post Default
    async postDefault(url, data) {
        const res = await fetch(url, {body: JSON.stringify(data)})
        const dataRes = await res.json()
        return dataRes
    }

    // Put Default
    async putDefault(url, data) {
        const res = await fetch(url, {body: JSON.stringify(data)})
        const dataRes = await res.json()
        return dataRes
    }
}

export {RequestHandlerClass}