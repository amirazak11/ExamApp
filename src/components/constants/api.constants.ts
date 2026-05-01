export const  Headers = {
    jsonBody :{
        'content-type':'application/json',
    },authorization:(token :string)=>({
         'Authorization': `Bearer ${token}`,

    })

}

export const PAGINATION_LIMIT = 6;