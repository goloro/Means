class RequestHandlerClass {
    constructor() {}

    // Get Default
    async getDefault(url) {
        const res = await fetch(url, {
            method: 'GET', 
            headers: {'Content-Type': 'application/json'}
        })
        let data = null
        try {
            data = res.json()
        } catch (error) {
            console.log(error)
        }
        return data
    }

    // Post Default
    async postDefault(url, data, registerCall) {
        const res = await fetch(url, {
            method: 'POST', 
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
        if (res.status == 200 && registerCall) return true
        return await res.json()
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

    // Delete Default
    async deleteDefault(url) {
        const res = await fetch(url, {
            method: 'DELETE',
            headers:{'Content-Type': 'application/json'}
        })
        if (res.status === 200) return true
        return false
    }
}

export {RequestHandlerClass}