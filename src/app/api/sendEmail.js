export const sendEmail = async (data) => {
    const apiEndpoint = '@/app/api/email';

    return fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    })
    .then((res) => {
        console.log(res);
    })
    // .then((res) => res.json())
    // .then((response) => {
    //     console.log('resonse')
    //     alert(response.message);
    //     return true;
    // })
    // .catch((err) => {
    //     console.log('err')
    //     alert(err);
    //     return false;
    // });
}