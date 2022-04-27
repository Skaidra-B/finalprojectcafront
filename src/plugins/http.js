
const host = 'http://localhost:4000'

export default {
    post: async (data, url) => {
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        }
        let res = await fetch(host+url, options)
        res = await res.json()
        return res
    },
    get: async (url) => {
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
            credentials: "include",
        }
        let res = await fetch(host+url, options)
        res = await res.json()
        return res
    }
}



// export default {
//     post: async (url, data) => {
//         const options = {
//             method: 'POST',
//             headers: {"content-type": "application/json"},
//             credentials: "include",
//             body: JSON.stringify(data)
//         }
//         let res = await fetch('http://localhost:4000' + url, options)
//         res = await res.json()
//         return res
//     },
//     get: async (url) => {
//         const options = {
//             method: 'GET',
//             headers: {"content-type": "application/json"},
//             credentials: "include"
//         }
//         let res = await fetch('http://localhost:4000' + url, options)
//         res = await res.json()
//         return res
//     },
    // postMultiPartSingle: async (url, data) => {
    //     let formData = new FormData();
    //     formData.append("picture", data)
    //
    //     const res = await fetch( 'http://localhost:4000' + url, {
    //         method: 'POST',
    //         body: formData,
    //         credentials: "include",
    //     })
    //
    //     return await res.json()
    // },
    // postMultiPart: async (url, data) => {
    //     let formData = new FormData();
    //     Object.keys(data).forEach(key => {
    //         if (key === "pictures") {
    //             data[key].map(ph => {
    //                 formData.append("picture", ph)
    //             })
    //         } else {
    //             formData.append(key,data[key])
    //         }
    //     });
    //
    //     const res = await fetch( 'http://localhost:4000' + url, {
    //         method: 'POST',
    //         body: formData,
    //         credentials: "include",
    //     })
    //
    //     return await res.json()
    // },
// }