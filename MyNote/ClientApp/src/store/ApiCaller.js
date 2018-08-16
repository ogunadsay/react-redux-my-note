import axios from "axios";

//Generic function for all ajax requests
export async function makeRequest(url, method = 'GET', data = {}, headers = {}, params = {}) {
    //Generic load start for all ajax requests
    try {
        console.log(data)
        const { status, data, statusText } = await axios.request({
            url: url,
            method: method,
            data: data,
            headers: headers,
            params: params
        });
        
        return { status, data, statusText };

    } catch (e) {
        alert(e);
    }
}


