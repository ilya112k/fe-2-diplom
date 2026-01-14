export default function queryFromObject(object, skipFields = []) {
    let arr = [];
    for (const [key, value] of Object.entries(object)) {
        if (!skipFields.includes(key) && value) {
            const param = `${key}=${value}`;
            arr.push(param);
        }
    }

    return arr.join("&")
}