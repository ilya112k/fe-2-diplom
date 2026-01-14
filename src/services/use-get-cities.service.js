import useApiService from "./use-api.service";

export default function useGetCitiesService(value) {
    const { result, isLoading } = useApiService(`https://students.netoservices.ru/fe-diplom/routes/cities?name=${value}`);
    return { result, isLoading };
}