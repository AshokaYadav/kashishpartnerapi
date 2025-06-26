import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';
import { ResponseType } from '@/apis/utils';
import { fetchAllOperatorCircleLinks, IResponseOpCirLinkApi, ThirdPartyApi } from '@/apis/op-circle-link';
import { OperatorApis } from '@/apis';

interface Circle {
    id: string;
    name: string;
}

interface Operator {
    id: string;
    name: string;
}



export interface OperatorCircleLink extends IResponseOpCirLinkApi {
    provider_api: ThirdPartyApi;
}

export const useGetOperatorCircles = () => {
    return useQuery<ResponseType<IResponseOpCirLinkApi[]>>({
        queryKey: ['operator-circles-linking'],
        queryFn: fetchAllOperatorCircleLinks
    });
};




// export const useGetOperatorsApisByOperators = (ids: string[] = []) => {

//   const query = useQuery({
//     queryKey: ['operators-apis', ids],
//     queryFn: async () => {
//       const { data } = await OperatorApis.fetchOperatorApisByOperators(ids);
//       return data;
//     },
//     enabled: true,
//   });

//   return {
//     refetch: query.refetch,
//     isLoading: query.isLoading,
//     data: query.data
//   };
// };