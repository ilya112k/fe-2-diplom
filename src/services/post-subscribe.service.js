export default async function postSubscribeService(email) {
    const response = await fetch("https://students.netoservices.ru/fe-diplom/subscribe", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
    });
    return await response.json();
}