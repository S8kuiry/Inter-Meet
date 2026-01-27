// mutation is used for the create delete and update 
// query is used for fetching purposes
// imported from @tanstack/react-query
// the result here can be destructured
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { sessionApi } from '../api/sessions'
import { toast } from 'react-toastify'

export const useCreateSession = () => {
    const result = useMutation({
        mutationFn: sessionApi.createSession,
        onSuccess: () => {
            toast.success("Session Created Successfully!")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to Create Session")
        }

    })
    return result
}

export const useActiveSessions = () => {
    const result = useQuery({
        queryKey: ['activeSessions'],
        queryFn: sessionApi.getActiveSessions,
        refetchInterval:1000,
        refetchIntervalInBackground:true
    })
    return result
}

export const useMyRecentSessions = () => {
    const result = useQuery({
        queryKey: ["myRecentSessions"],
        queryFn: sessionApi.getMyRecentSessions,
       refetchInterval:1000,
        refetchIntervalInBackground:true
    })
    return result
}


export const useSessionById = (id) => {
    return useQuery({
        queryKey: ['session', id],
        queryFn: () => sessionApi.getSessionById(id),
        enabled: !!id,
        refetchInterval: 5000,
    });
};


export const useJoinSession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => sessionApi.joinSession(id),
        onSuccess: () => {
            toast.success("Joined Session Successfully!");
            queryClient.invalidateQueries(['session']);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to Join Session");
        }
    });
};

export const useEndSession = () => {
    return useMutation({
        mutationFn: (id) => sessionApi.endSession(id),
        onSuccess: () => toast.success("Session Ended Successfully!"),
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to End Session");
        }
    });
};