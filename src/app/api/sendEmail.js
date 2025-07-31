export const sendEmail = async (data) => {
    const apiEndpoint = '/api/email';

    return fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((response) => {
        alert(response.message);
        return true;
    })
    .catch((err) => {
        alert(err);
        return false;
    });
}