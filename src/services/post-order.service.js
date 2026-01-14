export default async function postOrderService(body) {
    return fetch("https://students.netoservices.ru/fe-diplom/order", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
        .then(response => response.json())
}