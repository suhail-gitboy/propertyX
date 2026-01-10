import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alluserapi, GetAllpropertyadmin, GetApproval, RejectApproval, RemoveApproval } from "../../ApiServices/Allapi";
import { useContext } from "react";


export const useAllPropertiesAdmin = () => {



    return useQuery({
        queryKey: ["properties"],
        queryFn: async () => {

            const res = await GetAllpropertyadmin();
            return res.data;
        },

        refetchOnWindowFocus: false,
        onError: (err) => {
            console.error("Failed to fetch admin properties:", err);
        },
    });
};

export const useApproveProperty = (token) => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (id) => {

            const headers = { Authorization: `Bearer ${token}` };
            const res = await GetApproval(id, headers);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["properties"])
        },

        onError: (err) => {
            console.error("Failed to fetch admin properties:", err);
        },
    });
};

export const useRejectApproval = (token) => {

    const queryclient = useQueryClient()

    useMutation({




        mutationFn: async (id) => {
            const headers = { Authorization: `Bearer ${token}` };
            const Res = await RejectApproval(id, headers)
            return Res.data
        },
        onSuccess: () => {
            invalidateQueries(queryclient["properties"])
        }, onError: (err) => {
            console.error("Failed to fetch admin properties:", err);
        },

    })
}


export const useRemoveApproved = (token) => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (id) => {

            const headers = { Authorization: `Bearer ${token}` };
            const res = await RemoveApproval(id, headers);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["properties"])
        },

        onError: (err) => {
            console.error("Failed to fetch admin properties:", err);
        },
    });
};


export const useGetallusers = (token) => {
    return useQuery({
        queryKey: ["allusers"],
        queryFn: async () => {

            const headers = { Authorization: `Bearer ${token}` };
            const res = await Alluserapi(headers);
            return res.data;
        },
        enabled: !!token,
        refetchOnWindowFocus: false,
        onError: (err) => {
            console.error("Failed to fetch admin properties:", err);
        },
    });
};




