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
        const res = await fetch(url, {
            method: 'POST', 
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
        if (res.status === 200) return true
        return false
    }

    // Put Default
    async putDefault(url, data) {
        const res = await fetch(url, {
            method: 'PUT', 
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'}
        })
        if (res.status === 200) return true
        return false
    }
}

export {RequestHandlerClass}