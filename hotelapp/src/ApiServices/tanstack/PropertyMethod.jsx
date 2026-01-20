import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddcommentApi, AddlikeApi, AddWishlist, DeletecommentApi, FollowhostApi, GetuserData, GetwishlistApi, HostpropertyApi, Singlepropertyapi, unFollowhostApi, UpdatecommentApi, GetpropertyUpdate, Hideproperty, Deleteproperty, bookinghistoryApi, cancelbookingApi, Confirmbooking, Cancelbookingbyhost, NewStartconversation, APIGetmessagehistory, APInewmessage, AllmessagedHistory, Alluserdata } from "../Allapi";
import { toast } from "sonner";
import { ContextDatas } from "../../Common/ContextWrapped";
import { useNavigate } from "react-router";

export const useGetsingleproperty = (id) => {
    return useQuery({
        queryKey: ["property", id],
        queryFn: async () => {

            const res = await Singlepropertyapi(id);
            return res.data;
        },
        enabled: !!id,
        refetchOnWindowFocus: false,
        onError: (err) => {
            console.error("Failed to fetch property:", err);
        },
    });
}


export const useAddlike = (token) => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (id) => {

            const headers = { Authorization: `Bearer ${token}` };
            const res = await AddlikeApi(id, headers);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["properties", "property"])
        },

        onError: (err) => {
            console.error("Failed to fetch admin properties:", err);
        },
    });
};

export const useGetallwishlist = (token) => {
    return useQuery({
        queryKey: ["wishlist"],
        queryFn: async () => {
            const headers = { Authorization: `Bearer ${token}` };
            const res = await GetwishlistApi(headers);
            return res.data;
        },
        enabled: !!token,

        refetchOnWindowFocus: false,
        onError: (err) => {
            console.error("Failed to fetch property:", err);
        },
    });
}


export const useAddtowishlist = (token) => {
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (id) => {

            const headers = { Authorization: `Bearer ${token}` };
            var res = await AddWishlist(id, headers);
            if (res.data !== "deleted") {
                toast.success(`${res.data.property.title} saved to wishlist`);
            } else {
                toast.error(`Removed from wishlist`);
            }


            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["wishlist"])


        },

        onError: (err) => {
            console.error("Failed to fetch admin properties:", err);
        },
    })

}


// comments

export const useADDcoment = (token) => {
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({ id, body }) => {
            console.log("body", body);

            const headers = { Authorization: `Bearer ${token}` };
            var res = await AddcommentApi(id, body, headers);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["property,properties"])


        },

        onError: (err) => {
            console.error("Failed to fetch admin properties:", err);
        },
    })

}

export const useUpdatecoment = (token) => {
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({ id, CommentId, body }) => {
            console.log("body", CommentId);

            const headers = { Authorization: `Bearer ${token}` };
            var res = await UpdatecommentApi(id, CommentId, body, headers);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["property,properties"])


        },

        onError: (err) => {
            console.error("Failed to fetch  properties:", err);
        },
    })

}


export const useDeletecoment = (token) => {
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({ id, CommentId }) => {
            console.log("body", CommentId);

            const headers = { Authorization: `Bearer ${token}` };
            var res = await DeletecommentApi(id, CommentId, headers);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["property,properties"])


        },

        onError: (err) => {
            console.error("Failed to fetch  properties:", err);
        },
    })

}


export const useGetuserproperty = (id) => {
    return useQuery({
        queryKey: ["propertyuser"],
        queryFn: async () => {


            var res = await HostpropertyApi(id);
            return res.data;

        },

        onSuccess: () => {

            console.log("success");


        },

        onError: (err) => {
            console.error("Failed to fetch  properties:", err);
        },
    })

}


export const useFollow = (token) => {
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (id) => {
            console.log("from folloe", id);


            const headers = { Authorization: `Bearer ${token}` };
            var res = await FollowhostApi(id, headers);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["user"])


        },

        onError: (err) => {
            console.error("Failed to fetch  properties:", err);
        },
    })

}

export const useunFollow = (token) => {
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (id) => {



            const headers = { Authorization: `Bearer ${token}` };
            var res = await unFollowhostApi(id, headers);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["user"])


        },

        onError: (err) => {
            console.error("Failed to fetch  properties:", err);
        },
    })

}


export const useGetsingleuser = (id) => {
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => {


            var res = await GetuserData(id);
            return res.data;

        },

        onSuccess: () => {

            console.log("success");


        },
        enabled: !!id,

        onError: (err) => {
            console.error("Failed to fetch  properties:", err);
        },
    })

}



// updateproperty 


export const useUpdateproperty = (token) => {
    const navigate = useNavigate()
    const { loading, Setloading } = ContextDatas()
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({ id, data }) => {
            Setloading(true)
            const headers = { Authorization: `Bearer ${token}` };
            var res = await GetpropertyUpdate(id, data, headers);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["property,properties"])
            Setloading(false)
            navigate("/")
            toast.success("Property updated successfully")

        },

        onError: (err) => {
            console.error("Failed to fetch  properties:", err);
        },
    })

}


// hide or remove 


export const useHideproperty = (token) => {
    const { loading, Setloading } = ContextDatas()
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    return useMutation({


        mutationFn: async (id) => {


            Setloading(true)
            const headers = { Authorization: `Bearer ${token}` };
            var res = await Hideproperty(id, headers);


            return res.data


        },
        onSuccess: () => {
            queryClient.invalidateQueries(["properties"])
            Setloading(false)


            toast.success(`Property now in  ${res.data ? "hide" : "show"}property mode `)
            setTimeout(() => {
                navigate("/profile/dashboard")
            }, 2000);
        },

        onError: (err) => {
            console.error("Failed to fetch admin properties:", err);
        },
    });
};
export const useDeleteproperty = (token) => {
    const { loading, Setloading } = ContextDatas()
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (id) => {
            Setloading(true)
            const headers = { Authorization: `Bearer ${token}` };
            const res = await Deleteproperty(id, headers);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["properties"])
            Setloading(false)
        },

        onError: (err) => {
            console.error("Failed to fetch admin properties:", err);
        },
    });
};


// Getbooking 

export const useGetbookings = (token) => {
    return useQuery({
        queryKey: ["bookings"],
        queryFn: async () => {
            const headers = { Authorization: `Bearer ${token}` };
            const res = await bookinghistoryApi(headers);
            return res.data

        },
        enabled: !!token,
        onSuccess: () => {

        },

        onError: (err) => {
            console.error("Failed to fetch admin properties:", err);
        },
    })
}


export const usecancelbookedproperty = (token) => {
    const { loading, Setloading } = ContextDatas()
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (id) => {
            Setloading(true)
            const headers = { Authorization: `Bearer ${token}` };
            const res = await cancelbookingApi(id, headers);
            return res.data;
        },
        enabled: !!token,
        onSuccess: () => {
            queryClient.invalidateQueries(["bookings"])
            Setloading(false)
            toast.success("Booking cancelled successfully")
        },

        onError: (err) => {
            console.error("Failed to fetch admin properties:", err);
        },
    });
};


export const useConfirmbooking = (token) => {

    const { loading, Setloading } = ContextDatas()
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (id) => {
            Setloading(true)
            const headers = { Authorization: `Bearer ${token}` };
            const res = await Confirmbooking(id, headers);
            return res.data;
        },
        enabled: !!token,
        onSuccess: () => {
            queryClient.invalidateQueries(["bookings"])
            Setloading(false)
            toast.success("Booking confirmed successfully")
        },

        onError: (err) => {
            console.error("Failed to fetch admin properties:", err);
            Setloading(false)
        },
    });
}
export const useCancelbookingbyhost = (token) => {

    const { loading, Setloading } = ContextDatas()
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({ id, body }) => {
            Setloading(true)
            const headers = { Authorization: `Bearer ${token}` };
            const res = await Cancelbookingbyhost(id, body, headers);
            return res.data;
        },
        enabled: !!token,
        onSuccess: () => {
            queryClient.invalidateQueries(["bookings"])
            Setloading(false)
            toast.success("Booking cancelled successfully")
        },

        onError: (err) => {
            console.error("Failed to fetch admin properties:", err);
        },
    });
}


export const useStartConverstaion = (token) => {

    const { loading, Setloading } = ContextDatas()
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (id) => {

            console.log(id, "from mutate");

            Setloading(true)
            const headers = { Authorization: `Bearer ${token}` };
            const res = await NewStartconversation(id, headers);
            return res.data;
        },

        onSuccess: () => {

        },

        onError: (err) => {
            console.error("Failed to fetch admin properties:", err);
        },
    });
}




export const useMessagehistory = (id, token) => {
    return useQuery({
        queryKey: ["messages", id],
        queryFn: async () => {



            console.log(id, "from tan");

            const headers = { "Authorization": `Bearer ${token}` };

            var res = await APIGetmessagehistory(id, headers);
            return res.data;

        },

        onSuccess: () => {




        },
        enabled: !!id,

        onError: (err) => {
            console.error("Failed to fetch  properties:", err);
        },
    })

}
export const useNewmessage = (token) => {

    const { loading, Setloading } = ContextDatas()
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({ FormData }) => {



            Setloading(true)
            const headers = { Authorization: `Bearer ${token}` };
            const res = await APInewmessage(FormData, headers);
            return res.data;
        },

        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["messages", variables.chatId],
            });
        },
        onError: (err) => {
            console.error("Failed to fetch admin properties:", err);
        },
    });
}

export const useAllmessaged = (id, token) => {
    return useQuery({

        queryFn: async () => {





            const headers = { "Authorization": `Bearer ${token}` };

            var res = await AllmessagedHistory(id, headers);
            return res.data;

        },

        onSuccess: () => {




        },
        enabled: !!id,

        onError: (err) => {
            console.error("Failed to fetch  properties:", err);
        },
    })

}

export const useGetalluserdata = (data, token) => {
    return useQuery({


        queryFn: async () => {


            console.log(data, "from tan");



            const headers = { "Authorization": `Bearer ${token}` };

            var res = await Alluserdata({ data: data, headers });
            return res.data;

        },

        onSuccess: () => {




        },
        enabled: data.length > 0,

        onError: (err) => {
            console.error("Failed to fetch  properties:", err);
        },
    })

}

