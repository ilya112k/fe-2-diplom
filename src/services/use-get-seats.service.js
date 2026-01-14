/* eslint-disable react-hooks/rules-of-hooks */
import useApiService from "./use-api.service";
import queryFromObject from "../utils/query";

export default function useGetSeatsService(obj, identity) {
    const copyObj = {
        id: identity === "departure" ? obj.departure_id : obj.arrival_id,
        have_first_class: obj.have_first_class,
        have_second_class: obj.have_second_class,
        have_third_class: obj.have_third_class,
        have_fourth_class: obj.have_fourth_class,
        have_wifi: obj.have_wifi,
    };

    const queryStr = queryFromObject(copyObj, ['id']);

    debugger;
    const resultDeparture = identity === "departure" ? useApiService(`https://students.netoservices.ru/fe-diplom/routes/${copyObj.id}/seats?${queryStr}`) : null;
    const resultArrival = identity === "arrival" ? useApiService(`https://students.netoservices.ru/fe-diplom/routes/${copyObj.id}/seats?${queryStr}`) : null;

    return { resultDeparture, resultArrival };
}