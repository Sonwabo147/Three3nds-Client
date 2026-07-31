const API_URL = import.meta.env.VITE_API_URL;

const api = async (endpoint, method = 'GET', body = null) => {
    const options = {
        method,
        credentials: "include",
        headers: {},
    }
    if (body) {
        if (body instanceof FormData) {
            options.body = body;
        } else {
            options.headers["Content-Type"] = "application/json";
            options.body = JSON.stringify(body);
        }
    }
    try {
        const res = await fetch (API_URL + endpoint, options)
        const data = await res.json ();
        if (!res.ok) {
            if (res.status === 500) {
                alert ("Internal server error");
                throw res.Error;
            } else {
               return {error: data.error, status: res.status}
            }
        }
        return data
    } catch (e) {throw (e)}

  return (
    <div></div>)
}

export default api
