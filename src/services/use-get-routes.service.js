import useApiService from "./use-api.service";
import queryFromObject from "../utils/query";

export default function useGetRoutesService(obj) {
    const copyObj = Object.assign({}, obj);

    const removedFields = [
        "from_city_name",
        "to_city_name"
    ]

    removedFields.forEach(field => {
        delete copyObj[field];
    })

    let queryStr = queryFromObject(copyObj);

    if (!(queryStr.includes("from_city_id") && queryStr.includes("to_city_id"))) {
        queryStr = "";
    }

    const { result, isLoading, error } = useApiService(`https://students.netoservices.ru/fe-diplom/routes?${queryStr}`);

    return { result, isLoading, error };
}